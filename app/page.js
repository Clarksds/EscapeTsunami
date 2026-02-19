"use client";

import { useMemo, useState } from "react";
import Image from "next/image";

const SCRIPTS = [
  {
    id: "tsunami",
    title: "TSUNAMI SCRIPT",
    subtitle: "Escape Tsunami – utility snippet",
    badge: "ETB",
    views: "15.4K",
    status: "WORKING",
    image: "/images/redyn.jpg", // ✅ put your image in public/images/tsunami.png
    code: `loadstring(game:HttpGet("https://deltahoaxscripts.vercel.app/escapetsunami"))()`,
  },
  {
    id: "coming-soon",
    title: "COMING SOON",
    subtitle: "coming soon",
    badge: "UTIL",
    views: "0",
    status: "UPDATED",
    image: "", // no image = fallback icon
    code: `-- Coming Soon!`,
  },
];

function CopyButton({ text }) {
  const [copied, setCopied] = useState(false);

  async function onCopy() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    }
  }

  return (
    <button className="btn" onClick={onCopy}>
      {copied ? "COPIED ✅" : "COPY SCRIPT"} <span className="icon">📋</span>
    </button>
  );
}

export default function Home() {
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return SCRIPTS;
    return SCRIPTS.filter(
      (x) =>
        x.title.toLowerCase().includes(s) ||
        x.subtitle.toLowerCase().includes(s) ||
        x.badge.toLowerCase().includes(s)
    );
  }, [q]);

  return (
    <main className="wrap">
      <div className="bgGlow" />

      <header className="hero">
        <div className="pill">UPDATED SCRIPTS</div>

        <h1 className="h1">
          EXPERIENCE THE <span className="accent">NEXT LEVEL</span> OF
          <br />
          YOUR SCRIPT LIBRARY
        </h1>

        <p className="sub">
          Verified, safe, and mobile-friendly snippets for your own projects.
        </p>

        <input
          className="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search scripts…"
        />
      </header>

      <section className="section">
        <div className="sectionHead">
          <h2 className="h2">LATEST SCRIPTS</h2>
          <div className="line" />
        </div>

        <div className="grid">
          {filtered.map((s) => (
            <article className="card" key={s.id}>
              <div className="cardTop">
                {/* ✅ Thumbnail image (fallback to gradient icon) */}
                <div className="thumb">
                  {s.image ? (
                    <Image
                      src={s.image}
                      alt={`${s.title} thumbnail`}
                      width={64}
                      height={64}
                      className="thumbImg"
                      priority={s.id === "tsunami"}
                    />
                  ) : (
                    <div className="appIcon" aria-hidden />
                  )}
                </div>

                <div className="meta">
                  <div className="statusRow">
                    <span className="dot" />
                    <span className="status">{s.status}</span>
                  </div>

                  <div className="title">{s.title}</div>
                  <div className="subtitle">{s.subtitle}</div>

                  {/* ✅ FIX A: views moved here so it's always visible on mobile */}
                  <div className="viewsInline">👁 {s.views}</div>
                </div>

                {/* ✅ FIX A: right side only has badge */}
                <div className="rightMeta">
                  <div className="badge">{s.badge}</div>
                </div>
              </div>

              <div className="codeBox">
                <code className="code">{s.code}</code>
              </div>

              <CopyButton text={s.code} />
            </article>
          ))}
        </div>
      </section>

      <footer className="footer">
        <div className="helpPill">You Need Help?</div>
      </footer>

      <style jsx>{`
        .wrap {
          min-height: 100vh;
          padding: 22px 16px 60px;
          color: #e9e9ff;
          background: radial-gradient(
              1000px 700px at 20% 10%,
              rgba(123, 66, 255, 0.25),
              transparent 60%
            ),
            radial-gradient(
              900px 700px at 85% 25%,
              rgba(58, 205, 255, 0.14),
              transparent 55%
            ),
            linear-gradient(180deg, #070816, #040411);
          position: relative;
          overflow: hidden;
          font-family: system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif;
        }

        .bgGlow {
          position: absolute;
          inset: -40px;
          background: radial-gradient(
              600px 500px at 50% 0%,
              rgba(127, 80, 255, 0.18),
              transparent 65%
            ),
            radial-gradient(
              700px 600px at 20% 35%,
              rgba(80, 140, 255, 0.1),
              transparent 60%
            );
          filter: blur(1px);
          pointer-events: none;
        }

        .hero {
          max-width: 980px;
          margin: 0 auto;
          padding-top: 10px;
          text-align: center;
          position: relative;
          z-index: 1;
        }

        .pill {
          display: inline-block;
          padding: 10px 16px;
          border-radius: 999px;
          border: 1px solid rgba(160, 140, 255, 0.25);
          background: rgba(255, 255, 255, 0.04);
          font-weight: 700;
          letter-spacing: 0.12em;
          font-size: 12px;
          color: rgba(233, 233, 255, 0.85);
          margin: 10px auto 18px;
        }

        .h1 {
          margin: 0;
          font-weight: 900;
          letter-spacing: -0.02em;
          font-size: 44px;
          line-height: 1.05;
          text-transform: uppercase;
          text-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
        }

        .accent {
          background: linear-gradient(90deg, #a55bff, #4cc3ff);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }

        .sub {
          margin: 14px auto 18px;
          max-width: 720px;
          color: rgba(233, 233, 255, 0.65);
        }

        .search {
          width: 100%;
          max-width: 720px;
          padding: 14px 16px;
          border-radius: 18px;
          border: 1px solid rgba(160, 140, 255, 0.2);
          background: rgba(255, 255, 255, 0.03);
          color: #e9e9ff;
          outline: none;
          margin: 8px auto 0;
        }

        .search::placeholder {
          color: rgba(233, 233, 255, 0.4);
        }

        .section {
          max-width: 980px;
          margin: 26px auto 0;
          position: relative;
          z-index: 1;
        }

        .sectionHead {
          display: flex;
          align-items: center;
          gap: 14px;
          margin: 18px 0 14px;
        }

        .h2 {
          margin: 0;
          font-size: 26px;
          font-weight: 900;
          letter-spacing: -0.01em;
          text-transform: uppercase;
        }

        .line {
          height: 1px;
          flex: 1;
          background: linear-gradient(
            90deg,
            rgba(140, 120, 255, 0.55),
            rgba(255, 255, 255, 0)
          );
        }

        .grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 16px;
        }

        .card {
          border-radius: 22px;
          border: 1px solid rgba(160, 140, 255, 0.16);
          background: rgba(255, 255, 255, 0.03);
          box-shadow: 0 16px 50px rgba(0, 0, 0, 0.45);
          padding: 16px;
        }

        .cardTop {
          display: flex;
          gap: 14px;
          align-items: center;
        }

        /* ✅ Image thumb container */
        .thumb {
          width: 64px;
          height: 64px;
          border-radius: 18px;
          overflow: hidden;
          flex: 0 0 auto;
          border: 1px solid rgba(255, 255, 255, 0.08);
          box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.35);
          background: rgba(255, 255, 255, 0.03);
        }

        .thumbImg {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        /* Fallback gradient icon if no image */
        .appIcon {
          width: 64px;
          height: 64px;
          border-radius: 18px;
          background: linear-gradient(
            135deg,
            rgba(90, 220, 255, 0.25),
            rgba(170, 90, 255, 0.25)
          );
        }

        .meta {
          flex: 1;
          min-width: 0;
        }

        .statusRow {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 6px;
        }

        .dot {
          width: 10px;
          height: 10px;
          border-radius: 999px;
          background: #37f08c;
          box-shadow: 0 0 18px rgba(55, 240, 140, 0.5);
        }

        .status {
          font-weight: 800;
          letter-spacing: 0.12em;
          font-size: 12px;
          color: rgba(180, 255, 212, 0.85);
        }

        .title {
          font-weight: 900;
          text-transform: uppercase;
          font-size: 22px;
          line-height: 1.1;
        }

        .subtitle {
          margin-top: 4px;
          color: rgba(233, 233, 255, 0.55);
          font-size: 14px;
        }

        /* ✅ FIX A: views always visible under subtitle */
        .viewsInline {
          margin-top: 6px;
          font-size: 12px;
          color: rgba(233, 233, 255, 0.6);
        }

        .rightMeta {
          flex: 0 0 auto;
          display: flex;
          align-items: flex-start;
        }

        .badge {
          padding: 8px 12px;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(160, 140, 255, 0.22);
          font-weight: 900;
          font-size: 12px;
          color: rgba(233, 233, 255, 0.85);
          white-space: nowrap;
        }

        .codeBox {
          margin: 14px 0 12px;
          border-radius: 16px;
          border: 1px solid rgba(160, 140, 255, 0.16);
          background: rgba(0, 0, 0, 0.28);
          padding: 12px;
          overflow: hidden;
        }

        .code {
          display: block;
          white-space: pre;
          overflow-x: auto;
          font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas,
            "Liberation Mono", "Courier New", monospace;
          font-size: 12px;
          color: rgba(220, 220, 255, 0.88);
        }

        .btn {
          width: 100%;
          margin-top: 6px;
          padding: 16px 18px;
          border: none;
          border-radius: 18px;
          font-weight: 900;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          font-size: 16px;
          color: #0b0b12;
          background: linear-gradient(90deg, #7c4dff, #4cc3ff);
          cursor: pointer;
          box-shadow: 0 16px 40px rgba(110, 90, 255, 0.25);
        }

        .icon {
          margin-left: 8px;
        }

        .footer {
          max-width: 980px;
          margin: 26px auto 0;
          display: flex;
          justify-content: flex-end;
          position: relative;
          z-index: 1;
        }

        .helpPill {
          padding: 12px 16px;
          border-radius: 999px;
          background: linear-gradient(
            90deg,
            rgba(124, 77, 255, 0.28),
            rgba(76, 195, 255, 0.18)
          );
          border: 1px solid rgba(160, 140, 255, 0.22);
          color: rgba(233, 233, 255, 0.9);
          font-weight: 800;
        }

        @media (min-width: 860px) {
          .grid {
            grid-template-columns: 1fr 1fr;
          }
        }

        @media (max-width: 520px) {
          .h1 {
            font-size: 34px;
          }
        }
      `}</style>
    </main>
  );
}
