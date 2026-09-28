import { NextRequest, NextResponse } from "next/server";
import { funnelBase, isEmail, pickUtm } from "../../../../lib/funnel";
import { loopsEvent, loopsUpsert } from "../../../../lib/loops";
import { sendMail, BUYER_REPLY_TO } from "../../../../lib/mail";
import { checklistEmail } from "../../../../lib/email/templates";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  let body: { email?: unknown; utm?: unknown } = {};
  try {
    body = await req.json();
  } catch {}
  const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  if (!isEmail(email)) return NextResponse.json({ error: "Enter a valid email." }, { status: 400 });
  const utm = pickUtm(body.utm);
  const base = funnelBase(req);
  const url = `${base}/9-red-flags.pdf`;
  await loopsUpsert(email, { funnelStage: "checklist", ...utm });
  await loopsEvent(email, "checklist_requested", { url });
  await sendMail({ to: email, email: checklistEmail({ checklistUrl: url, siteUrl: `${base}/email` }), replyTo: BUYER_REPLY_TO, tag: "checklist" });
  return NextResponse.json({ ok: true, url });
}
