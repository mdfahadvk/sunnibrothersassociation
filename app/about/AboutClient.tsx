import Link from "next/link";

const stats = [
  { label: "Students Served", value: "1,200+" },
  { label: "Qualified Teachers", value: "35+" },
  { label: "Years In Service", value: "12" },
  { label: "Families Supported", value: "800+" },
];

const values = [
  {
    title: "Ilm With Adab",
    desc: "We combine authentic Islamic learning with character, discipline, and respect for parents and teachers.",
  },
  {
    title: "Inclusive Learning",
    desc: "Programs for children, youth, and adults with clear pathways from Qaida to Tajweed, Hifz, and Islamic studies.",
  },
  {
    title: "Community Impact",
    desc: "Beyond classrooms, we support welfare, counselling, and practical guidance for families.",
  },
];

const timeline = [
  { year: "2014", event: "Started weekend Quran classes with a small batch of students." },
  { year: "2017", event: "Expanded into full Islamic studies and Tajweed programs." },
  { year: "2020", event: "Launched online classes and digital attendance/progress tracking." },
  { year: "2023", event: "Introduced zakat and donation systems for transparent social support." },
  { year: "2026", event: "Scaling madrasa operations with structured departments and teacher development." },
];

export default function AboutClient() {
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
              About Sunni Brothers Association
            </div>
            <h1 style={{ margin: "12px 0 6px", fontSize: 34, fontWeight: 900 }}>
              Nurturing <span style={{ color: "#16a34a" }}>Islamic Knowledge</span> & Character
            </h1>
            <p style={{ margin: 0, color: "#475569", maxWidth: 840, marginInline: "auto", lineHeight: 1.6 }}>
              We are a madrasa and community platform dedicated to Quran education, Islamic studies, and
              value-based upbringing. Our goal is to build confident Muslims grounded in faith, adab, and service.
            </p>
          </div>
        </div>
      </section>

      <section style={{ padding: "22px 16px 50px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gap: 16 }}>
          <div className="about-grid" style={{ display: "grid", gridTemplateColumns: "1fr", gap: 14 }}>
            <article style={cardStyle}>
              <h2 style={{ margin: 0, fontSize: 20 }}>Our Mission</h2>
              <p style={pStyle}>
                To provide accessible and authentic Islamic tuition that builds Quran literacy, understanding of deen,
                and strong moral character in every student.
              </p>
            </article>

            <article style={cardStyle}>
              <h2 style={{ margin: 0, fontSize: 20 }}>Our Vision</h2>
              <p style={pStyle}>
                To become a trusted center of Islamic education where students and families grow together with
                knowledge, worship, and responsibility toward society.
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
            <h2 style={{ margin: 0, fontSize: 20 }}>Our Values</h2>
            <div style={{ marginTop: 12, display: "grid", gap: 12, gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))" }}>
              {values.map((v) => (
                <article key={v.title} style={{ border: "1px solid #e5e7eb", borderRadius: 12, padding: 12, background: "#fcfffd" }}>
                  <h3 style={{ margin: 0, fontSize: 16 }}>{v.title}</h3>
                  <p style={{ ...pStyle, marginTop: 8 }}>{v.desc}</p>
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

          <div
            style={{
              background: "white",
              border: "1px solid #e5e7eb",
              borderRadius: 16,
              padding: 16,
            }}
          >
            <h2 style={{ margin: 0, fontSize: 20 }}>Our Journey</h2>
            <div style={{ marginTop: 12, display: "grid", gap: 10 }}>
              {timeline.map((step) => (
                <div key={step.year} style={{ borderLeft: "4px solid #16a34a", paddingLeft: 10 }}>
                  <div style={{ fontWeight: 900, color: "#065f46" }}>{step.year}</div>
                  <div style={{ color: "#475569", fontSize: 14, marginTop: 2 }}>{step.event}</div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ ...cardStyle, textAlign: "center" }}>
            <h2 style={{ margin: 0, fontSize: 20 }}>Partner With Us</h2>
            <p style={{ ...pStyle, maxWidth: 760, marginInline: "auto" }}>
              Support our mission through teaching, volunteering, or donations. Together we can strengthen Islamic
              education for the next generation.
            </p>
            <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap", marginTop: 12 }}>
              <Link href="/career" style={buttonPrimary}>Join Our Team</Link>
              <Link href="/donation" style={buttonSecondary}>Support The Madrasa</Link>
            </div>
          </div>
        </div>

        <style>{`
          @media (min-width: 980px) {
            .about-grid { grid-template-columns: 1fr 1fr; }
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

const buttonPrimary: { [key: string]: string | number } = {
  textDecoration: "none",
  background: "#065f46",
  color: "white",
  borderRadius: 10,
  padding: "10px 14px",
  fontWeight: 800,
};

const buttonSecondary: { [key: string]: string | number } = {
  textDecoration: "none",
  background: "rgba(6,95,70,0.10)",
  color: "#065f46",
  border: "1px solid rgba(6,95,70,0.25)",
  borderRadius: 10,
  padding: "10px 14px",
  fontWeight: 800,
};
