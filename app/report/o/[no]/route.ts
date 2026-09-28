import { NextRequest, NextResponse } from "next/server";
import { funnelBase, ORDER_NO_RE } from "../../../../lib/funnel";
import { loadOrderByNo } from "../../../../lib/orders";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Short order link used in every email: report.hyprrx.com/o/HX-240928-7Q4K → that order's thank-you / review page.
// Buyers never see the Stripe session id in an email; it only appears in the URL after this hop.
export async function GET(req: NextRequest, ctx: { params: Promise<{ no: string }> }) {
  const { no } = await ctx.params;
  const base = funnelBase(req);
  const orderNo = decodeURIComponent(no || "").toUpperCase();
  if (!ORDER_NO_RE.test(orderNo)) return NextResponse.redirect(`${base}/thank-you`, 302);
  let order = await loadOrderByNo(orderNo);
  if (!order) {
    // Stripe search indexes new payments with a short lag; one retry covers a buyer who clicks within seconds.
    await new Promise((r) => setTimeout(r, 1500));
    order = await loadOrderByNo(orderNo);
  }
  if (!order) return NextResponse.redirect(`${base}/thank-you?missing=${encodeURIComponent(orderNo)}`, 302);
  return NextResponse.redirect(`${base}/thank-you?session_id=${order.sessionId}`, 302);
}
