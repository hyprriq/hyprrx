import { redirect } from "next/navigation";
import { ORDER_NO_RE } from "../../../lib/funnel";
import DeliverPage from "./DeliverPage";

export const dynamic = "force-dynamic";
export { metadata } from "./DeliverPage";

// /deliver — sign-in + order picker. /deliver?no=HX-… → /deliver/HX-…; old ?session_id= links still resolve.
export default async function Page({ searchParams }: { searchParams: Promise<{ no?: string; session_id?: string; bad?: string }> }) {
  const { no = "", session_id = "", bad = "" } = await searchParams;
  const clean = no.trim().toUpperCase();
  if (clean && ORDER_NO_RE.test(clean)) redirect(`./deliver/${clean}`);
  return <DeliverPage orderNo={clean} sessionId={session_id} bad={bad} />;
}
