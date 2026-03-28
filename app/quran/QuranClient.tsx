"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type SurahMeta = {
  number: number;
  name: string;
  englishName: string;
  englishNameTranslation: string;
  revelationType: string;
  numberOfAyahs: number;
};

type AyahRow = {
  numberInSurah: number;
  arabic: string;
  translation: string;
};

type EditionAyah = {
  numberInSurah: number;
  text: string;
};

type EditionData = {
  edition?: {
    language?: string;
  };
  ayahs?: EditionAyah[];
};

type SurahListResponse = {
  data?: SurahMeta[];
};

type AyahEditionsResponse = {
  data?: EditionData[];
};

const fallbackSurahList: SurahMeta[] = [
  {
    number: 1,
    name: "الفاتحة",
    englishName: "Al-Fatihah",
    englishNameTranslation: "The Opening",
    revelationType: "Meccan",
    numberOfAyahs: 7,
  },
  {
    number: 2,
    name: "البقرة",
    englishName: "Al-Baqarah",
    englishNameTranslation: "The Cow",
    revelationType: "Medinan",
    numberOfAyahs: 286,
  },
  {
    number: 3,
    name: "آل عمران",
    englishName: "Ali 'Imran",
    englishNameTranslation: "Family of Imran",
    revelationType: "Medinan",
    numberOfAyahs: 200,
  },
  {
    number: 36,
    name: "يس",
    englishName: "Ya-Sin",
    englishNameTranslation: "Ya Sin",
    revelationType: "Meccan",
    numberOfAyahs: 83,
  },
  {
    number: 55,
    name: "الرحمن",
    englishName: "Ar-Rahman",
    englishNameTranslation: "The Most Compassionate",
    revelationType: "Medinan",
    numberOfAyahs: 78,
  },
  {
    number: 67,
    name: "الملك",
    englishName: "Al-Mulk",
    englishNameTranslation: "The Sovereignty",
    revelationType: "Meccan",
    numberOfAyahs: 30,
  },
  {
    number: 112,
    name: "الإخلاص",
    englishName: "Al-Ikhlas",
    englishNameTranslation: "Sincerity",
    revelationType: "Meccan",
    numberOfAyahs: 4,
  },
  {
    number: 113,
    name: "الفلق",
    englishName: "Al-Falaq",
    englishNameTranslation: "The Daybreak",
    revelationType: "Meccan",
    numberOfAyahs: 5,
  },
  {
    number: 114,
    name: "الناس",
    englishName: "An-Nas",
    englishNameTranslation: "Mankind",
    revelationType: "Meccan",
    numberOfAyahs: 6,
  },
];

function formatSurahBadge(surah: SurahMeta) {
  return `${surah.number}. ${surah.englishName}`;
}

