const highlights = [
  {
    title: "Quran & Tajweed",
    desc: "Step-by-step Quran recitation and Tajweed classes with structured teacher feedback.",
  },
  {
    title: "Islamic Studies",
    desc: "Aqidah, Fiqh, Seerah, and Islamic manners taught with practical daily application.",
  },
  {
    title: "Hifz Support",
    desc: "Memorization pathways with revision plans, attendance tracking, and student mentoring.",
  },
  {
    title: "Family Guidance",
    desc: "Parent sessions, student counselling, and value-based support for healthier home environments.",
  },
];

const stats = [
  { label: "Students Served", value: "1,200+" },
  { label: "Qualified Teachers", value: "35+" },
  { label: "Years In Service", value: "12" },
  { label: "Families Supported", value: "800+" },
];

const schedule = [
  { slot: "Morning", detail: "Qaida, Quran recitation, and Hifz revision circles" },
  { slot: "Afternoon", detail: "Islamic studies modules and supervised homework support" },
  { slot: "Evening", detail: "Tajweed correction, youth sessions, and parent engagement" },
  { slot: "Weekend", detail: "Community workshops, counselling, and outreach activities" },
];

export default function Home() {
  return (
    <main style={{ background: "#f8fafc", minHeight: "100vh" }}>
      <section style={{ background: "white", borderBottom: "1px solid #e5e7eb" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "30px 16px" }}>
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
              Welcome To Sunni Brothers Association
            </div>
            <h1 style={{ margin: "12px 0 6px", fontSize: 34, fontWeight: 900 }}>
              Excellence In <span style={{ color: "#16a34a" }}>Islamic Education</span>
            </h1>
            <p style={{ margin: 0, color: "#475569", maxWidth: 840, marginInline: "auto", lineHeight: 1.6 }}>
              We are a madrasa platform committed to Quran learning, Islamic studies, and character development for
              students and families through a disciplined, compassionate, and community-centered approach.
            </p>
          </div>
        </div>
      </section>

      <section style={{ padding: "22px 16px 50px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gap: 16 }}>
          <div className="home-core-grid" style={{ display: "grid", gridTemplateColumns: "1fr", gap: 14 }}>
            <article style={cardStyle}>
              <h2 style={{ margin: 0, fontSize: 20 }}>Our Focus</h2>
              <p style={pStyle}>
                Build confident Muslims who read Quran correctly, understand core Islamic teachings, and practice adab
                in their daily lives.
              </p>
            </article>

            <article style={cardStyle}>
              <h2 style={{ margin: 0, fontSize: 20 }}>Our Approach</h2>
              <p style={pStyle}>
                A balanced system of ilm, tarbiyah, and mentorship with consistent progress review and parent
                involvement.
              </p>
            </article>
          </div>

          <div
            style={{
              background: "white",
              border: "1px solid #e5e7eb",
              borderRadius: 16,
              padding: 16,
            }}
          >
            <h2 style={{ margin: 0, fontSize: 20 }}>Core Programs</h2>
            <div style={{ marginTop: 12, display: "grid", gap: 12, gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))" }}>
              {highlights.map((item) => (
                <article key={item.title} style={{ border: "1px solid #e5e7eb", borderRadius: 12, padding: 12, background: "#fcfffd" }}>
                  <h3 style={{ margin: 0, fontSize: 16 }}>{item.title}</h3>
                  <p style={{ ...pStyle, marginTop: 8 }}>{item.desc}</p>
                </article>
              ))}
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
            <h2 style={{ margin: 0, fontSize: 20 }}>Daily Learning Rhythm</h2>
            <div style={{ marginTop: 12, display: "grid", gap: 10 }}>
              {schedule.map((item) => (
                <div key={item.slot} style={{ borderLeft: "4px solid #16a34a", paddingLeft: 10 }}>
                  <div style={{ fontWeight: 900, color: "#065f46" }}>{item.slot}</div>
                  <div style={{ color: "#475569", fontSize: 14, marginTop: 2 }}>{item.detail}</div>
                </div>
              ))}
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
            <h2 style={{ margin: 0, fontSize: 20 }}>Impact Snapshot</h2>
            <div style={{ marginTop: 12, display: "grid", gap: 10, gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))" }}>
              {stats.map((item) => (
                <div key={item.label} style={{ border: "1px solid #e5e7eb", borderRadius: 12, padding: 12 }}>
                  <div style={{ fontWeight: 900, color: "#065f46", fontSize: 24 }}>{item.value}</div>
                  <div style={{ marginTop: 4, color: "#475569", fontSize: 13 }}>{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <style>{`
          @media (min-width: 980px) {
            .home-core-grid { grid-template-columns: 1fr 1fr; }
          }
        `}</style>
      </section>
    </main>
  );
}

const cardStyle: { [key: string]: string | number } = {
  background: "white",
  border: "1px solid #e5e7eb",
  borderRadius: 16,
  padding: 16,
};

const pStyle: { [key: string]: string | number } = {
  margin: "8px 0 0",
  color: "#475569",
  lineHeight: 1.65,
  fontSize: 14,
};