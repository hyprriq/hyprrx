/* eslint-disable react/no-unescaped-entities */
import { Cta, StickyBar, Zoomable } from "./ui";

export const revalidate = 3600;

export default function ReportPage() {
  return (
    <main className="page">

{/* TOP BAR */}
<div style={{ height: '56px', padding: '0 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#0B1B33', borderBottom: '1px solid #16305A' }}>
<img src="/report/hyprriq-logo-reversed.svg" alt="HyprrIQ" style={{ height: '24px', width: 'auto' }} />
<span className="mono" style={{ fontSize: '10.5px', color: '#D8F1FF' }}>Supplier Report · $79</span>
</div>

{/* 1 HOOK */}
<div style={{ padding: '30px 20px 40px', backgroundColor: '#0B1B33', backgroundImage: 'linear-gradient(rgba(216,241,255,.05) 1px, transparent 1px), linear-gradient(90deg, rgba(216,241,255,.05) 1px, transparent 1px)', backgroundSize: '26px 26px', display: 'flex', flexDirection: 'column', gap: '18px' }}>
<div className="mono" style={{ fontSize: '11px', lineHeight: '1.5', color: '#4FD6E3', fontWeight: '600' }}>For Amazon wholesale sellers about to pay a new supplier</div>
<h1 className="disp" style={{ margin: '0', fontSize: '44px', lineHeight: '1.02', fontWeight: '900', letterSpacing: '-0.025em', color: '#ffffff' }}>Real supplier.<br />Real invoice.<br /><span style={{ display: 'inline-block', marginTop: '6px', padding: '2px 10px 4px', background: '#C1272D', color: '#ffffff', transform: 'rotate(-1.5deg)' }}>Account still suspended.</span></h1>
<p style={{ margin: '0', fontSize: '17.5px', lineHeight: '1.5', color: '#D8F1FF' }}>A real business isn't the same as an authorised source. Find out what Amazon will ask you to prove — <strong className="hld">before you wire the money.</strong></p>

{/* evidence stack */}
<div className="stack">
<div className="vid">
<button aria-label="Watch the explainer" style={{ width: '64px', height: '64px', borderRadius: '50%', border: '0', background: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}><svg width="24" height="24" viewBox="0 0 24 24" fill="#0B1B33"><path d="M8 5v14l11-7z" /></svg></button>
<span className="mono" style={{ fontSize: '10px', color: '#D8F1FF' }}>Watch the explainer</span>
</div>
<div className="card">
<img src="/report/r1-verdict-cover.webp" alt="Report verdict: Verify Before Purchase" width={1200} height={448} style={{ display: 'block', width: '100%', height: 'auto' }} />
</div>
<span className="tag cardtag">Real report · supplier blurred</span>
</div>

<Cta style={{ marginTop: '6px' }} />
<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '6px', fontSize: '13px', color: '#D8F1FF' }}><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#4FD6E3" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3 4.5 6v5.5c0 4.2 3.1 7.6 7.5 9.5 4.4-1.9 7.5-5.3 7.5-9.5V6L12 3z" /><path d="m9 12 2 2 4-4" /></svg>Not in your inbox within 10 hours? Full refund.</div>
</div>

{/* 2 STORY */}
<div style={{ padding: '52px 20px 44px', background: '#ffffff', display: 'flex', flexDirection: 'column', gap: '22px' }}>
<span className="tag" style={{ alignSelf: 'flex-start', background: '#E9EFFF', color: '#16305A' }}>Case file · A typical scenario</span>
<div style={{ display: 'flex', flexDirection: 'column', gap: '0', borderLeft: '2px dashed #B9C6DB', marginLeft: '9px' }}>
<div style={{ position: 'relative', padding: '0 0 22px 24px' }}><span style={{ position: 'absolute', left: '-9px', top: '3px', width: '16px', height: '16px', borderRadius: '50%', background: '#ffffff', border: '3px solid #1C4FE0' }}></span><p style={{ margin: '0', fontSize: '18px', lineHeight: '1.45', color: '#1F2A3D' }}>The invoice looked real. So did the warehouse, the website and the LinkedIn team.</p></div>
<div style={{ position: 'relative', padding: '0 0 22px 24px' }}><span style={{ position: 'absolute', left: '-9px', top: '3px', width: '16px', height: '16px', borderRadius: '50%', background: '#ffffff', border: '3px solid #1C4FE0' }}></span><p style={{ margin: '0', fontSize: '18px', lineHeight: '1.45', color: '#1F2A3D' }}>The price list had the brands that sell. They wanted a wire before shipping — <em>"that's normal,"</em> they said.</p></div>
<div style={{ position: 'relative', padding: '0 0 22px 24px' }}><span style={{ position: 'absolute', left: '-9px', top: '3px', width: '16px', height: '16px', borderRadius: '50%', background: '#ffffff', border: '3px solid #15804A' }}></span><p style={{ margin: '0', fontSize: '18px', lineHeight: '1.45', color: '#1F2A3D' }}>The stock arrived. It sold.</p></div>
<div style={{ position: 'relative', padding: '0 0 0 24px' }}><span style={{ position: 'absolute', left: '-11px', top: '1px', width: '20px', height: '20px', borderRadius: '50%', background: '#C1272D', boxShadow: '0 0 0 5px #FBE3E4' }}></span><p className="disp" style={{ margin: '0', fontSize: '26px', lineHeight: '1.15', fontWeight: '800', color: '#0B1B33' }}>Three weeks later, the account was under review.</p></div>
</div>
</div>

{/* 3 CONSEQUENCES */}
<div style={{ padding: '48px 20px 52px', background: '#F6F8FB', display: 'flex', flexDirection: 'column', gap: '22px' }}>
<h2 className="disp" style={{ margin: '0', fontSize: '32px', lineHeight: '1.08', fontWeight: '800', letterSpacing: '-0.02em', color: '#0B1B33' }}>It's rarely about the product. It's about the <span className="hl">paperwork.</span></h2>
<div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
<div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', padding: '14px', background: '#ffffff', border: '1px solid #E1E7F0', borderRadius: '10px' }}><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#C1272D" strokeWidth="2.4" strokeLinecap="round" style={{ flexShrink: '0', marginTop: '1px' }}><circle cx="12" cy="12" r="9" /><path d="M9 9l6 6M15 9l-6 6" /></svg><p style={{ margin: '0', fontSize: '16px', lineHeight: '1.45' }}>An <strong>inauthentic complaint</strong> — and Amazon asks for invoices from your supplier.</p></div>
<div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', padding: '14px', background: '#ffffff', border: '1px solid #E1E7F0', borderRadius: '10px' }}><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#C1272D" strokeWidth="2.4" strokeLinecap="round" style={{ flexShrink: '0', marginTop: '1px' }}><circle cx="12" cy="12" r="9" /><path d="M9 9l6 6M15 9l-6 6" /></svg><p style={{ margin: '0', fontSize: '16px', lineHeight: '1.45' }}>An <strong>IP complaint</strong> from the brand — and the listing is removed.</p></div>
<div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', padding: '14px', background: '#ffffff', border: '1px solid #E1E7F0', borderRadius: '10px' }}><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#C1272D" strokeWidth="2.4" strokeLinecap="round" style={{ flexShrink: '0', marginTop: '1px' }}><circle cx="12" cy="12" r="9" /><path d="M9 9l6 6M15 9l-6 6" /></svg><p style={{ margin: '0', fontSize: '16px', lineHeight: '1.45' }}><strong>Invoices rejected</strong> — because the supplier can't be traced back to the brand.</p></div>
<div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', padding: '14px', background: '#FBE3E4', border: '1px solid #F1B9BC', borderRadius: '10px' }}><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#C1272D" strokeWidth="2.4" strokeLinecap="round" style={{ flexShrink: '0', marginTop: '1px' }}><circle cx="12" cy="12" r="9" /><path d="M9 9l6 6M15 9l-6 6" /></svg><p style={{ margin: '0', fontSize: '16px', lineHeight: '1.45', color: '#5E1216' }}><strong>FBA shipments disabled. Funds withheld.</strong> Inventory at risk while you write a plan of action.</p></div>
</div>
{/* evidence frame */}
<div style={{ position: 'relative', marginTop: '10px', padding: '10px', background: '#ffffff', borderRadius: '6px', boxShadow: '0 1px 0 #E1E7F0, 0 18px 40px rgba(11,27,51,.14)', transform: 'rotate(-1deg)' }}>
<span className="tag" style={{ position: 'absolute', left: '14px', top: '-12px', background: '#0B1B33', color: '#ffffff' }}>Real notice · details removed</span>
<img src="/report/notice-s3-body.webp" alt="Real Amazon notice: account under review under section 3" style={{ display: 'block', width: '100%', height: 'auto', borderRadius: '3px' }} />
</div>
<p style={{ margin: '0', fontSize: '14px', fontStyle: 'italic', color: '#67748A', textAlign: 'center' }}>Account under review. Shipments disabled. Funds withheld.</p>
</div>

{/* 4 HIDDEN TRUTH */}
<div style={{ padding: '52px 20px 52px', background: '#0B1B33', display: 'flex', flexDirection: 'column', gap: '22px' }}>
<span className="mono" style={{ fontSize: '11px', fontWeight: '600', color: '#4FD6E3' }}>The part nobody tells you</span>
<h2 className="disp" style={{ margin: '0', fontSize: '34px', lineHeight: '1.06', fontWeight: '900', letterSpacing: '-0.02em', color: '#ffffff' }}>A real business is not the same as an <span style={{ color: '#FFE45C' }}>authorised source.</span></h2>
<p style={{ margin: '0', fontSize: '17px', lineHeight: '1.55', color: '#D8F1FF' }}>A website, an office, a LinkedIn team and a business registration prove one thing: the company exists.</p>
<p style={{ margin: '0', fontSize: '17px', lineHeight: '1.55', color: '#ffffff' }}><strong>None of them prove it's allowed to sell the brands on its price list</strong> — and that's exactly what Amazon asks you to prove.</p>

<div style={{ position: 'relative', marginTop: '12px', padding: '10px', background: '#ffffff', borderRadius: '6px', boxShadow: '0 24px 50px rgba(0,0,0,.4)', transform: 'rotate(1deg)' }}>
<span className="tag" style={{ position: 'absolute', left: '14px', top: '-12px', background: '#FFE45C', color: '#0B1B33' }}>Real IP notice · details removed</span>
<img src="/report/notice-ip-reactivate.webp" alt="Real Amazon IP complaint listing the documents required to reactivate" style={{ display: 'block', width: '100%', height: 'auto', borderRadius: '3px' }} />
</div>

<div style={{ display: 'flex', flexDirection: 'column', gap: '0', background: '#ffffff', borderRadius: '10px', overflow: 'hidden' }}>
<div className="mono" style={{ padding: '12px 16px', fontSize: '10.5px', fontWeight: '600', color: '#67748A', borderBottom: '1px solid #E1E7F0' }}>What Amazon asks for — in its own words</div>
<p style={{ margin: '0', padding: '12px 16px', fontSize: '15.5px', lineHeight: '1.5', borderBottom: '1px solid #EEF2F7' }}>"an invoice… purchased from the rights owners directly or from an <span className="hl"><strong>authorized distributor</strong></span>"</p>
<p style={{ margin: '0', padding: '12px 16px', fontSize: '15.5px', lineHeight: '1.5', borderBottom: '1px solid #EEF2F7' }}>"the <span className="hl"><strong>name and address of the manufacturer, distributor</strong></span>"</p>
<p style={{ margin: '0', padding: '12px 16px', fontSize: '15.5px', lineHeight: '1.5', borderBottom: '1px solid #EEF2F7' }}>"<span className="hl"><strong>your name and address, matching</strong></span> your selling account"</p>
<p style={{ margin: '0', padding: '12px 16px', fontSize: '15.5px', lineHeight: '1.5', background: '#FBE3E4', color: '#5E1216' }}>"we reserve the right to <strong style={{ textDecoration: 'underline', textDecorationColor: '#C1272D', textDecorationThickness: '2px' }}>destroy the inventory</strong>… within 60 days"</p>
</div>

<p className="disp" style={{ margin: '6px 0 0', fontSize: '24px', lineHeight: '1.2', fontWeight: '800', color: '#ffffff' }}>Amazon tells you exactly what it will ask for. <span style={{ color: '#4FD6E3' }}>We check it before you pay.</span></p>

{/* proof ladder */}
<div style={{ display: 'flex', flexDirection: 'column', gap: '8px', padding: '18px', border: '1px solid #2B4A7E', borderRadius: '12px', background: '#11274A' }}>
<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}><span className="mono" style={{ fontSize: '11px', fontWeight: '600', color: '#ffffff' }}>5 levels of proof</span><span className="mono" style={{ fontSize: '9.5px', color: '#9FB3D1' }}>Strongest → weakest</span></div>
<div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><span style={{ width: '96px', height: '10px', borderRadius: '3px', background: '#4FD6E3' }}></span><span style={{ fontSize: '14.5px', color: '#ffffff' }}>On the brand's own dealer page</span></div>
<div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><span style={{ width: '96px', height: '10px', borderRadius: '3px', background: 'linear-gradient(90deg,#4FD6E3 78%,#2B4A7E 78%)' }}></span><span style={{ fontSize: '14.5px', color: '#ffffff' }}>A brand-issued LOA</span></div>
<div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><span style={{ width: '96px', height: '10px', borderRadius: '3px', background: 'linear-gradient(90deg,#4FD6E3 56%,#2B4A7E 56%)' }}></span><span style={{ fontSize: '14.5px', color: '#ffffff' }}>Visibly distributes the brand</span></div>
<div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><span style={{ width: '96px', height: '10px', borderRadius: '3px', background: 'linear-gradient(90deg,#4FD6E3 30%,#2B4A7E 30%)' }}></span><span style={{ fontSize: '14.5px', color: '#D8F1FF' }}>Only the supplier says so</span></div>
<div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><span style={{ width: '96px', height: '10px', borderRadius: '3px', background: '#2B4A7E' }}></span><span style={{ fontSize: '14.5px', color: '#9FB3D1' }}>Nothing found</span></div>
</div>

