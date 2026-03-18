"use client";

import { useMemo, useState } from "react";

type MoneyFields = {
  cash: number;
  bank: number;
  gold: number;
  silver: number;
  investments: number;
  businessAssets: number;
  receivables: number;
  otherAssets: number;
  debtsDue: number; // short-term debts due now
};

function formatINR(amount: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

export default function ZakatClient() {
  const [nisab, setNisab] = useState<number>(50000);
  const [useSilverNisabHint, setUseSilverNisabHint] = useState(true);

  const [f, setF] = useState<MoneyFields>({
    cash: 0,
    bank: 0,
    gold: 0,
    silver: 0,
    investments: 0,
    businessAssets: 0,
    receivables: 0,
    otherAssets: 0,
    debtsDue: 0,
  });

  const totals = useMemo(() => {
    const assets =
      f.cash +
      f.bank +
      f.gold +
      f.silver +
      f.investments +
      f.businessAssets +
      f.receivables +
      f.otherAssets;

    const net = Math.max(0, assets - f.debtsDue);

    const zakatable = net >= nisab;
    const zakatDue = zakatable ? net * 0.025 : 0;

    return { assets, net, zakatable, zakatDue };
  }, [f, nisab]);

  function Field({
    label,
    value,
    onCommit,
    hint,
  }: {
    label: string;
    value: number;
    onCommit: (v: number) => void;
    hint?: string;
  }) {
    const [displayValue, setDisplayValue] = useState<string>(() =>
      value === 0 ? "" : value.toString()
    );

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const input = e.target.value.replace(/[^0-9]/g, ""); // only allow digits
      setDisplayValue(input);
    };

    const handleBlur = () => {
      const num = displayValue === "" ? 0 : Number(displayValue);
      onCommit(num);
      // Optional: format nicely after blur (remove leading zeros etc.)
      setDisplayValue(num === 0 ? "" : num.toString());
    };

    return (
      <div style={{ display: "grid", gap: 6 }}>
        <label style={{ fontSize: 12, color: "#475569", fontWeight: 700 }}>
          {label}
        </label>
        <input
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          value={displayValue}
          onChange={handleChange}
          onBlur={handleBlur}
          onFocus={(e) => e.target.select()}
          style={{
            padding: 12,
            borderRadius: 12,
            border: "1px solid #e5e7eb",
            background: "white",
          }}
          placeholder="0"
        />
        {hint ? (
          <div style={{ fontSize: 12, color: "#64748b", lineHeight: 1.4 }}>
            {hint}
          </div>
        ) : null}
      </div>
    );
  }

  return (
    <main style={{ background: "#f8fafc", minHeight: "100vh" }}>
      {/* Header */}
      <section style={{ background: "white", borderBottom: "1px solid #e5e7eb" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "28px 16px" }}>
          <div style={{ textAlign: "center" }}>
            <div
              style={{
                display: "inline-block",
                padding: "6px 10px",
                borderRadius: 999,
                background: "rgba(6,95,70,0.10)",
                color: "#065f46",
                fontWeight: 800,
                fontSize: 12,
              }}
            >
              Zakat-al-Mal Calculator
            </div>

            <h1 style={{ margin: "12px 0 6px", fontSize: 34, fontWeight: 900 }}>
              Calculate your <span style={{ color: "#16a34a" }}>Zakat</span> (2.5%)
            </h1>

            <p
              style={{
                margin: 0,
                color: "#475569",
                maxWidth: 820,
                marginInline: "auto",
                lineHeight: 1.6,
              }}
            >
              Enter your zakatable assets and short-term debts. If your net assets
              exceed Nisab, Zakat due is 2.5%.
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section style={{ padding: "22px 16px 50px" }}>
        <div
          className="zakat-grid"
          style={{
            maxWidth: 1100,
            margin: "0 auto",
            display: "grid",
            gap: 16,
            gridTemplateColumns: "1fr",
            alignItems: "start",
          }}
        >
          {/* Left: Inputs */}
          <div
            style={{
              background: "white",
              border: "1px solid #e5e7eb",
              borderRadius: 16,
              padding: 16,
            }}
          >
            <h2 style={{ margin: 0, fontSize: 18 }}>Your Zakatable Assets</h2>
            <p style={{ margin: "6px 0 0", color: "#64748b", fontSize: 13 }}>
              Values in INR. You can adjust Nisab value below.
            </p>

            <div
              style={{
                marginTop: 14,
                display: "grid",
                gap: 12,
                gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              }}
            >
              <Field
                label="Cash in hand"
                value={f.cash}
                onCommit={(v) => setF((prev) => ({ ...prev, cash: v }))}
              />
              <Field
                label="Bank balance"
                value={f.bank}
                onCommit={(v) => setF((prev) => ({ ...prev, bank: v }))}
              />
              <Field
                label="Gold value"
                value={f.gold}
                onCommit={(v) => setF((prev) => ({ ...prev, gold: v }))}
                hint="Enter current market value of gold you own."
              />
              <Field
                label="Silver value"
                value={f.silver}
                onCommit={(v) => setF((prev) => ({ ...prev, silver: v }))}
                hint="Enter current market value of silver you own."
              />
              <Field
                label="Investments"
                value={f.investments}
                onCommit={(v) => setF((prev) => ({ ...prev, investments: v }))}
                hint="Stocks, mutual funds, savings plans (zakatable portion)."
              />
              <Field
                label="Business inventory / trade goods"
                value={f.businessAssets}
                onCommit={(v) => setF((prev) => ({ ...prev, businessAssets: v }))}
              />
              <Field
                label="Receivables (money owed to you)"
                value={f.receivables}
                onCommit={(v) => setF((prev) => ({ ...prev, receivables: v }))}
              />
              <Field
                label="Other zakatable assets"
                value={f.otherAssets}
                onCommit={(v) => setF((prev) => ({ ...prev, otherAssets: v }))}
              />
              <Field
                label="Debts due now (short-term)"
                value={f.debtsDue}
                onCommit={(v) => setF((prev) => ({ ...prev, debtsDue: v }))}
                hint="Only debts/payments due immediately (not long-term future payments)."
              />
            </div>

            <div
              style={{
                marginTop: 16,
                paddingTop: 16,
                borderTop: "1px solid #e5e7eb",
                display: "grid",
                gap: 10,
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
                <div>
                  <div style={{ fontWeight: 800, fontSize: 13 }}>Nisab Threshold (INR)</div>
                  <div style={{ fontSize: 12, color: "#64748b", marginTop: 4 }}>
                    Nisab is the minimum wealth threshold. Many use the *silver nisab* as a cautious option.
                  </div>
                </div>

                <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
                  <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: "#475569" }}>
                    <input
                      type="checkbox"
                      checked={useSilverNisabHint}
                      onChange={(e) => setUseSilverNisabHint(e.target.checked)}
                    />
                    Show silver-nisab hint
                  </label>
                </div>
              </div>

              <input
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                value={nisab === 0 ? "" : nisab.toString()}
                onChange={(e) => {
                  const raw = e.target.value.replace(/[^0-9]/g, "");
                  setNisab(raw === "" ? 0 : Number(raw));
                }}
                onBlur={() => {
                  if (nisab === 0) setNisab(50000); // optional: restore default if cleared
                }}
                style={{
                  padding: 12,
                  borderRadius: 12,
                  border: "1px solid #e5e7eb",
                  background: "white",
                  maxWidth: 280,
                }}
              />

              {useSilverNisabHint && (
                <div
                  style={{
                    background: "rgba(245,158,11,0.12)",
                    border: "1px solid rgba(245,158,11,0.25)",
                    padding: 12,
                    borderRadius: 12,
                    fontSize: 12,
                    color: "#7c2d12",
                    lineHeight: 1.5,
                  }}
                >
                  Tip: For higher caution, many scholars recommend using the *silver Nisab* value (usually lower than
                  gold). You can enter your preferred Nisab here.
                </div>
              )}
            </div>
          </div>

          {/* Right: Results */}
          <div style={{ display: "grid", gap: 14 }}>
            <div
              style={{
                background: "white",
                border: "1px solid #e5e7eb",
                borderRadius: 16,
                padding: 16,
              }}
            >
              <h2 style={{ margin: 0, fontSize: 18 }}>Summary</h2>

              <div style={{ marginTop: 12, display: "grid", gap: 10, fontSize: 14 }}>
                <Row label="Total zakatable assets" value={formatINR(totals.assets)} />
                <Row label="Debts due now" value={`- ${formatINR(f.debtsDue)}`} />
                <div style={{ borderTop: "1px solid #e5e7eb", marginTop: 6, paddingTop: 10 }}>
                  <Row label="Net zakatable wealth" value={formatINR(totals.net)} bold />
                </div>
                <Row label="Nisab threshold" value={formatINR(nisab)} />
              </div>

              <div
                style={{
                  marginTop: 14,
                  borderRadius: 14,
                  padding: 14,
                  border: totals.zakatable ? "1px solid rgba(22,163,74,0.35)" : "1px solid rgba(148,163,184,0.45)",
                  background: totals.zakatable ? "rgba(22,163,74,0.08)" : "rgba(148,163,184,0.12)",
                }}
              >
                <div style={{ fontWeight: 900, fontSize: 14, color: totals.zakatable ? "#166534" : "#334155" }}>
                  {totals.zakatable
                    ? "Zakat is due (net wealth meets/exceeds Nisab)"
                    : "No zakat due (net wealth below Nisab)"}
                </div>

                <div style={{ marginTop: 10, display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
                  <div style={{ color: "#64748b", fontSize: 12, lineHeight: 1.5 }}>
                    Zakat due = <b>2.5%</b> of net zakatable wealth
                  </div>
                  <div style={{ fontSize: 22, fontWeight: 900, color: totals.zakatable ? "#16a34a" : "#334155" }}>
                    {formatINR(totals.zakatDue)}
                  </div>
                </div>
              </div>

              <div style={{ marginTop: 12, fontSize: 12, color: "#64748b", lineHeight: 1.5 }}>
                Note: This calculator is for general guidance. Please consult a qualified scholar for complex cases.
              </div>
            </div>

            <div
              style={{
                background: "white",
                border: "1px solid #e5e7eb",
                borderRadius: 16,
                padding: 16,
              }}
            >
              <h3 style={{ margin: 0, fontSize: 16 }}>Next step</h3>
              <p style={{ margin: "8px 0 0", color: "#64748b", fontSize: 13, lineHeight: 1.5 }}>
                If you’d like, we can add a button to donate your Zakat directly (Razorpay) and store receipts in your
                account.
              </p>

              <a
                href="/donation"
                style={{
                  display: "inline-block",
                  marginTop: 12,
                  textDecoration: "none",
                  background: "#065f46",
                  color: "white",
                  padding: "10px 14px",
                  borderRadius: 12,
                  fontWeight: 800,
                }}
              >
                Donate Zakat →
              </a>
            </div>
          </div>
        </div>

        <style>{`
          @media (min-width: 980px) {
            .zakat-grid { grid-template-columns: 1.7fr 1fr; }
          }
        `}</style>
      </section>
    </main>
  );
}

function Row({ label, value, bold }: { label: string; value: string; bold?: boolean }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
      <div style={{ color: "#475569", fontWeight: bold ? 900 : 700 }}>{label}</div>
      <div style={{ fontWeight: bold ? 900 : 800 }}>{value}</div>
    </div>
  );
}