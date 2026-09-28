// Transactional email via Resend. Loops is kept only for contact properties, events and the two workflows.
// Fails soft: the funnel must never break on email — callers get { ok:false, error } and decide what to do.
import { Resend } from "resend";
import type { Email } from "./email/templates";
import { SUPPORT_EMAIL } from "./email/templates";

export const MAIL_FROM = process.env.MAIL_FROM || "HyprrIQ Reports <reports@mail.hyprrx.com>";
export const BUYER_REPLY_TO = SUPPORT_EMAIL;

export type MailAttachment = { filename: string; contentType: string; data: string }; // data = base64

let client: Resend | null = null;
function resend(): Resend | null {
  const key = process.env.RESEND_API_KEY;
  if (!key) return null;
  if (!client) client = new Resend(key);
  return client;
}

/**
 * Send one email. `tag` shows in the Resend dashboard (letters, digits, _ and - only).
 * `idempotencyKey` (optional) stops a retried request from sending the same email twice (Resend keeps keys 24h).
 */
export async function sendMail(msg: {
  to: string;
  email: Email;
  replyTo: string;
  tag: string;
  attachments?: MailAttachment[];
  idempotencyKey?: string;
}): Promise<{ ok: boolean; skipped?: boolean; id?: string; error?: string }> {
  const r = resend();
  if (!r) {
    console.error("[mail] RESEND_API_KEY missing — not sent:", msg.tag);
    return { ok: false, skipped: true, error: "Email not configured" };
  }
  try {
    const { data, error } = await r.emails.send(
      {
        from: MAIL_FROM,
        to: msg.to,
        replyTo: msg.replyTo,
        subject: msg.email.subject,
        html: msg.email.html,
        text: msg.email.text,
        tags: [{ name: "template", value: msg.tag.replace(/[^\w-]/g, "_") }],
        ...(msg.attachments?.length
          ? { attachments: msg.attachments.map((a) => ({ filename: a.filename, content: a.data, contentType: a.contentType })) }
          : {}),
      },
      msg.idempotencyKey ? { idempotencyKey: msg.idempotencyKey.slice(0, 256) } : undefined,
    );
    if (error) {
      const text = `${error.name || "error"}: ${error.message || ""}`.slice(0, 300);
      console.error("[mail]", msg.tag, text);
      return { ok: false, error: `Resend ${text}` };
    }
    return { ok: true, id: data?.id };
  } catch (e) {
    const text = e instanceof Error ? e.message : "Resend unreachable";
    console.error("[mail]", msg.tag, text);
    return { ok: false, error: text };
  }
}