<Cta style={{ marginTop: '4px' }} />
</div>

{/* 4B SUPPLIERS YOU'LL MEET */}
<div style={{ padding: '52px 20px 48px', background: '#F6F8FB', display: 'flex', flexDirection: 'column', gap: '18px' }}>
<span className="tag" style={{ alignSelf: 'flex-start', background: '#FBE3E4', color: '#8E1B20' }}>Know who you're buying from</span>
<h2 className="disp" style={{ margin: '0', fontSize: '30px', lineHeight: '1.08', fontWeight: '800', letterSpacing: '-0.02em', color: '#0B1B33' }}>Suppliers you'll meet — and where each one can get you in trouble.</h2>
<p style={{ margin: '0', fontSize: '16px', lineHeight: '1.55', color: '#1F2A3D' }}>Every one of them calls itself a "distributor". None of these is illegal. The trouble starts when it isn't what you were told — and can't produce the paper Amazon asks for.</p>
<div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
<div style={{ padding: '16px', background: '#ffffff', border: '1px solid #E1E7F0', borderRadius: '12px', display: 'flex', flexDirection: 'column', gap: '6px' }}><strong className="disp" style={{ fontSize: '17px', color: '#0B1B33' }}>The broker with a warehouse photo</strong><span style={{ fontSize: '14.5px', lineHeight: '1.45', color: '#1F2A3D' }}>Often doesn't hold the stock — sources it after you pay. <strong style={{ color: '#C1272D' }}>The risk:</strong> the invoice can't be traced back to the brand.</span></div>
<div style={{ padding: '16px', background: '#ffffff', border: '1px solid #E1E7F0', borderRadius: '12px', display: 'flex', flexDirection: 'column', gap: '6px' }}><strong className="disp" style={{ fontSize: '17px', color: '#0B1B33' }}>The grey-market "distributor"</strong><span style={{ fontSize: '14.5px', lineHeight: '1.45', color: '#1F2A3D' }}>Genuine goods — just not via the route the brand set up. <strong style={{ color: '#C1272D' }}>The risk:</strong> the brand files an IP complaint and the listing comes down.</span></div>
<div style={{ padding: '16px', background: '#ffffff', border: '1px solid #E1E7F0', borderRadius: '12px', display: 'flex', flexDirection: 'column', gap: '6px' }}><strong className="disp" style={{ fontSize: '17px', color: '#0B1B33' }}>The liquidator</strong><span style={{ fontSize: '14.5px', lineHeight: '1.45', color: '#1F2A3D' }}>Clean invoice, one-off lots, no reorders. <strong style={{ color: '#C1272D' }}>The risk:</strong> the paper describes a lot, not an authorised source.</span></div>
<div style={{ padding: '16px', background: '#ffffff', border: '1px solid #E1E7F0', borderRadius: '12px', display: 'flex', flexDirection: 'column', gap: '6px' }}><strong className="disp" style={{ fontSize: '17px', color: '#0B1B33' }}>The retail-sourced "wholesaler"</strong><span style={{ fontSize: '14.5px', lineHeight: '1.45', color: '#1F2A3D' }}>Buys from shops and resells. <strong style={{ color: '#C1272D' }}>The risk:</strong> a till receipt with a letterhead is still a till receipt.</span></div>
<div style={{ padding: '16px', background: '#ffffff', border: '1px solid #E1E7F0', borderRadius: '12px', display: 'flex', flexDirection: 'column', gap: '6px' }}><strong className="disp" style={{ fontSize: '17px', color: '#0B1B33' }}>The marketplace vendor</strong><span style={{ fontSize: '14.5px', lineHeight: '1.45', color: '#1F2A3D' }}>A listing on a sourcing platform. <strong style={{ color: '#C1272D' }}>The risk:</strong> the name on the listing isn't always the company on the invoice.</span></div>
<div style={{ padding: '16px', background: '#ffffff', border: '1px solid #E1E7F0', borderRadius: '12px', display: 'flex', flexDirection: 'column', gap: '6px' }}><strong className="disp" style={{ fontSize: '17px', color: '#0B1B33' }}>The self-written "authorisation"</strong><span style={{ fontSize: '14.5px', lineHeight: '1.45', color: '#1F2A3D' }}>An LOA the distributor wrote about itself. <strong style={{ color: '#C1272D' }}>The risk:</strong> it carries the weight of whoever signed it — and that isn't the brand.</span></div>
</div>
<p style={{ margin: '0', fontSize: '16px', lineHeight: '1.5', color: '#0B1B33' }}><strong>A report tells you which one you're actually dealing with.</strong></p>
</div>