export default function QuranClient() {
  const [surahs, setSurahs] = useState<SurahMeta[]>(fallbackSurahList);
  const [selectedSurah, setSelectedSurah] = useState<number>(1);
  const [query, setQuery] = useState("");
  const [mobileView, setMobileView] = useState<"reader" | "list">("reader");
  const readerRef = useRef<HTMLElement | null>(null);

  const [ayahs, setAyahs] = useState<AyahRow[]>([]);
  const [listLoading, setListLoading] = useState(true);
  const [ayahLoading, setAyahLoading] = useState(true);
  const [listError, setListError] = useState("");
  const [ayahError, setAyahError] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function loadSurahs() {
      setListLoading(true);
      setListError("");

      try {
        const res = await fetch("https://api.alquran.cloud/v1/surah", { cache: "no-store" });
        if (!res.ok) throw new Error("Failed to fetch surah list");

        const json: SurahListResponse = await res.json();
        const items = Array.isArray(json?.data) ? json.data : [];

        if (!items.length) throw new Error("Surah list is empty");
        if (!cancelled) setSurahs(items);
      } catch {
        if (!cancelled) {
          setListError("Unable to load full Quran index right now. Showing a useful fallback list.");
        }
      } finally {
        if (!cancelled) setListLoading(false);
      }
    }

    loadSurahs();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    let cancelled = false;

    async function loadAyahs() {
      setAyahLoading(true);
      setAyahError("");

      try {
        const url = `https://api.alquran.cloud/v1/surah/${selectedSurah}/editions/quran-uthmani,en.asad`;
        const res = await fetch(url, { cache: "no-store" });
        if (!res.ok) throw new Error("Failed to fetch ayahs");

        const json: AyahEditionsResponse = await res.json();
        const payload = Array.isArray(json?.data) ? json.data : [];
        const arabicEdition = payload.find((p) => p?.edition?.language === "ar");
        const englishEdition = payload.find((p) => p?.edition?.language === "en");

        const arabicAyahs = Array.isArray(arabicEdition?.ayahs) ? arabicEdition.ayahs : [];
        const englishAyahs = Array.isArray(englishEdition?.ayahs) ? englishEdition.ayahs : [];

        const englishMap = new Map<number, string>();
        for (const a of englishAyahs) {
          englishMap.set(a.numberInSurah, a.text);
        }

        const merged: AyahRow[] = arabicAyahs.map((a) => ({
          numberInSurah: a.numberInSurah,
          arabic: a.text,
          translation: englishMap.get(a.numberInSurah) ?? "",
        }));

        if (!merged.length) throw new Error("No ayahs returned");
        if (!cancelled) setAyahs(merged);
      } catch {
        if (!cancelled) {
          setAyahs([]);
          setAyahError("Unable to load ayahs at the moment. Please try another Surah or refresh.");
        }
      } finally {
        if (!cancelled) setAyahLoading(false);
      }
    }

    loadAyahs();
    return () => {
      cancelled = true;
    };
  }, [selectedSurah]);

  const filteredSurahs = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return surahs;

    return surahs.filter((s) => {
      return (
        s.englishName.toLowerCase().includes(q) ||
        s.englishNameTranslation.toLowerCase().includes(q) ||
        s.name.includes(query) ||
        s.number.toString() === q
      );
    });
  }, [query, surahs]);

  const activeSurah = useMemo(() => {
    return surahs.find((s) => s.number === selectedSurah) ?? fallbackSurahList[0];
  }, [surahs, selectedSurah]);

  function openSurah(surahNumber: number) {
    setSelectedSurah(surahNumber);
    setMobileView("reader");
    setTimeout(() => {
      readerRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 80);
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
              Al-Quran Explorer
            </div>

            <h1 style={{ margin: "12px 0 6px", fontSize: 34, fontWeight: 900 }}>
              Read the <span style={{ color: "#16a34a" }}>Holy Quran</span>
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
              Browse Surahs, read Arabic verses, and view English translation in one clean reading space.
            </p>
          </div>
        </div>
      </section>

      <section style={{ padding: "22px 16px 50px" }}>
        <div
          className="quran-grid"
          style={{
            maxWidth: 1100,
            margin: "0 auto",
            display: "grid",
            gap: 16,
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            alignItems: "start",
          }}
        >
          <div className="quran-mobile-switch" style={{ display: "none", gap: 8 }}>
            <button
              type="button"
              onClick={() => setMobileView("list")}
              style={{
                borderRadius: 10,
                border: mobileView === "list" ? "1px solid rgba(6,95,70,0.4)" : "1px solid #cbd5e1",
                background: mobileView === "list" ? "rgba(6,95,70,0.10)" : "white",
                color: "#0f172a",
                fontWeight: 700,
                padding: "10px 12px",
                cursor: "pointer",
              }}
            >
              Surah List
            </button>
            <button
              type="button"
              onClick={() => setMobileView("reader")}
              style={{
                borderRadius: 10,
                border: mobileView === "reader" ? "1px solid rgba(6,95,70,0.4)" : "1px solid #cbd5e1",
                background: mobileView === "reader" ? "rgba(6,95,70,0.10)" : "white",
                color: "#0f172a",
                fontWeight: 700,
                padding: "10px 12px",
                cursor: "pointer",
              }}
            >
              Read Surah
            </button>
          </div>

          <aside
            className={mobileView === "reader" ? "quran-list-hide-mobile" : ""}
            style={{
              background: "white",
              border: "1px solid #e5e7eb",
              borderRadius: 16,
              padding: 14,
              maxHeight: "75vh",
              overflow: "auto",
            }}
          >
            <h2 style={{ margin: 0, fontSize: 18 }}>Surah List</h2>
            <p style={{ margin: "6px 0 0", color: "#64748b", fontSize: 13 }}>
              Search by number, English name, or Arabic title.
            </p>

            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search Surah (e.g. Yaseen or 36)"
              style={{
                marginTop: 12,
                width: "100%",
                padding: 11,
                borderRadius: 12,
                border: "1px solid #e5e7eb",
                background: "#fff",
              }}
            />

            {listError ? (
              <div
                style={{
                  marginTop: 10,
                  background: "rgba(245,158,11,0.12)",
                  border: "1px solid rgba(245,158,11,0.25)",
                  padding: 10,
                  borderRadius: 10,
                  color: "#7c2d12",
                  fontSize: 12,
                  lineHeight: 1.45,
                }}
              >
                {listError}
              </div>
            ) : null}

            <div style={{ marginTop: 12, display: "grid", gap: 8 }}>
              {listLoading && surahs.length === 0 ? (
                <div style={{ color: "#64748b", fontSize: 13 }}>Loading Surahs...</div>
              ) : null}

              {filteredSurahs.map((surah) => {
                const active = selectedSurah === surah.number;
                return (
                  <button
                    key={surah.number}
                    onClick={() => openSurah(surah.number)}
                    style={{
                      textAlign: "left",
                      borderRadius: 12,
                      border: active ? "1px solid rgba(6,95,70,0.35)" : "1px solid #e5e7eb",
                      background: active ? "rgba(6,95,70,0.07)" : "white",
                      cursor: "pointer",
                      padding: "10px 12px",
                    }}
                  >
                    <div style={{ fontWeight: 800, fontSize: 13 }}>{formatSurahBadge(surah)}</div>
                    <div style={{ marginTop: 4, color: "#334155", fontSize: 14 }}>{surah.name}</div>
                    <div style={{ marginTop: 4, color: "#64748b", fontSize: 12 }}>
                      {surah.englishNameTranslation} • {surah.numberOfAyahs} ayahs • {surah.revelationType}
                    </div>
                  </button>
                );
              })}

              {!filteredSurahs.length ? (
                <div
                  style={{
                    border: "1px dashed #cbd5e1",
                    borderRadius: 12,
                    padding: 12,
                    color: "#64748b",
                    fontSize: 13,
                  }}
                >
                  No Surah matched your search.
                </div>
              ) : null}
            </div>
          </aside>

          <section
            ref={readerRef}
            className={mobileView === "list" ? "quran-reader-hide-mobile" : ""}
            style={{
              background: "white",
              border: "1px solid #e5e7eb",
              borderRadius: 16,
              padding: 16,
              minHeight: 300,
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: 12,
                flexWrap: "wrap",
              }}
            >
              <div>
                <h2 style={{ margin: 0, fontSize: 22 }}>{activeSurah.englishName}</h2>
                <div style={{ marginTop: 4, color: "#64748b", fontSize: 13 }}>
                  {activeSurah.name} • {activeSurah.englishNameTranslation}
                </div>
              </div>

              <span
                style={{
                  borderRadius: 999,
                  padding: "7px 10px",
                  background: "rgba(6,95,70,0.08)",
                  color: "#065f46",
                  fontWeight: 800,
                  fontSize: 12,
                }}
              >
                {activeSurah.numberOfAyahs} Ayahs
              </span>
            </div>

            {ayahError ? (
              <div
                style={{
                  marginTop: 14,
                  background: "rgba(239,68,68,0.10)",
                  border: "1px solid rgba(239,68,68,0.22)",
                  padding: 12,
                  borderRadius: 12,
                  color: "#991b1b",
                  fontSize: 13,
                }}
              >
                {ayahError}
              </div>
            ) : null}

            {ayahLoading ? (
              <div style={{ marginTop: 14, color: "#64748b", fontSize: 13 }}>Loading ayahs...</div>
            ) : (
              <div style={{ marginTop: 14, display: "grid", gap: 12 }}>
                {ayahs.map((a) => (
                  <article
                    key={a.numberInSurah}
                    style={{
                      border: "1px solid #e5e7eb",
                      borderRadius: 14,
                      padding: 14,
                      background: "#fcfffd",
                    }}
                  >
                    <div
                      style={{
                        display: "inline-block",
                        borderRadius: 999,
                        background: "rgba(6,95,70,0.08)",
                        color: "#065f46",
                        padding: "4px 8px",
                        fontSize: 12,
                        fontWeight: 800,
                      }}
                    >
                      Ayah {a.numberInSurah}
                    </div>

                    <p
                      dir="rtl"
                      style={{
                        margin: "12px 0 0",
                        fontSize: 30,
                        lineHeight: 1.9,
                        textAlign: "right",
                        color: "#0f172a",
                      }}
                    >
                      {a.arabic}
                    </p>

                    <p style={{ margin: "10px 0 0", color: "#334155", lineHeight: 1.7, fontSize: 15 }}>
                      {a.translation || "Translation unavailable for this ayah."}
                    </p>
                  </article>
                ))}
              </div>
            )}
          </section>
        </div>

        <style>{`
          @media (max-width: 979px) {
            .quran-mobile-switch { display: flex !important; }
            .quran-list-hide-mobile { display: none !important; }
            .quran-reader-hide-mobile { display: none !important; }
          }
        `}</style>
      </section>
    </main>
  );
}
