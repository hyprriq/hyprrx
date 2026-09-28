import DeliverPage from "../DeliverPage";

export const dynamic = "force-dynamic";
export { metadata } from "../DeliverPage";

// /deliver/HX-240928-7Q4K — the order card + "send the finished report" form (linked from the internal order email).
export default async function Page({ params, searchParams }: { params: Promise<{ no: string }>; searchParams: Promise<{ bad?: string }> }) {
  const { no } = await params;
  const { bad = "" } = await searchParams;
  return <DeliverPage orderNo={decodeURIComponent(no).toUpperCase()} bad={bad} nested />;
}
