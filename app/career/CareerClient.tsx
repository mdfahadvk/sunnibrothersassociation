"use client";

import { useMemo, useState } from "react";

type Job = {
  id: string;
  title: string;
  department: "Teaching" | "Operations" | "Community";
  type: "Full-time" | "Part-time" | "Weekend";
  location: string;
  experience: string;
  summary: string;
  requirements: string[];
};

const jobs: Job[] = [
  {
    id: "islamic-studies-teacher",
    title: "Islamic Studies Teacher",
    department: "Teaching",
    type: "Full-time",
    location: "On-site (Madrasa Campus)",
    experience: "2+ years",
    summary: "Teach Aqidah, Fiqh, Seerah, and Islamic manners to middle and senior batches.",
    requirements: [
      "Strong grounding in core Islamic subjects",
      "Good classroom management and communication",
      "Ability to mentor students with adab and discipline",
    ],
  },
  {
    id: "quran-tajweed-instructor",
    title: "Quran & Tajweed Instructor",
    department: "Teaching",
    type: "Part-time",
    location: "On-site / Hybrid",
    experience: "1+ years",
    summary: "Conduct Qaida, Nazra, and Tajweed classes for children and adult learners.",
    requirements: [
      "Accurate recitation with Tajweed",
      "Experience teaching different age groups",
      "Patient and encouraging teaching style",
    ],
  },
  {
    id: "hifz-mentor",
    title: "Hifz Mentor",
    department: "Teaching",
    type: "Full-time",
    location: "On-site",
    experience: "3+ years",
    summary: "Guide Hifz students with daily sabaq, revision plans, and progress tracking.",
    requirements: [
      "Hafiz qualification preferred",
      "Structured memorization and revision methods",
      "Ability to motivate students consistently",
    ],
  },
  {
    id: "student-counsellor",
    title: "Student Counsellor (Islamic Values)",
    department: "Community",
    type: "Weekend",
    location: "On-site",
    experience: "2+ years",
    summary: "Support student wellbeing and parent communication in line with Islamic values.",
    requirements: [
      "Counselling or mentoring background",
      "Good communication with parents",
      "Compassionate and confidential approach",
    ],
  },
  {
    id: "admissions-admin",
    title: "Admissions & Admin Coordinator",
    department: "Operations",
    type: "Full-time",
    location: "On-site",
    experience: "1+ years",
    summary: "Manage admissions, fee records, class schedules, and front-desk coordination.",
    requirements: [
      "Basic computer skills and record keeping",
      "Organized and detail-oriented",
      "Friendly behavior with parents and visitors",
    ],
  },
];

const benefits = [
  "Work in a purpose-driven Islamic education environment",
  "Teacher training and curriculum support",
  "Structured student progress system",
  "Respectful, value-based work culture",
  "Growth path into senior academic and leadership roles",
];

