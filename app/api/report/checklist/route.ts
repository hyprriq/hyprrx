import { NextRequest, NextResponse } from "next/server";
import { funnelBase, isEmail, pickUtm } from "../../../../lib/funnel";
import { loopsEvent, loopsTransactional, loopsUpsert, LOOPS_TX } from "../../../../lib/loops";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  let body: { email?: unknown; utm?: unknown } = {};
  try {
    body = await req.json();
  } catch {}
  const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  if (!isEmail(email)) return NextResponse.json({ error: "Enter a valid email." }, { status: 400 });
  const utm = pickUtm(body.utm);
  const url = `${funnelBase(req)}/9-red-flags.pdf`;
  await loopsUpsert(email, { funnelStage: "checklist", ...utm });
  await loopsEvent(email, "checklist_requested", { url });
  await loopsTransactional(LOOPS_TX.checklist, email, { checklistUrl: url });
  return NextResponse.json({ ok: true, url });
}
