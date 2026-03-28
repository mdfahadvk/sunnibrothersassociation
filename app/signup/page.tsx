"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignupPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    setLoading(false);

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data?.error ?? "Signup failed");
      return;
    }

    router.push("/login");
  }

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
              Join The Community
            </div>
            <h1 style={{ margin: "12px 0 6px", fontSize: 34, fontWeight: 900 }}>
              Create Your <span style={{ color: "#16a34a" }}>Account</span>
            </h1>
            <p style={{ margin: 0, color: "#475569", maxWidth: 720, marginInline: "auto", lineHeight: 1.6 }}>
              Register once to access courses, track your learning journey, and stay connected with madrasa activities.
            </p>
          </div>
        </div>
      </section>

      <section style={{ padding: "22px 16px 50px" }}>
        <div style={{ maxWidth: 500, margin: "0 auto" }}>
          <article
            style={{
              background: "white",
              border: "1px solid #e5e7eb",
              borderRadius: 16,
              padding: 18,
            }}
          >
            <form onSubmit={handleSubmit} style={{ display: "grid", gap: 12 }}>
              <input
                placeholder="Name (optional)"
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={inputStyle}
              />

              <input
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={inputStyle}
              />

              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={inputStyle}
              />

              <button type="submit" disabled={loading} style={buttonPrimary}>
                {loading ? "Creating..." : "Sign up"}
              </button>
            </form>

            {error && <p style={{ marginTop: 12, color: "#dc2626", fontSize: 14 }}>{error}</p>}

            <p style={{ margin: "14px 0 0", color: "#475569", fontSize: 14 }}>
              Already have an account?{" "}
              <Link href="/login" style={{ color: "#065f46", fontWeight: 700, textDecoration: "none" }}>
                Log in
              </Link>
            </p>
          </article>
        </div>
      </section>
    </main>
  );
}

const inputStyle: { [key: string]: string | number } = {
  padding: 12,
  borderRadius: 10,
  border: "1px solid #d1d5db",
  background: "#ffffff",
};

const buttonPrimary: { [key: string]: string | number } = {
  padding: 12,
  borderRadius: 10,
  border: "none",
  cursor: "pointer",
  background: "#065f46",
  color: "white",
  fontWeight: 800,
};