{/* 4C WHAT IS HYPRRIQ, IN PLAIN WORDS */}
<div style={{ padding: '52px 20px 48px', background: '#ffffff', display: 'flex', flexDirection: 'column', gap: '18px' }}>
<span className="tag" style={{ alignSelf: 'flex-start', background: '#E9EFFF', color: '#16305A' }}>In plain words</span>
<h2 className="disp" style={{ margin: '0', fontSize: '31px', lineHeight: '1.08', fontWeight: '800', letterSpacing: '-0.02em', color: '#0B1B33' }}>So what is HyprrIQ, exactly?</h2>
<p style={{ margin: '0', fontSize: '17px', lineHeight: '1.55', color: '#1F2A3D' }}>You're about to pay a new supplier. Send us their name, their website and the brands they're offering you.</p>
<p style={{ margin: '0', fontSize: '17px', lineHeight: '1.55', color: '#1F2A3D' }}>Our AI intelligence model digs into them the way Amazon would if a complaint landed tomorrow — and a person reviews what it finds. Within 10 hours you get a plain-English report: <span className="hl"><strong>can this supplier back up what it's selling you?</strong></span></p>
<p style={{ margin: '0', fontSize: '17px', lineHeight: '1.55', color: '#1F2A3D' }}>That's it. We don't sell stock. We don't take a cut of your order. We never contact your supplier. We're the check you run before the wire goes out.</p>
<div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: '8px' }}>
<div style={{ padding: '12px 10px', background: '#F6F8FB', borderRadius: '10px', display: 'flex', flexDirection: 'column', gap: '4px' }}><span className="mono" style={{ fontSize: '9.5px', fontWeight: '600', color: '#1C4FE0' }}>We are</span><span style={{ fontSize: '13.5px', lineHeight: '1.35', fontWeight: '600', color: '#0B1B33' }}>AI research + human review</span><span style={{ fontSize: '12.5px', color: '#67748A' }}>not a directory</span></div>
<div style={{ padding: '12px 10px', background: '#F6F8FB', borderRadius: '10px', display: 'flex', flexDirection: 'column', gap: '4px' }}><span className="mono" style={{ fontSize: '9.5px', fontWeight: '600', color: '#1C4FE0' }}>You pay</span><span style={{ fontSize: '13.5px', lineHeight: '1.35', fontWeight: '600', color: '#0B1B33' }}>Per report</span><span style={{ fontSize: '12.5px', color: '#67748A' }}>not a subscription</span></div>
<div style={{ padding: '12px 10px', background: '#F6F8FB', borderRadius: '10px', display: 'flex', flexDirection: 'column', gap: '4px' }}><span className="mono" style={{ fontSize: '9.5px', fontWeight: '600', color: '#1C4FE0' }}>You get</span><span style={{ fontSize: '13.5px', lineHeight: '1.35', fontWeight: '600', color: '#0B1B33' }}>Evidence + sources</span><span style={{ fontSize: '12.5px', color: '#67748A' }}>not legal advice</span></div>
</div>
{/* one supplier rule */}
<div style={{ position: 'relative', marginTop: '10px', padding: '20px 18px 18px', background: '#ffffff', border: '3px solid #0B1B33', borderRadius: '8px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
<span className="tag" style={{ position: 'absolute', top: '-12px', left: '14px', background: '#FFE45C', color: '#0B1B33' }}>Read this before you order</span>
<strong className="disp" style={{ fontSize: '21px', color: '#0B1B33' }}>One report = one supplier.</strong>
<p style={{ margin: '0', fontSize: '15.5px', lineHeight: '1.5', color: '#1F2A3D' }}>Up to 5 brands — <strong>all bought from that one supplier.</strong> The question is whether <em>that</em> supplier is authorised for <em>those</em> brands.</p>
<p style={{ margin: '0', fontSize: '15.5px', lineHeight: '1.5', display: 'flex', gap: '8px', alignItems: 'flex-start' }}><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#15804A" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: '0' }}><path d="m5 12 5 5 9-10" /></svg><span>1 supplier selling you 5 brands = <strong>1 report</strong></span></p>
<p style={{ margin: '0', fontSize: '15.5px', lineHeight: '1.5', display: 'flex', gap: '8px', alignItems: 'flex-start' }}><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#C1272D" strokeWidth="3" strokeLinecap="round" style={{ flexShrink: '0' }}><path d="M7 7l10 10M17 7 7 17" /></svg><span>5 brands from 5 different suppliers = <strong>5 reports</strong></span></p>
</div>
</div>

{/* 5 HOW WE CHECK */}
<div style={{ padding: '52px 20px 48px', background: '#ffffff', display: 'flex', flexDirection: 'column', gap: '20px' }}>
<span className="tag" style={{ alignSelf: 'flex-start', background: '#E9EFFF', color: '#16305A' }}>The 5 checks</span>
<h2 className="disp" style={{ margin: '0', fontSize: '31px', lineHeight: '1.08', fontWeight: '800', letterSpacing: '-0.02em', color: '#0B1B33' }}>We research your supplier the way Amazon will — <span className="hl">before you pay.</span></h2>
<div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
<div style={{ display: 'grid', gridTemplateColumns: '44px minmax(0, 1fr)', gap: '14px', padding: '16px', border: '1px solid #E1E7F0', borderRadius: '12px' }}>
<div style={{ width: '44px', height: '44px', borderRadius: '10px', background: '#E9EFFF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1C4FE0" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="16" rx="2" /><circle cx="9" cy="11" r="2.5" /><path d="M5.5 17.5c.6-2 1.9-3 3.5-3s2.9 1 3.5 3" /><path d="M14.5 9.5h4M14.5 13h4" /></svg></div>
<div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}><span className="mono" style={{ fontSize: '10px', color: '#67748A' }}>01</span><strong className="disp" style={{ fontSize: '18px', color: '#0B1B33' }}>Supplier Legitimacy</strong><span style={{ fontSize: '15px', fontWeight: '600', color: '#1F2A3D' }}>Is the business real?</span><span style={{ fontSize: '14px', lineHeight: '1.45', color: '#67748A' }}>Registration, domain age, address, directories, staff, fraud reports.</span></div>
</div>
<div style={{ display: 'grid', gridTemplateColumns: '44px minmax(0, 1fr)', gap: '14px', padding: '16px', border: '2px solid #1C4FE0', borderRadius: '12px', background: '#F7F9FF' }}>
<div style={{ width: '44px', height: '44px', borderRadius: '10px', background: '#1C4FE0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="5" cy="12" r="2.5" /><circle cx="19" cy="6" r="2.5" /><circle cx="19" cy="18" r="2.5" /><path d="M7.2 10.9 16.8 7.1M7.2 13.1l9.6 3.8" /></svg></div>
<div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}><span className="mono" style={{ fontSize: '10px', color: '#1C4FE0' }}>02 · Where most sellers get caught</span><strong className="disp" style={{ fontSize: '18px', color: '#0B1B33' }}>Supply-Chain Relationship</strong><span style={{ fontSize: '15px', fontWeight: '600', color: '#1F2A3D' }}>Is it actually connected to the brands?</span><span style={{ fontSize: '14px', lineHeight: '1.45', color: '#67748A' }}>Brand dealer lists, distributor pages, LOA claims vs what's public.</span></div>
</div>
<div style={{ display: 'grid', gridTemplateColumns: '44px minmax(0, 1fr)', gap: '14px', padding: '16px', border: '1px solid #E1E7F0', borderRadius: '12px' }}>
<div style={{ width: '44px', height: '44px', borderRadius: '10px', background: '#E9EFFF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1C4FE0" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3 4.5 6v5.5c0 4.2 3.1 7.6 7.5 9.5 4.4-1.9 7.5-5.3 7.5-9.5V6L12 3z" /><path d="M12 8.5v4.5" /><circle cx="12" cy="16" r=".9" /></svg></div>
<div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}><span className="mono" style={{ fontSize: '10px', color: '#67748A' }}>03</span><strong className="disp" style={{ fontSize: '18px', color: '#0B1B33' }}>Brand Risk</strong><span style={{ fontSize: '15px', fontWeight: '600', color: '#1F2A3D' }}>Does the brand come after resellers?</span><span style={{ fontSize: '14px', lineHeight: '1.45', color: '#67748A' }}>Reseller policies, complaint and enforcement history on record.</span></div>
</div>
<div style={{ display: 'grid', gridTemplateColumns: '44px minmax(0, 1fr)', gap: '14px', padding: '16px', border: '1px solid #E1E7F0', borderRadius: '12px' }}>
<div style={{ width: '44px', height: '44px', borderRadius: '10px', background: '#E9EFFF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1C4FE0" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M7 3h7l5 5v13H7z" /><path d="M14 3v5h5" /><path d="m9.5 15 2 2 3.5-4" /></svg></div>
<div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}><span className="mono" style={{ fontSize: '10px', color: '#67748A' }}>04</span><strong className="disp" style={{ fontSize: '18px', color: '#0B1B33' }}>Documentation Review</strong><span style={{ fontSize: '15px', fontWeight: '600', color: '#1F2A3D' }}>Will your invoice hold up?</span><span style={{ fontSize: '14px', lineHeight: '1.45', color: '#67748A' }}>Upload up to 2 documents; we check names and addresses against the supplier.</span></div>
</div>
<div style={{ display: 'grid', gridTemplateColumns: '44px minmax(0, 1fr)', gap: '14px', padding: '16px', border: '1px solid #E1E7F0', borderRadius: '12px' }}>
<div style={{ width: '44px', height: '44px', borderRadius: '10px', background: '#E9EFFF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1C4FE0" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="5" cy="12" r="2.5" /><circle cx="19" cy="5" r="2.5" /><circle cx="19" cy="19" r="2.5" /><path d="M7.5 12h4c1.5 0 2-.7 2.6-2L16 6.5M11.5 12c1.5 0 2 .7 2.6 2L16 17.5" /></svg></div>
<div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}><span className="mono" style={{ fontSize: '10px', color: '#67748A' }}>05</span><strong className="disp" style={{ fontSize: '18px', color: '#0B1B33' }}>Sourcing Logic</strong><span style={{ fontSize: '15px', fontWeight: '600', color: '#1F2A3D' }}>Does the deal make sense?</span><span style={{ fontSize: '14px', lineHeight: '1.45', color: '#67748A' }}>Product lines, pricing, terms.</span></div>
</div>
</div>

<div style={{ display: 'flex', flexDirection: 'column', gap: '12px', padding: '18px', background: '#F6F8FB', borderRadius: '12px' }}>
<span style={{ fontSize: '15px', fontWeight: '600', color: '#0B1B33' }}>Every finding tells you how sure we are:</span>
<div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}><span className="tag" style={{ flexShrink: '0', width: '104px', justifyContent: 'center', background: '#DDF1E5', color: '#0F5E36' }}>Verified</span><span style={{ fontSize: '14px', lineHeight: '1.45', color: '#1F2A3D' }}>Confirmed by independent sources</span></div>
<div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}><span className="tag" style={{ flexShrink: '0', width: '104px', justifyContent: 'center', background: '#F8EAD2', color: '#7A4A00' }}>Assessed</span><span style={{ fontSize: '14px', lineHeight: '1.45', color: '#1F2A3D' }}>Our reasoned view, not independently confirmed</span></div>
<div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}><span className="tag" style={{ flexShrink: '0', width: '104px', justifyContent: 'center', background: '#E6EAF1', color: '#1F2A3D' }}>Not assessed</span><span style={{ fontSize: '14px', lineHeight: '1.45', color: '#1F2A3D' }}>We didn't have what we needed</span></div>
</div>
<p style={{ margin: '0', fontSize: '16px', lineHeight: '1.5', color: '#1F2A3D' }}><strong>We tell you what we couldn't confirm.</strong> Anyone promising certainty isn't being straight with you.</p>
</div>



{/* 6 PROOF */}
<div style={{ padding: '52px 20px 52px', background: '#E9EFFF', display: 'flex', flexDirection: 'column', gap: '20px' }}>
<span className="tag" style={{ alignSelf: 'flex-start', background: '#0B1B33', color: '#ffffff' }}>Real report · AWI-2608-039</span>
<h2 className="disp" style={{ margin: '0', fontSize: '31px', lineHeight: '1.08', fontWeight: '800', letterSpacing: '-0.02em', color: '#0B1B33' }}>A real report: the "PlayStation distributor"</h2>
<p style={{ margin: '0', fontSize: '16.5px', lineHeight: '1.5', color: '#1F2A3D' }}>A seller sent us an electronics distributor offering Nintendo and PlayStation stock.</p>

<div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
<div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><span className="disp" style={{ width: '30px', height: '30px', borderRadius: '50%', background: '#0B1B33', color: '#ffffff', fontWeight: '800', fontSize: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>1</span><strong className="disp" style={{ fontSize: '18px', color: '#0B1B33' }}>The verdict</strong></div>
<img src="/report/r1-verdict-cover.webp" alt="Verdict: Verify Before Purchase, with the reason" style={{ display: 'block', width: '100%', height: 'auto', borderRadius: '8px', boxShadow: '0 12px 28px rgba(11,27,51,.18)' }} />
</div>

<div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
<div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><span className="disp" style={{ width: '30px', height: '30px', borderRadius: '50%', background: '#0B1B33', color: '#ffffff', fontWeight: '800', fontSize: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>2</span><strong className="disp" style={{ fontSize: '18px', color: '#0B1B33' }}>The red flags</strong></div>
<div style={{ padding: '16px', background: '#ffffff', borderRadius: '10px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
<p style={{ margin: '0', fontSize: '15.5px', lineHeight: '1.5' }}>A real company with a real office and staff — but <span className="hl"><strong>not on Nintendo's retailer pages and not in Sony's dealer directory.</strong></span></p>
<p style={{ margin: '0', fontSize: '15.5px', lineHeight: '1.5' }}>Its "PlayStation" page shows only the PS4, a 2013 console.</p>
<Zoomable src="/report/r1-findings-table.webp" alt="Assessment findings table with certainty labels" style={{ display: 'block', width: '100%', height: 'auto', borderRadius: '6px', border: '1px solid #E1E7F0' }} />
</div>
</div>

<div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
<div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><span className="disp" style={{ width: '30px', height: '30px', borderRadius: '50%', background: '#0B1B33', color: '#ffffff', fontWeight: '800', fontSize: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>3</span><strong className="disp" style={{ fontSize: '18px', color: '#0B1B33' }}>What we couldn't confirm</strong></div>
<div style={{ position: 'relative', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 12px 28px rgba(11,27,51,.14)' }}>
<Zoomable src="/report/r1-could-not-confirm.webp" alt="What we could not confirm: the authorised supply chain for all three brands" style={{ display: 'block', width: '100%', height: 'auto' }} />
</div>
<p style={{ margin: '0', fontSize: '14.5px', color: '#1F2A3D' }}>The authorised supply chain for all three brands.</p>
</div>

<div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
<div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><span className="disp" style={{ width: '30px', height: '30px', borderRadius: '50%', background: '#0B1B33', color: '#ffffff', fontWeight: '800', fontSize: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>4</span><strong className="disp" style={{ fontSize: '18px', color: '#0B1B33' }}>Questions to send your supplier</strong></div>
<div style={{ position: 'relative', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 12px 28px rgba(11,27,51,.14)' }}>
<img src="/report/r1-checklist.webp" alt="Verification checklist of questions for the supplier" style={{ display: 'block', width: '100%', height: '300px', objectFit: 'cover', objectPosition: '50% 0%' }} />
<div style={{ position: 'absolute', left: '0', right: '0', bottom: '0', height: '90px', background: 'linear-gradient(180deg, rgba(255,255,255,0), #ffffff 80%)' }}></div>
<span className="tag" style={{ position: 'absolute', right: '12px', bottom: '12px', background: '#1C4FE0', color: '#ffffff' }}>18 questions · written for this case</span>
</div>
</div>

<div style={{ padding: '22px 20px', background: '#0B1B33', borderRadius: '14px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
<span className="mono" style={{ fontSize: '10.5px', fontWeight: '600', color: '#4FD6E3' }}>From this report</span>
<p className="disp" style={{ margin: '0', fontSize: '23px', lineHeight: '1.2', fontWeight: '800', color: '#ffffff' }}>We checked 5 suppliers sellers sent us. <span style={{ color: '#FFE45C' }}>The brand named none of them as authorised.</span></p>
</div>
<Cta />
</div>

{/* 7 WHO */}
<div style={{ padding: '52px 20px 48px', background: '#ffffff', display: 'flex', flexDirection: 'column', gap: '20px' }}>
<span className="tag" style={{ alignSelf: 'flex-start', background: '#E9EFFF', color: '#16305A' }}>Who's behind it</span>
<h2 className="disp" style={{ margin: '0', fontSize: '31px', lineHeight: '1.08', fontWeight: '800', letterSpacing: '-0.02em', color: '#0B1B33' }}>A founder-led research desk — not a faceless app.</h2>
<p style={{ margin: '0', fontSize: '16.5px', lineHeight: '1.5', color: '#1F2A3D' }}>Built by an Amazon operator:</p>
<div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: '10px' }}>
<div style={{ padding: '14px', border: '1px solid #E1E7F0', borderRadius: '10px', display: 'flex', flexDirection: 'column', gap: '2px' }}><span className="disp" style={{ fontSize: '30px', fontWeight: '900', color: '#0B1B33' }}>15 yrs</span><span style={{ fontSize: '13.5px', color: '#67748A' }}>in e-commerce</span></div>
<div style={{ padding: '14px', border: '1px solid #E1E7F0', borderRadius: '10px', display: 'flex', flexDirection: 'column', gap: '2px' }}><span className="disp" style={{ fontSize: '30px', fontWeight: '900', color: '#0B1B33' }}>2013</span><span style={{ fontSize: '13.5px', color: '#67748A' }}>selling on Amazon FBA</span></div>
<div style={{ padding: '14px', border: '1px solid #E1E7F0', borderRadius: '10px', display: 'flex', flexDirection: 'column', gap: '2px' }}><span className="disp" style={{ fontSize: '30px', fontWeight: '900', color: '#0B1B33' }}>2017</span><span style={{ fontSize: '13.5px', color: '#67748A' }}>in wholesale</span></div>
<div style={{ padding: '14px', border: '1px solid #E1E7F0', borderRadius: '10px', display: 'flex', flexDirection: 'column', gap: '2px' }}><span className="disp" style={{ fontSize: '30px', fontWeight: '900', color: '#0B1B33' }}>50+</span><span style={{ fontSize: '13.5px', color: '#67748A' }}>seller accounts onboarded</span></div>
<div style={{ gridColumn: 'span 2', padding: '14px', border: '1px solid #E1E7F0', borderRadius: '10px', display: 'flex', alignItems: 'baseline', gap: '10px' }}><span className="disp" style={{ fontSize: '30px', fontWeight: '900', color: '#0B1B33' }}>$10M+</span><span style={{ fontSize: '13.5px', color: '#67748A' }}>in wholesale purchase orders managed</span></div>
</div>
<p style={{ margin: '0', fontSize: '16.5px', lineHeight: '1.55', color: '#1F2A3D' }}>We built HyprrIQ after going through <strong>hundreds of wholesale invoices and data points</strong> — and seeing the same gaps come up again and again.</p>
<div style={{ padding: '20px', background: '#0B1B33', borderRadius: '14px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
<svg width="28" height="22" viewBox="0 0 28 22" fill="#4FD6E3"><path d="M0 22V12C0 5 3.5 1 10 0l1.5 3C7.5 4.5 6 7 6 10h5v12zm16 0V12c0-7 3.5-11 10-12l1.5 3C23.5 4.5 22 7 22 10h5v12z" /></svg>
<p className="disp" style={{ margin: '0', fontSize: '21px', lineHeight: '1.3', fontWeight: '700', color: '#ffffff' }}>I've written the plans of action. This report is the check I wish every seller ran first.</p>
<span className="mono" style={{ fontSize: '10.5px', color: '#9FB3D1' }}>— Founder, HyprrIQ</span>
</div>
<div style={{ display: 'flex', gap: '12px', alignItems: 'center', padding: '14px 16px', background: '#F6F8FB', borderRadius: '10px' }}><svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#1C4FE0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: '0' }}><circle cx="12" cy="8" r="4" /><path d="M4 21c1-4 4-6 8-6s7 2 8 6" /><path d="m15 11 2 2 4-4" /></svg><span style={{ fontSize: '15px', lineHeight: '1.4', color: '#1F2A3D' }}><strong>Every report is reviewed by a person</strong> before it reaches you.</span></div>
</div>

{/* 8 WHAT YOU GET */}
<div style={{ padding: '52px 20px 48px', background: '#F6F8FB', display: 'flex', flexDirection: 'column', gap: '20px' }}>
<span className="tag" style={{ alignSelf: 'flex-start', background: '#E9EFFF', color: '#16305A' }}>What you get</span>
<div style={{ position: 'relative', height: '250px' }}>
<img src="/report/r1-verdict-page.webp" alt="Report page with verdict and the single most important risk" style={{ position: 'absolute', left: '34px', top: '0', width: '290px', height: '250px', objectFit: 'cover', objectPosition: '50% 0%', borderRadius: '8px', border: '4px solid #ffffff', boxShadow: '0 20px 40px rgba(11,27,51,.2)', transform: 'rotate(-2deg)' }} />
<Zoomable src="/report/r1-findings-table.webp" alt="" style={{ position: 'absolute', right: '-6px', top: '150px', width: '200px', height: 'auto', borderRadius: '6px', border: '3px solid #ffffff', boxShadow: '0 16px 30px rgba(11,27,51,.22)', transform: 'rotate(3deg)' }} />
</div>
<div style={{ display: 'flex', flexDirection: 'column', gap: '12px', paddingTop: '6px' }}>
<div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#15804A" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: '0' }}><path d="m5 12 5 5 9-10" /></svg><span style={{ fontSize: '16px', lineHeight: '1.45' }}><strong>The verdict</strong> — one of four levels — and the single most important risk, in plain English</span></div>
<div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#15804A" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: '0' }}><path d="m5 12 5 5 9-10" /></svg><span style={{ fontSize: '16px', lineHeight: '1.45' }}><strong>Findings for all 5 areas</strong>, each with its certainty label</span></div>
<div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#15804A" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: '0' }}><path d="m5 12 5 5 9-10" /></svg><span style={{ fontSize: '16px', lineHeight: '1.45' }}><strong>What we could not confirm</strong></span></div>
<div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#15804A" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: '0' }}><path d="m5 12 5 5 9-10" /></svg><span style={{ fontSize: '16px', lineHeight: '1.45' }}><strong>The questions to send your supplier</strong> before you pay</span></div>
<div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#15804A" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: '0' }}><path d="m5 12 5 5 9-10" /></svg><span style={{ fontSize: '16px', lineHeight: '1.45' }}><strong>Up to 5 brands</strong> checked — all from the one supplier</span></div>
<div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#15804A" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: '0' }}><path d="m5 12 5 5 9-10" /></svg><span style={{ fontSize: '16px', lineHeight: '1.45' }}><strong>PDF in your inbox within 10 hours.</strong> No account. No subscription.</span></div>
</div>
</div>

{/* 9 OFFER + 10 GUARANTEE */}
<div id="offer" style={{ padding: '52px 20px 52px', background: '#0B1B33', display: 'flex', flexDirection: 'column', gap: '20px' }}>
<h2 className="disp" style={{ margin: '0', fontSize: '31px', lineHeight: '1.08', fontWeight: '900', letterSpacing: '-0.02em', color: '#ffffff', textAlign: 'center' }}>One report costs less than a single <span style={{ color: '#FFE45C' }}>unsellable carton.</span></h2>
<div style={{ position: 'relative', padding: '28px 22px 24px', background: '#ffffff', borderRadius: '16px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '14px', boxShadow: '0 30px 60px rgba(0,0,0,.35)' }}>
<span className="tag" style={{ position: 'absolute', top: '-12px', background: '#1C4FE0', color: '#ffffff' }}>Supplier Report</span>
<div style={{ display: 'flex', alignItems: 'flex-start', gap: '2px' }}><span className="disp" style={{ fontSize: '30px', fontWeight: '800', color: '#0B1B33', marginTop: '12px' }}>$</span><span className="disp" style={{ fontSize: '84px', lineHeight: '1', fontWeight: '900', letterSpacing: '-0.04em', color: '#0B1B33' }}>79</span></div>
<span className="mono" style={{ fontSize: '11px', fontWeight: '600', color: '#67748A' }}>One-time · no subscription</span>
<div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '0', borderTop: '1px solid #E1E7F0', borderBottom: '1px solid #E1E7F0' }}>
<div style={{ display: 'flex', justifyContent: 'space-between', padding: '11px 0', borderBottom: '1px solid #EEF2F7', fontSize: '15px' }}><span style={{ color: '#67748A' }}>Supplier</span><strong>1</strong></div>
<div style={{ display: 'flex', justifyContent: 'space-between', padding: '11px 0', borderBottom: '1px solid #EEF2F7', fontSize: '15px' }}><span style={{ color: '#67748A' }}>Brands from that supplier</span><strong>Up to 5</strong></div>
<div style={{ display: 'flex', justifyContent: 'space-between', padding: '11px 0', fontSize: '15px' }}><span style={{ color: '#67748A' }}>Delivered</span><strong>Within 10 hours</strong></div>
</div>
<Cta style={{ width: '100%' }} />
<span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12.5px', color: '#67748A' }}><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#67748A" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="11" width="14" height="10" rx="2" /><path d="M8 11V8a4 4 0 0 1 8 0v3" /></svg>Secure checkout</span>
</div>
{/* guarantee */}
<div id="guarantee" style={{ display: 'grid', gridTemplateColumns: '76px minmax(0, 1fr)', gap: '14px', alignItems: 'center', padding: '18px', border: '1.5px dashed #4FD6E3', borderRadius: '14px' }}>
<div style={{ width: '76px', height: '76px', borderRadius: '50%', background: '#4FD6E3', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#0B1B33', transform: 'rotate(-8deg)' }}><span className="disp" style={{ fontSize: '26px', fontWeight: '900', lineHeight: '1' }}>10h</span><span className="mono" style={{ fontSize: '8.5px', fontWeight: '600' }}>or refund</span></div>
<p style={{ margin: '0', fontSize: '15px', lineHeight: '1.45', color: '#D8F1FF' }}><strong style={{ color: '#ffffff' }}>Not in your inbox within 10 hours? Full refund.</strong> If we can't take on your case, you're refunded in full.</p>
</div>
</div>

{/* 11 FAQ */}
<div style={{ padding: '52px 20px 44px', background: '#ffffff', display: 'flex', flexDirection: 'column', gap: '14px' }}>
<h2 className="disp" style={{ margin: '0 0 6px', fontSize: '28px', fontWeight: '800', color: '#0B1B33' }}>Questions sellers ask</h2>
<details open style={{ borderBottom: '1px solid #E1E7F0', paddingBottom: '14px' }}><summary style={{ display: 'flex', justifyContent: 'space-between', gap: '12px', fontWeight: '700', fontSize: '16.5px', color: '#0B1B33', minHeight: '44px', alignItems: 'center' }}>Can't I check this myself?<span className="faq-i" /></summary><p style={{ margin: '6px 0 0', fontSize: '15px', lineHeight: '1.55', color: '#1F2A3D' }}>You can try. It's 20 tabs and several hours, and you still won't know what you missed. We give you the sources.</p></details>
<details style={{ borderBottom: '1px solid #E1E7F0', paddingBottom: '14px' }}><summary style={{ display: 'flex', justifyContent: 'space-between', gap: '12px', fontWeight: '700', fontSize: '16.5px', color: '#0B1B33', minHeight: '44px', alignItems: 'center' }}>Do you guarantee I won't get suspended?<span className="faq-i" /></summary><p style={{ margin: '6px 0 0', fontSize: '15px', lineHeight: '1.55' }}>No — nobody honestly can. We show you the risk before you pay, while you can still walk away or ask the right questions.</p></details>
<details style={{ borderBottom: '1px solid #E1E7F0', paddingBottom: '14px' }}><summary style={{ display: 'flex', justifyContent: 'space-between', gap: '12px', fontWeight: '700', fontSize: '16.5px', color: '#0B1B33', minHeight: '44px', alignItems: 'center' }}>Will my supplier know?<span className="faq-i" /></summary><p style={{ margin: '6px 0 0', fontSize: '15px', lineHeight: '1.55' }}>No. We never contact them.</p></details>
<details style={{ borderBottom: '1px solid #E1E7F0', paddingBottom: '14px' }}><summary style={{ display: 'flex', justifyContent: 'space-between', gap: '12px', fontWeight: '700', fontSize: '16.5px', color: '#0B1B33', minHeight: '44px', alignItems: 'center' }}>What do you need from me?<span className="faq-i" /></summary><p style={{ margin: '6px 0 0', fontSize: '15px', lineHeight: '1.55' }}>The supplier's name, website and the brands you want to buy — plus an invoice or LOA if you have one.</p></details>
<details style={{ borderBottom: '1px solid #E1E7F0', paddingBottom: '14px' }}><summary style={{ display: 'flex', justifyContent: 'space-between', gap: '12px', fontWeight: '700', fontSize: '16.5px', color: '#0B1B33', minHeight: '44px', alignItems: 'center' }}>How fast?<span className="faq-i" /></summary><p style={{ margin: '6px 0 0', fontSize: '15px', lineHeight: '1.55' }}>Within 10 hours.</p></details>
<details style={{ borderBottom: '1px solid #E1E7F0', paddingBottom: '14px' }}><summary style={{ display: 'flex', justifyContent: 'space-between', gap: '12px', fontWeight: '700', fontSize: '16.5px', color: '#0B1B33', minHeight: '44px', alignItems: 'center' }}>I'm buying 5 brands from 5 different suppliers. Is that one report?<span className="faq-i" /></summary><p style={{ margin: '6px 0 0', fontSize: '15px', lineHeight: '1.55' }}>No — that's 5 reports. Each report checks one supplier against the brands it's selling you. A report stretched across 5 suppliers would check each of them too thinly to be worth your $79.</p></details>
<details style={{ paddingBottom: '6px' }}><summary style={{ display: 'flex', justifyContent: 'space-between', gap: '12px', fontWeight: '700', fontSize: '16.5px', color: '#0B1B33', minHeight: '44px', alignItems: 'center' }}>Is this legal advice?<span className="faq-i" /></summary><p style={{ margin: '6px 0 0', fontSize: '15px', lineHeight: '1.55' }}>No. It's research and evidence.</p></details>
</div>

{/* 12 FINAL */}
<div style={{ padding: '56px 20px 40px', backgroundColor: '#0B1B33', backgroundImage: 'linear-gradient(rgba(216,241,255,.05) 1px, transparent 1px), linear-gradient(90deg, rgba(216,241,255,.05) 1px, transparent 1px)', backgroundSize: '26px 26px', display: 'flex', flexDirection: 'column', gap: '22px' }}>
<h2 className="disp" style={{ margin: '0', fontSize: '38px', lineHeight: '1.04', fontWeight: '900', letterSpacing: '-0.025em', color: '#ffffff' }}>You can't un-send a wire. <span className="hld">You can check the supplier first.</span></h2>
<Cta />
<p style={{ margin: '0', padding: '16px', borderLeft: '0', background: '#11274A', borderRadius: '10px', fontSize: '16px', lineHeight: '1.5', color: '#D8F1FF' }}><strong style={{ color: '#ffffff' }}>P.S.</strong> A plan of action takes weeks. This takes 10 hours and $79.</p>
</div>

{/* FOOTER (fills remaining height) */}
<div style={{ flexGrow: '1', padding: '28px 20px 110px', background: '#081427', display: 'flex', flexDirection: 'column', gap: '14px' }}>
<img src="/report/hyprriq-logo-reversed.svg" alt="HyprrIQ" style={{ height: '22px', width: 'auto', alignSelf: 'flex-start' }} />
<div style={{ display: 'flex', gap: '16px', fontSize: '13px' }}><a href="https://hyprrx.com/terms" style={{ color: '#9FB3D1' }}>Terms</a><a href="https://hyprrx.com/privacy" style={{ color: '#9FB3D1' }}>Privacy</a><a href="#guarantee" style={{ color: '#9FB3D1' }}>Refunds</a><a href="mailto:hello@hyprriq.com" style={{ color: '#9FB3D1' }}>Contact</a></div>
<p style={{ margin: '0', fontSize: '12px', lineHeight: '1.5', color: '#7F93B2' }}>Research and evidence, not legal advice. Not affiliated with Amazon. Notices shown are real, with identifying details removed.</p>
</div>


      <StickyBar />
    </main>
  );
}
