"use client";

import { useMemo, useState } from "react";

type Activity = {
  id: string;
  title: string;
  category: "Education" | "Welfare" | "Community" | "Youth";
  schedule: string;
  audience: string;
  description: string;
};

const activities: Activity[] = [
  {
    id: "daily-quran-classes",
    title: "Daily Quran & Tajweed Classes",
    category: "Education",
    schedule: "Mon-Sat",
    audience: "Children & Youth",
    description: "Structured recitation, Tajweed correction, and memorization planning with teacher feedback.",
  },
  {
    id: "islamic-studies-batch",
    title: "Islamic Studies Batch",
    category: "Education",
    schedule: "Weekdays + Weekend Revision",
    audience: "Teens & Adults",
    description: "Aqidah, Fiqh, Seerah, and essential Islamic life skills in a practical curriculum format.",
  },
  {
    id: "hifz-circle",
    title: "Hifz Support Circle",
    category: "Education",
    schedule: "Daily Morning Session",
    audience: "Hifz Students",
    description: "Focused sabaq and revision circles with monitoring to improve retention and consistency.",
  },
  {
    id: "family-counselling",
    title: "Family Guidance & Counselling",
    category: "Community",
    schedule: "Every Sunday",
    audience: "Parents & Guardians",
    description: "Workshops on parenting, Islamic tarbiyah, and student behavior support at home.",
  },
  {
    id: "monthly-food-drive",
    title: "Monthly Food & Essentials Drive",
    category: "Welfare",
    schedule: "1st Week Of Month",
    audience: "Needy Families",
    description: "Distribution of ration kits, clothing support, and emergency aid through verified cases.",
  },
  {
    id: "youth-leadership",
    title: "Youth Leadership Program",
    category: "Youth",
    schedule: "Saturday Evening",
    audience: "Ages 14-22",
    description: "Public speaking, Islamic identity confidence, and service projects led by youth mentors.",
  },
  {
    id: "ramadan-specials",
    title: "Ramadan Intensive Activities",
    category: "Community",
    schedule: "Ramadan",
    audience: "All Community",
    description: "Taraweeh support, daily reminders, iftar arrangements, and zakat/fitrah facilitation.",
  },
];

const annualPlan = [
  { month: "Muharram", focus: "New Batch Orientation & Seerah Sessions" },
  { month: "Rabi al-Awwal", focus: "Seerah Competitions & Family Programs" },
  { month: "Sha'ban", focus: "Ramadan Preparation Workshops" },
  { month: "Ramadan", focus: "Quran Intensive, Iftar Support, Zakat Drives" },
  { month: "Dhul Hijjah", focus: "Hajj Awareness & Qurbani Support" },
];

export default function ActivitiesClient() {
  const [filter, setFilter] = useState<"All" | Activity["category"]>("All");

  const filtered = useMemo(() => {
    if (filter === "All") return activities;
    return activities.filter((a) => a.category === filter);
  }, [filter]);

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
              Madrasa Programs & Activities
            </div>
            <h1 style={{ margin: "12px 0 6px", fontSize: 34, fontWeight: 900 }}>
              Learning, Service, and <span style={{ color: "#16a34a" }}>Community Growth</span>
            </h1>
            <p style={{ margin: 0, color: "#475569", maxWidth: 840, marginInline: "auto", lineHeight: 1.6 }}>
              Our activities are designed to build Quran connection, Islamic understanding, leadership, and social
              responsibility across all age groups.
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
            <h2 style={{ margin: 0, fontSize: 20 }}>Explore Activities</h2>
            <p style={{ margin: "6px 0 0", color: "#64748b", fontSize: 13 }}>
              Filter by category to explore our ongoing programs.
            </p>

            <div style={{ marginTop: 12, display: "flex", flexWrap: "wrap", gap: 8 }}>
              {(["All", "Education", "Welfare", "Community", "Youth"] as const).map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setFilter(c)}
                  style={{
                    borderRadius: 999,
                    border: filter === c ? "1px solid rgba(6,95,70,0.35)" : "1px solid #e5e7eb",
                    background: filter === c ? "rgba(6,95,70,0.10)" : "white",
                    color: "#0f172a",
                    fontWeight: 700,
                    fontSize: 12,
                    padding: "8px 10px",
                    cursor: "pointer",
                  }}
                >
                  {c}
                </button>
              ))}
            </div>

            <div style={{ marginTop: 14, display: "grid", gap: 12, gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))" }}>
              {filtered.map((activity) => (
                <article
                  key={activity.id}
                  style={{
                    border: "1px solid #e5e7eb",
                    borderRadius: 14,
                    padding: 14,
                    background: "#fcfffd",
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", gap: 8, flexWrap: "wrap" }}>
                    <h3 style={{ margin: 0, fontSize: 16 }}>{activity.title}</h3>
                    <span style={badgeStyle}>{activity.category}</span>
                  </div>

                  <p style={{ margin: "8px 0 0", color: "#334155", lineHeight: 1.6, fontSize: 14 }}>{activity.description}</p>

                  <div style={{ marginTop: 10, display: "grid", gap: 4, color: "#475569", fontSize: 13 }}>
                    <div><b>Schedule:</b> {activity.schedule}</div>
                    <div><b>Audience:</b> {activity.audience}</div>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div className="activities-grid" style={{ display: "grid", gap: 14, gridTemplateColumns: "1fr" }}>
            <div style={panelStyle}>
              <h3 style={{ margin: 0, fontSize: 16 }}>Annual Activity Highlights</h3>
              <div style={{ marginTop: 10, display: "grid", gap: 8, fontSize: 13, color: "#334155" }}>
                {annualPlan.map((item) => (
                  <div key={item.month} style={{ borderLeft: "4px solid #16a34a", paddingLeft: 8 }}>
                    <b>{item.month}:</b> {item.focus}
                  </div>
                ))}
              </div>
            </div>

            <div style={panelStyle}>
              <h3 style={{ margin: 0, fontSize: 16 }}>Get Involved</h3>
              <p style={{ margin: "8px 0 0", color: "#475569", fontSize: 13, lineHeight: 1.6 }}>
                We welcome teachers, volunteers, and community supporters. Help us strengthen Islamic education
                and welfare outreach through your time, skill, and resources.
              </p>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 10 }}>
                <a href="/career" style={buttonPrimary}>Become A Teacher</a>
                <a href="/donation" style={buttonSecondary}>Support Activities</a>
              </div>
            </div>
          </div>
        </div>

        <style>{`
          @media (min-width: 980px) {
            .activities-grid { grid-template-columns: 1fr 1fr; }
          }
        `}</style>
      </section>
    </main>
  );
}

const panelStyle: { [key: string]: string | number } = {
  background: "white",
  border: "1px solid #e5e7eb",
  borderRadius: 16,
  padding: 14,
};

const badgeStyle: { [key: string]: string | number } = {
  display: "inline-block",
  fontSize: 12,
  fontWeight: 700,
  color: "#065f46",
  background: "rgba(6,95,70,0.10)",
  borderRadius: 999,
  padding: "5px 8px",
};

const buttonPrimary: { [key: string]: string | number } = {
  textDecoration: "none",
  background: "#065f46",
  color: "white",
  borderRadius: 10,
  padding: "9px 12px",
  fontWeight: 800,
  fontSize: 13,
};

const buttonSecondary: { [key: string]: string | number } = {
  textDecoration: "none",
  background: "rgba(6,95,70,0.10)",
  color: "#065f46",
  border: "1px solid rgba(6,95,70,0.25)",
  borderRadius: 10,
  padding: "9px 12px",
  fontWeight: 800,
  fontSize: 13,
};
