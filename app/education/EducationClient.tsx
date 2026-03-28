"use client";

import { useEffect, useMemo, useState } from "react";

type Role = "ADMIN" | "TEACHER" | "STUDENT";

type ClassItem = {
  id: string;
  title: string;
  description: string | null;
  scheduledAt: string;
  durationMinutes: number;
  meetLink: string;
  teacher: { name: string | null; email: string };
};

type RecordingItem = {
  id: string;
  title: string;
  description: string | null;
  videoUrl: string;
  thumbnailUrl: string | null;
  createdAt: string;
  class: { id: string; title: string; scheduledAt: string };
  createdBy: { name: string | null; email: string };
};

export default function EducationClient({ role }: { role: Role }) {
  const [classes, setClasses] = useState<ClassItem[]>([]);
  const [recordings, setRecordings] = useState<RecordingItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [scheduledAt, setScheduledAt] = useState("");
  const [durationMinutes, setDurationMinutes] = useState(60);
  const [mode, setMode] = useState<"auto" | "manual">("manual");
  const [manualMeetLink, setManualMeetLink] = useState("");
  const [scheduling, setScheduling] = useState(false);

  const [selectedClassId, setSelectedClassId] = useState("");
  const [recordingTitle, setRecordingTitle] = useState("");
  const [recordingDescription, setRecordingDescription] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [recordingFile, setRecordingFile] = useState<File | null>(null);
  const [uploadingRecording, setUploadingRecording] = useState(false);

  async function loadData() {
    setLoading(true);
    setError(null);

    try {
      const [classesRes, recordingsRes] = await Promise.all([
        fetch("/api/education/classes", { cache: "no-store" }),
        fetch("/api/education/recordings", { cache: "no-store" }),
      ]);

      if (!classesRes.ok || !recordingsRes.ok) {
        throw new Error("Failed to load education data");
      }

      const classesJson = (await classesRes.json()) as { classes: ClassItem[] };
      const recordingsJson = (await recordingsRes.json()) as { recordings: RecordingItem[] };

      setClasses(classesJson.classes ?? []);
      setRecordings(recordingsJson.recordings ?? []);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Unable to load education data");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  const teacherClasses = useMemo(() => classes, [classes]);

  async function handleScheduleClass(e: React.FormEvent) {
    e.preventDefault();
    setScheduling(true);
    setError(null);

    try {
      const res = await fetch("/api/education/classes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          description,
          scheduledAt: new Date(scheduledAt).toISOString(),
          durationMinutes,
          mode,
          manualMeetLink,
        }),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(data?.error ?? "Unable to schedule class");
      }

      setTitle("");
      setDescription("");
      setScheduledAt("");
      setDurationMinutes(60);
      setManualMeetLink("");
      await loadData();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Unable to schedule class");
    } finally {
      setScheduling(false);
    }
  }

  async function handleUploadRecording(e: React.FormEvent) {
    e.preventDefault();
    setUploadingRecording(true);
    setError(null);

    try {
      let finalVideoUrl = videoUrl.trim();

      if (recordingFile) {
        const fd = new FormData();
        fd.append("file", recordingFile);

        const uploadRes = await fetch("/api/education/upload", {
          method: "POST",
          body: fd,
        });
        const uploadData = await uploadRes.json().catch(() => ({}));

        if (!uploadRes.ok) {
          throw new Error(uploadData?.error ?? "File upload failed");
        }

        finalVideoUrl = uploadData.url;
      }

      if (!finalVideoUrl) {
        throw new Error("Please upload a file or provide a Google Drive/video link");
      }

      const res = await fetch("/api/education/recordings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          classId: selectedClassId,
          title: recordingTitle,
          description: recordingDescription,
          videoUrl: finalVideoUrl,
        }),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(data?.error ?? "Unable to add recording");
      }

      setSelectedClassId("");
      setRecordingTitle("");
      setRecordingDescription("");
      setVideoUrl("");
      setRecordingFile(null);
      await loadData();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Unable to add recording");
    } finally {
      setUploadingRecording(false);
    }
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-8">
          <div className="text-center">
            <span className="inline-block rounded-full bg-emerald-100 px-3 py-1 text-xs font-extrabold text-emerald-800">
              Education Hub
            </span>
            <h1 className="mt-3 text-4xl font-black tracking-tight text-slate-900">
              Live & Recorded <span className="text-emerald-600">Classes</span>
            </h1>
            <p className="mx-auto mt-2 max-w-3xl text-slate-600">
              Role-aware portal for teachers and students. Teachers can schedule classes and upload recordings;
              students can join live sessions and watch class recordings.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-4 px-4 py-6">
        <div className="rounded-2xl border border-slate-200 bg-white p-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
              Logged in as: {role}
            </span>
            <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
              Roadmap: Google Calendar API auto Meet + Manual fallback
            </span>
          </div>

          {error ? (
            <div className="mt-3 rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700">{error}</div>
          ) : null}
        </div>

        {(role === "TEACHER" || role === "ADMIN") && (
          <div className="grid gap-4 lg:grid-cols-2">
            <form onSubmit={handleScheduleClass} className="rounded-2xl border border-slate-200 bg-white p-4">
              <h2 className="text-lg font-extrabold text-slate-900">Teacher Dashboard: Schedule a Class</h2>
              <p className="mt-1 text-sm text-slate-600">
                Auto mode creates a Google Meet link via Calendar API. Manual mode accepts pasted Meet URL.
              </p>

              <div className="mt-3 grid gap-3">
                <input
                  className="rounded-lg border border-slate-300 px-3 py-2 text-sm"
                  placeholder="Class title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
                <textarea
                  className="rounded-lg border border-slate-300 px-3 py-2 text-sm"
                  placeholder="Class description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                />
                <div className="grid gap-3 md:grid-cols-2">
                  <input
                    className="rounded-lg border border-slate-300 px-3 py-2 text-sm"
                    type="datetime-local"
                    value={scheduledAt}
                    onChange={(e) => setScheduledAt(e.target.value)}
                    required
                  />
                  <input
                    className="rounded-lg border border-slate-300 px-3 py-2 text-sm"
                    type="number"
                    min={15}
                    value={durationMinutes}
                    onChange={(e) => setDurationMinutes(Number(e.target.value))}
                    required
                  />
                </div>

                <div className="flex flex-wrap items-center gap-4 rounded-lg border border-slate-200 px-3 py-2 text-sm">
                  <label className="flex items-center gap-2">
                    <input type="radio" checked={mode === "auto"} onChange={() => setMode("auto")} />
                    Auto (Google Meet API)
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="radio" checked={mode === "manual"} onChange={() => setMode("manual")} />
                    Manual link
                  </label>
                </div>

                {mode === "manual" && (
                  <input
                    className="rounded-lg border border-slate-300 px-3 py-2 text-sm"
                    placeholder="https://meet.google.com/xxx-xxxx-xxx"
                    value={manualMeetLink}
                    onChange={(e) => setManualMeetLink(e.target.value)}
                    required
                  />
                )}

                <button
                  type="submit"
                  disabled={scheduling}
                  className="rounded-lg bg-emerald-700 px-4 py-2 text-sm font-bold text-white hover:bg-emerald-800 disabled:opacity-60"
                >
                  {scheduling ? "Scheduling..." : "Schedule Class"}
                </button>
              </div>
            </form>

            <form onSubmit={handleUploadRecording} className="rounded-2xl border border-slate-200 bg-white p-4">
              <h2 className="text-lg font-extrabold text-slate-900">Recorded Sessions: Upload</h2>
              <p className="mt-1 text-sm text-slate-600">
                Upload a video file (local storage) or paste a Google Drive recording link.
              </p>

              <div className="mt-3 grid gap-3">
                <select
                  className="rounded-lg border border-slate-300 px-3 py-2 text-sm"
                  value={selectedClassId}
                  onChange={(e) => setSelectedClassId(e.target.value)}
                  required
                >
                  <option value="">Select class</option>
                  {teacherClasses.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.title}
                    </option>
                  ))}
                </select>

                <input
                  className="rounded-lg border border-slate-300 px-3 py-2 text-sm"
                  placeholder="Recording title"
                  value={recordingTitle}
                  onChange={(e) => setRecordingTitle(e.target.value)}
                  required
                />

                <textarea
                  className="rounded-lg border border-slate-300 px-3 py-2 text-sm"
                  placeholder="Description"
                  rows={2}
                  value={recordingDescription}
                  onChange={(e) => setRecordingDescription(e.target.value)}
                />

                <input
                  className="rounded-lg border border-slate-300 px-3 py-2 text-sm"
                  placeholder="Google Drive / external video URL"
                  value={videoUrl}
                  onChange={(e) => setVideoUrl(e.target.value)}
                />

                <input
                  className="rounded-lg border border-slate-300 px-3 py-2 text-sm"
                  type="file"
                  accept="video/*"
                  onChange={(e) => setRecordingFile(e.target.files?.[0] ?? null)}
                />

                <button
                  type="submit"
                  disabled={uploadingRecording}
                  className="rounded-lg bg-emerald-700 px-4 py-2 text-sm font-bold text-white hover:bg-emerald-800 disabled:opacity-60"
                >
                  {uploadingRecording ? "Saving..." : "Save Recording"}
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="rounded-2xl border border-slate-200 bg-white p-4">
          <h2 className="text-lg font-extrabold text-slate-900">Live Classes</h2>
          <p className="mt-1 text-sm text-slate-600">Upcoming classes for all users.</p>

          {loading ? (
            <p className="mt-3 text-sm text-slate-500">Loading classes...</p>
          ) : classes.length === 0 ? (
            <p className="mt-3 text-sm text-slate-500">No upcoming classes yet.</p>
          ) : (
            <div className="mt-3 grid gap-3">
              {classes.map((klass) => (
                <div key={klass.id} className="rounded-xl border border-slate-200 p-3">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <h3 className="text-base font-bold text-slate-900">{klass.title}</h3>
                      <p className="mt-1 text-sm text-slate-600">{klass.description || "No description"}</p>
                      <p className="mt-1 text-xs text-slate-500">
                        {new Date(klass.scheduledAt).toLocaleString()} • {klass.durationMinutes} mins • Teacher: {klass.teacher.name || klass.teacher.email}
                      </p>
                    </div>

                    <a
                      href={klass.meetLink}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-lg bg-emerald-700 px-3 py-2 text-xs font-bold text-white hover:bg-emerald-800"
                    >
                      {role === "TEACHER" || role === "ADMIN" ? "Start Class" : "Join Class"}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-4">
          <h2 className="text-lg font-extrabold text-slate-900">Recorded Sessions</h2>
          <p className="mt-1 text-sm text-slate-600">Recorded class library for students and teachers.</p>

          {loading ? (
            <p className="mt-3 text-sm text-slate-500">Loading recordings...</p>
          ) : recordings.length === 0 ? (
            <p className="mt-3 text-sm text-slate-500">No recordings uploaded yet.</p>
          ) : (
            <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {recordings.map((rec) => (
                <article key={rec.id} className="rounded-xl border border-slate-200 p-3">
                  <div className="aspect-video overflow-hidden rounded-lg bg-slate-100">
                    {rec.videoUrl.match(/\.(mp4|webm|ogg)$/i) || rec.videoUrl.startsWith("/uploads/") ? (
                      <video src={rec.videoUrl} controls className="h-full w-full object-cover" />
                    ) : (
                      <div className="flex h-full items-center justify-center text-sm text-slate-500">External recording link</div>
                    )}
                  </div>
                  <h3 className="mt-2 text-sm font-bold text-slate-900">{rec.title}</h3>
                  <p className="mt-1 line-clamp-2 text-xs text-slate-600">{rec.description || "No description"}</p>
                  <p className="mt-1 text-xs text-slate-500">Class: {rec.class.title}</p>
                  <a
                    href={rec.videoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-2 inline-block text-xs font-bold text-emerald-700"
                  >
                    Open Recording
                  </a>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
