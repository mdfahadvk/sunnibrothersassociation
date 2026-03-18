"use client";

import { useMemo, useState } from "react";

type Cause = {
  id: string;
  title: string;
  desc: string;
  suggested: number | null;
};

const causes: Cause[] = [
  {
    id: "student-education",
    title: "Sponsor Student Education",
    desc: "Cover monthly tuition fees, study materials, and uniform support.",
    suggested: 2500,
  },
  {
    id: "quran-class",
    title: "Sponsor Quran Class",
    desc: "Support teachers and classroom maintenance for children’s education.",
    suggested: 1200,
  },
  {
    id: "food-packs",
    title: "Donate Food Packs",
    desc: "Provide a monthly dry ration kit for a family in need.",
    suggested: 3500,
  },
  {
    id: "blankets",
    title: "Winter Blankets",
    desc: "Provide warm blankets for vulnerable families during winter.",
    suggested: 500,
  },
  {
    id: "general-fund",
    title: "General Welfare Fund",
    desc: "Emergency aid & operational expenses for community support programs.",
    suggested: null,
  },
  {
    id: "zakat",
    title: "Zakat-al-Mal",
    desc: "Your zakat distributed to eligible beneficiaries as per Shariah.",
    suggested: 2500,
  },
];

declare global {
  interface Window {
    Razorpay?: any;
  }
}

