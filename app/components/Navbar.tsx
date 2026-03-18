"use client";

import Link from "next/link";
import { useState } from "react";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/activities", label: "Activities" },
  { href: "/education", label: "Education" },
  { href: "/career", label: "Career" },
  { href: "/donation", label: "Donation" },
  { href: "/zakat", label: "Zakat Calculator" },
  { href: "/quran", label: "Quran" },
  { href: "/login", label: "Login" },
  { href: "/signup", label: "Signup" }
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        background: "#065f46",
        color: "white",
        borderBottom: "1px solid rgba(255,255,255,0.12)",
      }}
    >
      <nav
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          padding: "14px 16px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 12,
        }}
      >
        {/* Brand */}
        <Link
          href="/"
          style={{
            color: "white",
            textDecoration: "none",
            fontWeight: 800,
            letterSpacing: 0.5,
            fontSize: 18,
            display: "flex",
            alignItems: "center",
            gap: 10,
          }}
        >
          <span
            style={{
              width: 34,
              height: 34,
              borderRadius: 10,
              background: "rgba(255,255,255,0.14)",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 900,
            }}
          >
            SBA
          </span>
          Sunni Brothers Association
        </Link>

        {/* Desktop links */}
        <div className="nav-desktop" style={{ display: "none", alignItems: "center", gap: 6 }}>
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              style={{
                textDecoration: "none",
                color: "inherit",
                padding: "10px 12px",
                borderRadius: 8,
              }}
            >
              {l.label}
            </Link>
          ))}
        </div>

        {/* Hamburger */}
        <button
          aria-label="Open menu"
          onClick={() => setOpen((v) => !v)}
          className="nav-hamburger"
          style={{
            border: "1px solid rgba(255,255,255,0.25)",
            background: "rgba(255,255,255,0.12)",
            color: "white",
            borderRadius: 10,
            padding: "10px 12px",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
          }}
        >
          <span style={{ display: "grid", gap: 4 }}>
            <span style={{ width: 18, height: 2, background: "white", borderRadius: 2 }} />
            <span style={{ width: 18, height: 2, background: "white", borderRadius: 2 }} />
            <span style={{ width: 18, height: 2, background: "white", borderRadius: 2 }} />
          </span>
        </button>
      </nav>

      {/* Mobile dropdown */}
      {open && (
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 16px 14px" }}>
          <div
            style={{
              background: "rgba(255,255,255,0.10)",
              border: "1px solid rgba(255,255,255,0.16)",
              borderRadius: 14,
              padding: 10,
              display: "grid",
              gap: 6,
            }}
          >
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                style={{
                  textDecoration: "none",
                  color: "white",
                  padding: "12px 12px",
                  borderRadius: 10,
                  background: "rgba(0,0,0,0.06)",
                }}
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      )}

      <style>{`
        @media (min-width: 900px) {
          .nav-desktop { display: flex !important; }
          .nav-hamburger { display: none !important; }
        }
      `}</style>
    </header>
  );
}