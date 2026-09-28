"use client";

import { useState } from "react";
import { confirmed, review, thankYou } from "../content";
import SupplierForm from "./SupplierForm";

export type Saved = { supplier_name: string; supplier_website: string; brands: string; category: string; notes: string; files: string };
type Mode = "new" | "review" | "edit" | "confirmed";

const H1 = ({ children }: { children: React.ReactNode }) => (
  <h1 className="disp" style={{ margin: 0, fontSize: "31px", lineHeight: 1.08, fontWeight: 800, letterSpacing: "-0.02em", color: "#0B1B33" }}>{children}</h1>
);
const Tag = ({ children, tone }: { children: React.ReactNode; tone: "green" | "blue" }) => (
  <span className="tag" style={{ alignSelf: "flex-start", background: tone === "green" ? "#DDF1E5" : "#E9EFFF", color: tone === "green" ? "#0F5E36" : "#16305A" }}>{children}</span>
);

function SentBox({ saved, title }: { saved: Saved; title: string }) {
  const rows: [string, string][] = [
    ["Supplier", saved.supplier_name],
    ["Website", saved.supplier_website],
    ["Brands", saved.brands],
    ["Category", saved.category],
    ["Notes", saved.notes],
    ["Files", saved.files],
  ];
  return (
    <div style={{ border: "3px solid #0B1B33", borderRadius: "8px", padding: "18px 18px 6px", display: "flex", flexDirection: "column", gap: "4px" }}>
      <strong className="disp" style={{ fontSize: "19px", color: "#0B1B33", marginBottom: "8px" }}>{title}</strong>
      {rows.filter(([, v]) => v).map(([k, v]) => (
        <div key={k} style={{ display: "grid", gridTemplateColumns: "88px 1fr", gap: "10px", padding: "8px 0", borderTop: "1px solid #E1E7F0", fontSize: "15px", lineHeight: 1.45 }}>
          <span className="mono" style={{ fontSize: "10.5px", color: "#67748A", paddingTop: "3px" }}>{k.toUpperCase()}</span>
          <span style={{ color: "#0B1B33", overflowWrap: "anywhere" }}>{v}</span>
        </div>
      ))}
    </div>
  );
}

const OrderNo = ({ no }: { no: string }) => (no ? <p style={{ margin: "-8px 0 0", fontSize: "13px", color: "#67748A" }}>Order {no}</p> : null);

export default function ThankYouFlow({ sessionId, orderNo, email, submitted, saved: initial }: { sessionId: string; orderNo: string; email: string; submitted: boolean; saved: Saved }) {
  const [mode, setMode] = useState<Mode>(submitted ? "review" : "new");
  const [saved, setSaved] = useState<Saved>(initial);
  const [wasUpdate, setWasUpdate] = useState(false);

  if (mode === "confirmed")
    return (
      <>
        <Tag tone="green">{confirmed.tag}</Tag>
        <H1>{confirmed.title}</H1>
        <p style={{ margin: 0, fontSize: "16.5px", lineHeight: 1.5, color: "#1F2A3D" }}>{confirmed.line(email)}{wasUpdate ? ` ${review.updated}` : ""}</p>
        <OrderNo no={orderNo} />
        <SentBox saved={saved} title={confirmed.sentTitle} />
        <p style={{ margin: "-6px 0 0", fontSize: "13.5px", color: "#67748A" }}>{confirmed.wrong}</p>
        <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginTop: "6px" }}>
          <strong className="disp" style={{ fontSize: "19px", color: "#0B1B33" }}>{confirmed.nextTitle}</strong>
          {confirmed.steps.map((s, i) => (
            <div key={s} style={{ display: "flex", gap: "12px", alignItems: "flex-start", fontSize: "15.5px", lineHeight: 1.5 }}>
              <span className="mono" style={{ flexShrink: 0, width: "26px", height: "26px", borderRadius: "50%", background: "#0B1B33", color: "#fff", fontSize: "11px", display: "flex", alignItems: "center", justifyContent: "center" }}>{i + 1}</span>
              <span>{s}</span>
            </div>
          ))}
        </div>
        <p style={{ margin: "6px 0 0", fontSize: "13px", lineHeight: 1.5, color: "#67748A" }}>{confirmed.small}</p>
      </>
    );

  if (mode === "review")
    return (
      <>
        <Tag tone="green">{confirmed.tag}</Tag>
        <H1>{review.title}</H1>
        <p style={{ margin: 0, fontSize: "16.5px", lineHeight: 1.5, color: "#1F2A3D" }}>{confirmed.line(email)}</p>
        <OrderNo no={orderNo} />
        <SentBox saved={saved} title={confirmed.sentTitle} />
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          <button type="button" className="cta" style={{ flex: "1 1 200px" }} onClick={() => setMode("confirmed")}><b>{review.ok}</b></button>
          <button type="button" className="cta" style={{ flex: "1 1 200px", background: "#fff", color: "#0B1B33", boxShadow: "0 5px 0 #0B1B33", border: "2px solid #0B1B33" }} onClick={() => setMode("edit")}><b>{review.edit}</b></button>
        </div>
        <p style={{ margin: 0, fontSize: "13px", lineHeight: 1.5, color: "#67748A" }}>{confirmed.small}</p>
      </>
    );

  const editing = mode === "edit";
  return (
    <>
      <Tag tone={editing ? "blue" : "green"}>{editing ? "Edit your details" : "Payment received"}</Tag>
      <H1>{editing ? review.edit : thankYou.title}</H1>
      <p style={{ margin: 0, fontSize: "14px", color: "#67748A" }}>
        {thankYou.sentTo} <strong>{email}</strong>.{orderNo ? ` Order ${orderNo}.` : ""}
      </p>
      <SupplierForm
        sessionId={sessionId}
        prefill={saved}
        editing={editing}
        onDone={(next) => {
          setSaved(next);
          setWasUpdate(editing);
          setMode("confirmed");
          window.scrollTo({ top: 0 });
        }}
      />
    </>
  );
}
