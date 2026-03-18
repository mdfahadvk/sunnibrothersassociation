import Link from "next/link";

function Card({ title, desc }: { title: string; desc: string }) {
  return (
    <div
      style={{
        background: "white",
        border: "1px solid #e5e7eb",
        borderRadius: 16,
        padding: 18,
        boxShadow: "0 1px 0 rgba(0,0,0,0.03)",
      }}
    >
      <h3 style={{ margin: 0, fontSize: 18 }}>{title}</h3>
      <p style={{ margin: "10px 0 0", color: "#4b5563", lineHeight: 1.5 }}>{desc}</p>
    </div>
  );
}

export default function Home() {
  return (
    <main style={{ background: "#f8fafc", minHeight: "calc(100vh - 70px)" }}>
      {/* HERO */}
      <section
        style={{
          background:
            "linear-gradient(135deg, rgba(6,95,70,1) 0%, rgba(13,148,136,1) 55%, rgba(16,185,129,1) 100%)",
          color: "white",
        }}
      >
        <div
          style={{
            maxWidth: 1100,
            margin: "0 auto",
            padding: "56px 16px",
            display: "grid",
            gap: 24,
            alignItems: "center",
            gridTemplateColumns: "1fr",
          }}
        >
          <div>
            <h1
              style={{
                margin: 0,
                fontSize: 38,
                lineHeight: 1.1,
                letterSpacing: -0.5,
              }}
            >
              Sunni Brothers Association
            </h1>
            <p style={{ marginTop: 14, maxWidth: 650, fontSize: 16, opacity: 0.95, lineHeight: 1.6 }}>
              A complete Islamic madrasa platform with education, online classes, zakat calculator, and secure donations.
            </p>

            <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 18 }}>
              <Link href="/donation" style={{ textDecoration: "none" }}>
                <button
                  style={{
                    border: "none",
                    borderRadius: 12,
                    padding: "12px 16px",
                    fontWeight: 700,
                    cursor: "pointer",
                    background: "white",
                    color: "#065f46",
                  }}
                >
                  Donate Now
                </button>
              </Link>

              <Link href="/education" style={{ textDecoration: "none" }}>
                <button
                  style={{
                    borderRadius: 12,
                    padding: "12px 16px",
                    fontWeight: 700,
                    cursor: "pointer",
                    background: "rgba(255,255,255,0.14)",
                    border: "1px solid rgba(255,255,255,0.28)",
                    color: "white",
                  }}
                >
                  Explore Programs
                </button>
              </Link>
            </div>

            <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 18, opacity: 0.95 }}>
              <span style={{ padding: "6px 10px", borderRadius: 999, background: "rgba(255,255,255,0.14)" }}>
                ✅ Login / Student Portal
              </span>
              <span style={{ padding: "6px 10px", borderRadius: 999, background: "rgba(255,255,255,0.14)" }}>
                ✅ Video Classes
              </span>
              <span style={{ padding: "6px 10px", borderRadius: 999, background: "rgba(255,255,255,0.14)" }}>
                ✅ Zakat Calculator
              </span>
            </div>
          </div>
        </div>

        {/* Responsive columns for hero if you later add an image */}
        <style>{`
          @media (min-width: 900px) {
            .hero-grid { grid-template-columns: 1.2fr 0.8fr; }
          }
        `}</style>
      </section>

      {/* CONTENT */}
      <section style={{ padding: "44px 16px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <h2 style={{ margin: 0, fontSize: 26 }}>What we offer</h2>
          <p style={{ marginTop: 10, color: "#475569", maxWidth: 800, lineHeight: 1.6 }}>
            Build your madrasa experience with courses, live sessions, donations, and zakat tools — all in one place.
          </p>

          <div
            style={{
              marginTop: 18,
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: 14,
            }}
          >
            <Card title="Islamic Education" desc="Structured programs for kids and adults with clear progress tracking." />
            <Card title="Online Video Classes" desc="Stream recorded lessons and (later) run live classes securely." />
            <Card title="Zakat Calculator" desc="Calculate zakat based on nisab, assets, and debts with saved history." />
            <Card title="Donations & Receipts" desc="Support the madrasa with Razorpay/Stripe and auto receipts." />
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ borderTop: "1px solid #e5e7eb", background: "white" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "18px 16px", color: "#475569" }}>
          © {new Date().getFullYear()} Sunni Brothers Association — All rights reserved.
        </div>
      </footer>
    </main>
  );
}