export default function CareerClient() {
  const [dept, setDept] = useState<"All" | Job["department"]>("All");
  const [type, setType] = useState<"All" | Job["type"]>("All");

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const deptMatch = dept === "All" || job.department === dept;
      const typeMatch = type === "All" || job.type === type;
      return deptMatch && typeMatch;
    });
  }, [dept, type]);

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
              Careers At Sunni Brothers Association
            </div>
            <h1 style={{ margin: "12px 0 6px", fontSize: 34, fontWeight: 900 }}>
              Build Your <span style={{ color: "#16a34a" }}>Akhirah-Focused Career</span>
            </h1>
            <p style={{ margin: 0, color: "#475569", maxWidth: 830, marginInline: "auto", lineHeight: 1.6 }}>
              Join our madrasa team to serve students through Quran, Islamic studies, and character development.
              We are hiring teachers, mentors, and operational staff who want to contribute with sincerity and excellence.
            </p>
          </div>
        </div>
      </section>

      <section style={{ padding: "22px 16px 50px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gap: 16 }}>
          <div
            style={{
              background: "white",
              border: "1px solid #e5e7eb",
              borderRadius: 16,
              padding: 16,
            }}
          >
            <h2 style={{ margin: 0, fontSize: 20 }}>Open Positions</h2>
            <p style={{ margin: "6px 0 0", color: "#64748b", fontSize: 13 }}>
              Filter by department and schedule type.
            </p>

            <div style={{ marginTop: 12, display: "flex", flexWrap: "wrap", gap: 8 }}>
              {(["All", "Teaching", "Operations", "Community"] as const).map((d) => (
                <button
                  key={d}
                  type="button"
                  onClick={() => setDept(d)}
                  style={{
                    borderRadius: 999,
                    border: dept === d ? "1px solid rgba(6,95,70,0.35)" : "1px solid #e5e7eb",
                    background: dept === d ? "rgba(6,95,70,0.10)" : "white",
                    color: "#0f172a",
                    fontWeight: 700,
                    fontSize: 12,
                    padding: "8px 10px",
                    cursor: "pointer",
                  }}
                >
                  {d}
                </button>
              ))}
            </div>

            <div style={{ marginTop: 8, display: "flex", flexWrap: "wrap", gap: 8 }}>
              {(["All", "Full-time", "Part-time", "Weekend"] as const).map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setType(t)}
                  style={{
                    borderRadius: 999,
                    border: type === t ? "1px solid rgba(6,95,70,0.35)" : "1px solid #e5e7eb",
                    background: type === t ? "rgba(6,95,70,0.10)" : "white",
                    color: "#0f172a",
                    fontWeight: 700,
                    fontSize: 12,
                    padding: "8px 10px",
                    cursor: "pointer",
                  }}
                >
                  {t}
                </button>
              ))}
            </div>

            <div style={{ marginTop: 14, display: "grid", gap: 12 }}>
              {filteredJobs.map((job) => (
                <article
                  key={job.id}
                  style={{
                    border: "1px solid #e5e7eb",
                    borderRadius: 14,
                    padding: 14,
                    background: "#fcfffd",
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 10 }}>
                    <h3 style={{ margin: 0, fontSize: 18 }}>{job.title}</h3>
                    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                      <span style={badgeStyle}>{job.department}</span>
                      <span style={badgeStyle}>{job.type}</span>
                    </div>
                  </div>

                  <p style={{ margin: "8px 0 0", color: "#334155", lineHeight: 1.6 }}>{job.summary}</p>

                  <div style={{ marginTop: 10, display: "grid", gap: 4, fontSize: 13, color: "#475569" }}>
                    <div><b>Location:</b> {job.location}</div>
                    <div><b>Experience:</b> {job.experience}</div>
                  </div>

                  <div style={{ marginTop: 10, fontSize: 13, color: "#334155" }}>
                    <b>Requirements:</b>
                    <ul style={{ margin: "6px 0 0", paddingInlineStart: 18 }}>
                      {job.requirements.map((item) => (
                        <li key={item} style={{ marginBottom: 4 }}>{item}</li>
                      ))}
                    </ul>
                  </div>

                  <a
                    href={`mailto:careers@sunnibrothers.org?subject=Application%20for%20${encodeURIComponent(job.title)}`}
                    style={{
                      marginTop: 10,
                      display: "inline-block",
                      textDecoration: "none",
                      background: "#065f46",
                      color: "white",
                      padding: "9px 12px",
                      borderRadius: 10,
                      fontWeight: 800,
                      fontSize: 13,
                    }}
                  >
                    Apply For This Role
                  </a>
                </article>
              ))}

              {!filteredJobs.length ? (
                <div
                  style={{
                    border: "1px dashed #cbd5e1",
                    borderRadius: 12,
                    padding: 12,
                    color: "#64748b",
                    fontSize: 13,
                  }}
                >
                  No openings match your selected filters.
                </div>
              ) : null}
            </div>
          </div>

          <div className="career-grid" style={{ display: "grid", gridTemplateColumns: "1fr", gap: 14 }}>
            <div style={panelStyle}>
              <h3 style={{ margin: 0, fontSize: 16 }}>Why Join Us</h3>
              <div style={{ marginTop: 10, display: "grid", gap: 8, fontSize: 13, color: "#334155" }}>
                {benefits.map((benefit) => (
                  <div key={benefit}>- {benefit}</div>
                ))}
              </div>
            </div>

            <div style={panelStyle}>
              <h3 style={{ margin: 0, fontSize: 16 }}>Hiring Process</h3>
              <div style={{ marginTop: 10, display: "grid", gap: 8, fontSize: 13, color: "#334155" }}>
                <div><b>1.</b> CV submission by email</div>
                <div><b>2.</b> Screening call and role discussion</div>
                <div><b>3.</b> Demo class / practical assessment</div>
                <div><b>4.</b> Final interview and onboarding</div>
              </div>
            </div>

            <div style={panelStyle}>
              <h3 style={{ margin: 0, fontSize: 16 }}>How To Apply</h3>
              <p style={{ margin: "8px 0 0", fontSize: 13, color: "#475569", lineHeight: 1.6 }}>
                Email your CV and a short cover note with subject line: <b>Application - Role Name</b>.
                Mention your teaching background, Islamic education credentials, and preferred schedule.
              </p>
              <a
                href="mailto:careers@sunnibrothers.org?subject=Application%20-%20Sunni%20Brothers%20Association"
                style={{
                  display: "inline-block",
                  marginTop: 10,
                  textDecoration: "none",
                  background: "#16a34a",
                  color: "white",
                  padding: "9px 12px",
                  borderRadius: 10,
                  fontWeight: 800,
                  fontSize: 13,
                }}
              >
                Email Careers Team
              </a>
            </div>
          </div>
        </div>

        <style>{`
          @media (min-width: 980px) {
            .career-grid { grid-template-columns: repeat(3, 1fr); }
          }
        `}</style>
      </section>
    </main>
  );
}

const panelStyle: React.CSSProperties = {
  background: "white",
  border: "1px solid #e5e7eb",
  borderRadius: 16,
  padding: 14,
};

const badgeStyle: React.CSSProperties = {
  display: "inline-block",
  fontSize: 12,
  fontWeight: 700,
  color: "#065f46",
  background: "rgba(6,95,70,0.10)",
  borderRadius: 999,
  padding: "5px 8px",
};