function formatINR(amount: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

export default function DonationClient() {
  const [selectedCause, setSelectedCause] = useState<Cause>(causes[0]);
  const [amount, setAmount] = useState<number>(causes[0].suggested ?? 500);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const minAmount = 1;

  const quickAmounts = useMemo(() => {
    const base = selectedCause.suggested ?? 500;
    return [base, base * 2, 500, 1000, 2500].filter((v, i, arr) => arr.indexOf(v) === i);
  }, [selectedCause]);

  async function loadRazorpayScript() {
    if (window.Razorpay) return true;
    return new Promise<boolean>((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  }

  async function handlePay() {
    if (!amount || amount < minAmount) return alert("Please enter a valid amount.");

    setLoading(true);
    try {
      const ok = await loadRazorpayScript();
      if (!ok) {
        alert("Failed to load Razorpay. Please try again.");
        return;
      }

      // 1) Create order on server
      const res = await fetch("/api/razorpay/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount,
          causeId: selectedCause.id,
          causeTitle: selectedCause.title,
          name,
          email,
          phone,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        alert(data?.error ?? "Unable to create order");
        return;
      }

      // 2) Open Razorpay Checkout
      const options = {
        key: data.key, // public key from server
        amount: data.amount, // paise
        currency: data.currency,
        name: "Sunni Brothers Association",
        description: selectedCause.title,
        order_id: data.orderId,
        prefill: { name, email, contact: phone },
        notes: { causeId: selectedCause.id, causeTitle: selectedCause.title },
        theme: { color: "#065f46" },
        handler: async function (response: any) {
          // 3) Verify payment on server
          const v = await fetch("/api/razorpay/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              orderId: response.razorpay_order_id,
              paymentId: response.razorpay_payment_id,
              signature: response.razorpay_signature,
            }),
          });

          const vd = await v.json();
          if (!v.ok) {
            alert(vd?.error ?? "Payment verification failed");
            return;
          }

          alert("✅ Payment successful! JazakAllahu Khairan.");
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } finally {
      setLoading(false);
    }
  }

  return (
    <main style={{ background: "#f8fafc", minHeight: "100vh" }}>
      {/* Hero */}
      <section
        style={{
          background: "white",
          borderBottom: "1px solid #e5e7eb",
        }}
      >
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "30px 16px" }}>
          <div style={{ textAlign: "center" }}>
            <div
              style={{
                display: "inline-block",
                padding: "6px 10px",
                borderRadius: 999,
                background: "rgba(6,95,70,0.10)",
                color: "#065f46",
                fontWeight: 700,
                fontSize: 12,
              }}
            >
              Accountable • Secure • Transparent
            </div>
            <h1 style={{ margin: "12px 0 6px", fontSize: 34, fontWeight: 900 }}>
              Your Charity <span style={{ color: "#16a34a" }}>Changes Lives</span>
            </h1>
            <p style={{ margin: 0, color: "#475569", maxWidth: 820, marginInline: "auto", lineHeight: 1.6 }}>
              Empower education and provide humanitarian aid to those most vulnerable through your generous contributions.
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section style={{ padding: "22px 16px 50px" }}>
        <div
          style={{
            maxWidth: 1100,
            margin: "0 auto",
            display: "grid",
            gap: 16,
            gridTemplateColumns: "1fr",
          }}
          className="donation-grid"
        >
          {/* Left: Causes */}
          <div
            style={{
              background: "white",
              border: "1px solid #e5e7eb",
              borderRadius: 16,
              padding: 16,
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 10 }}>
              <div>
                <h2 style={{ margin: 0, fontSize: 18 }}>Choose a Cause</h2>
                <p style={{ margin: "6px 0 0", color: "#64748b", fontSize: 13 }}>
                  Select one program and donate securely
                </p>
              </div>

              <a href="#" style={{ color: "#16a34a", fontSize: 13, textDecoration: "none" }}>
                View impact report →
              </a>
            </div>

            <div
              style={{
                marginTop: 14,
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
                gap: 12,
              }}
            >
              {causes.map((c) => {
                const active = c.id === selectedCause.id;
                return (
                  <button
                    key={c.id}
                    onClick={() => {
                      setSelectedCause(c);
                      setAmount(c.suggested ?? 500);
                    }}
                    style={{
                      textAlign: "left",
                      background: active ? "rgba(6,95,70,0.07)" : "white",
                      border: active ? "1px solid rgba(6,95,70,0.35)" : "1px solid #e5e7eb",
                      borderRadius: 14,
                      padding: 14,
                      cursor: "pointer",
                    }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", gap: 10 }}>
                      <div style={{ fontWeight: 800 }}>{c.title}</div>
                      {c.suggested ? (
                        <span
                          style={{
                            fontSize: 12,
                            fontWeight: 800,
                            color: "#065f46",
                            background: "rgba(6,95,70,0.10)",
                            padding: "4px 8px",
                            borderRadius: 999,
                            height: "fit-content",
                          }}
                        >
                          {formatINR(c.suggested)}
                        </span>
                      ) : (
                        <span style={{ fontSize: 12, color: "#64748b" }}>Any</span>
                      )}
                    </div>
                    <p style={{ margin: "8px 0 0", color: "#64748b", fontSize: 13, lineHeight: 1.5 }}>{c.desc}</p>
                    <div style={{ marginTop: 12 }}>
                      <span
                        style={{
                          display: "inline-block",
                          fontSize: 12,
                          fontWeight: 700,
                          color: active ? "white" : "#065f46",
                          background: active ? "#065f46" : "rgba(6,95,70,0.10)",
                          padding: "8px 10px",
                          borderRadius: 10,
                        }}
                      >
                        {active ? "Selected" : "Support Cause"}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            <div
              style={{
                marginTop: 14,
                borderTop: "1px solid #e5e7eb",
                paddingTop: 14,
                display: "grid",
                gap: 10,
                gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              }}
            >
              <div>
                <div style={{ fontWeight: 800, fontSize: 13 }}>Donation Policies</div>
                <div style={{ color: "#64748b", fontSize: 12, marginTop: 6, lineHeight: 1.5 }}>
                  Transparency-first. Receipts generated after payment. Funds allocated to chosen program.
                </div>
              </div>
              <div>
                <div style={{ fontWeight: 800, fontSize: 13 }}>Receipt Generation</div>
                <div style={{ color: "#64748b", fontSize: 12, marginTop: 6, lineHeight: 1.5 }}>
                  We can email your receipt and keep donation history in your profile.
                </div>
              </div>
            </div>
          </div>

          {/* Right: Checkout */}
          <div style={{ display: "grid", gap: 14 }}>
            <div
              style={{
                background: "white",
                border: "1px solid #e5e7eb",
                borderRadius: 16,
                padding: 16,
              }}
            >
              <div style={{ fontWeight: 900, fontSize: 16 }}>Quick Pay</div>
              <p style={{ margin: "6px 0 0", color: "#64748b", fontSize: 13 }}>
                Pay with UPI / Cards / Netbanking
              </p>

              <div style={{ marginTop: 12, display: "grid", gap: 10 }}>
                <div style={{ display: "grid", gap: 8 }}>
                  <label style={{ fontSize: 12, color: "#475569" }}>Donor name</label>
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
                    style={{ padding: 12, borderRadius: 12, border: "1px solid #e5e7eb" }}
                  />
                </div>
                <div style={{ display: "grid", gap: 8 }}>
                  <label style={{ fontSize: 12, color: "#475569" }}>Email</label>
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@email.com"
                    style={{ padding: 12, borderRadius: 12, border: "1px solid #e5e7eb" }}
                  />
                </div>
                <div style={{ display: "grid", gap: 8 }}>
                  <label style={{ fontSize: 12, color: "#475569" }}>Phone (optional)</label>
                  <input
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="10-digit number"
                    style={{ padding: 12, borderRadius: 12, border: "1px solid #e5e7eb" }}
                  />
                </div>

                <div style={{ display: "grid", gap: 8 }}>
                  <label style={{ fontSize: 12, color: "#475569" }}>Amount</label>
                  <input
                    type="number"
                    min={minAmount}
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                    style={{ padding: 12, borderRadius: 12, border: "1px solid #e5e7eb" }}
                  />
                </div>

                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  {quickAmounts.map((a) => (
                    <button
                      key={a}
                      type="button"
                      onClick={() => setAmount(a)}
                      style={{
                        borderRadius: 999,
                        border: "1px solid #e5e7eb",
                        padding: "8px 10px",
                        background: "white",
                        cursor: "pointer",
                        fontWeight: 700,
                        fontSize: 12,
                      }}
                    >
                      {formatINR(a)}
                    </button>
                  ))}
                </div>

                <button
                  onClick={handlePay}
                  disabled={loading}
                  style={{
                    marginTop: 6,
                    border: "none",
                    borderRadius: 12,
                    padding: "12px 14px",
                    cursor: "pointer",
                    background: "#16a34a",
                    color: "white",
                    fontWeight: 900,
                  }}
                >
                  {loading ? "Processing..." : "Secure Payment Gateway"}
                </button>

                <div style={{ fontSize: 12, color: "#64748b", lineHeight: 1.5 }}>
                  By donating you agree that funds are used for the selected cause. Receipt provided after payment.
                </div>
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
              <div style={{ fontWeight: 900, fontSize: 16 }}>Bank Transfer</div>
              <p style={{ margin: "6px 0 0", color: "#64748b", fontSize: 13 }}>
                Prefer direct transfer? Use details below.
              </p>

              <div style={{ marginTop: 12, display: "grid", gap: 8, fontSize: 13 }}>
                <div><b>Account Name:</b> Sunni Brothers Trust</div>
                <div><b>Account Number:</b> XXXXXXXXXXXX</div>
                <div><b>IFSC:</b> XXXXXX0000</div>
                <div><b>Bank:</b> State Bank of India</div>
              </div>

              <div
                style={{
                  marginTop: 12,
                  background: "rgba(245,158,11,0.12)",
                  border: "1px solid rgba(245,158,11,0.25)",
                  padding: 12,
                  borderRadius: 12,
                  fontSize: 12,
                  color: "#7c2d12",
                  lineHeight: 1.5,
                }}
              >
                Note: For Zakat donations, ensure your intention is clear and select “Zakat-al-Mal” above before paying.
              </div>
            </div>
          </div>
        </div>

        <style>{`
          @media (min-width: 980px) {
            .donation-grid { grid-template-columns: 1.7fr 1fr; align-items: start; }
          }
        `}</style>
      </section>
    </main>
  );
}