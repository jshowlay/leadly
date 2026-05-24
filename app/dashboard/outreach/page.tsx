"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  Sparkles,
  ChevronRight,
  Clipboard,
  ClipboardCheck,
  RotateCcw,
  AlertCircle,
  Mail,
  Zap,
  MessageSquare,
  Loader2,
} from "lucide-react";

const EXAMPLE_CSV =
  "Bright Smile Dental, Dr. Sarah Chen, Austin TX, 4.2, 87, Solo practice, Google reviews mention wait times, contact@brightsmile.com";

type OutreachVariant = {
  id: string;
  label: string;
  subject: string;
  body: string;
  tone: string;
};

type CopyTarget = "subject" | "body" | "full" | null;

export default function OutreachGeneratorPage() {
  const [csv, setCsv] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [variants, setVariants] = useState<OutreachVariant[] | null>(null);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [copied, setCopied] = useState<CopyTarget>(null);
  const resultsRef = useRef<HTMLDivElement>(null);
  const copyTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const activeVariant = variants?.find((v) => v.id === activeId) ?? variants?.[0] ?? null;

  const flashCopied = useCallback((target: CopyTarget) => {
    if (copyTimerRef.current) clearTimeout(copyTimerRef.current);
    setCopied(target);
    copyTimerRef.current = setTimeout(() => setCopied(null), 2000);
  }, []);

  const copyText = useCallback(
    async (text: string, target: CopyTarget) => {
      try {
        await navigator.clipboard.writeText(text);
        flashCopied(target);
      } catch {
        setError("Could not copy to clipboard");
      }
    },
    [flashCopied]
  );

  const loadExample = () => {
    setCsv(EXAMPLE_CSV);
    setError(null);
  };

  const startOver = () => {
    setCsv("");
    setVariants(null);
    setActiveId(null);
    setError(null);
    setCopied(null);
  };

  const generate = async () => {
    if (!csv.trim() || loading) return;
    setLoading(true);
    setError(null);
    setVariants(null);
    setActiveId(null);

    try {
      const res = await fetch("/api/outreach", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ csv: csv.trim() }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error ?? "Generation failed");
      }
      if (!Array.isArray(data.variants) || data.variants.length === 0) {
        throw new Error("No email variants returned");
      }
      setVariants(data.variants as OutreachVariant[]);
      setActiveId(data.variants[0].id);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Generation failed");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (variants && resultsRef.current) {
      resultsRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [variants]);

  useEffect(() => {
    return () => {
      if (copyTimerRef.current) clearTimeout(copyTimerRef.current);
    };
  }, []);

  const tabIcon = (id: string) => {
    if (id === "cold-intro") return <Mail size={14} />;
    if (id === "pain-point") return <Zap size={14} />;
    return <MessageSquare size={14} />;
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,400&family=Syne:wght@600;700;800&display=swap');

        .og-root {
          min-height: 100vh;
          background: #0e0e0e;
          color: #e8e8e8;
          font-family: 'DM Sans', 'Helvetica Neue', sans-serif;
          position: relative;
          overflow-x: hidden;
        }

        .og-grain {
          pointer-events: none;
          position: fixed;
          inset: 0;
          opacity: 0.35;
          z-index: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E");
        }

        .og-wrap {
          position: relative;
          z-index: 1;
          max-width: 820px;
          margin: 0 auto;
          padding: 32px 20px 64px;
        }

        .og-back {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 13px;
          color: #888;
          text-decoration: none;
          margin-bottom: 28px;
          transition: color 0.15s ease;
        }
        .og-back:hover { color: #e8ff57; }

        .og-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-family: 'Syne', sans-serif;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #0e0e0e;
          background: #e8ff57;
          padding: 5px 10px;
          border-radius: 4px;
          margin-bottom: 16px;
        }

        .og-title {
          font-family: 'Syne', sans-serif;
          font-size: clamp(28px, 5vw, 42px);
          font-weight: 800;
          line-height: 1.1;
          letter-spacing: -0.02em;
          color: #fafafa;
          margin: 0 0 12px;
        }

        .og-title em {
          font-style: italic;
          color: #e8ff57;
        }

        .og-sub {
          font-size: 15px;
          line-height: 1.6;
          color: #888;
          margin: 0 0 32px;
          max-width: 520px;
        }

        .og-card {
          background: #161616;
          border: 1px solid #2a2a2a;
          border-radius: 12px;
          padding: 24px;
        }

        .og-label {
          font-family: 'Syne', sans-serif;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #666;
          margin-bottom: 10px;
          display: block;
        }

        .og-textarea {
          width: 100%;
          min-height: 120px;
          background: #0e0e0e;
          border: 1px solid #2a2a2a;
          border-radius: 8px;
          padding: 14px 16px;
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          line-height: 1.55;
          color: #e8e8e8;
          resize: vertical;
          transition: border-color 0.15s ease;
          box-sizing: border-box;
        }
        .og-textarea::placeholder { color: #555; }
        .og-textarea:focus {
          outline: none;
          border-color: #e8ff57;
        }

        .og-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin-top: 16px;
        }

        .og-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          font-weight: 600;
          padding: 11px 18px;
          border-radius: 8px;
          border: 1px solid #2a2a2a;
          background: transparent;
          color: #ccc;
          cursor: pointer;
          transition: background 0.15s ease, color 0.15s ease, border-color 0.15s ease, transform 0.15s ease;
        }
        .og-btn:hover:not(:disabled) {
          border-color: #444;
          color: #fff;
          transform: translateY(-1px);
        }
        .og-btn:disabled {
          opacity: 0.45;
          cursor: not-allowed;
        }

        .og-btn-primary {
          background: #e8ff57;
          color: #0e0e0e;
          border-color: #e8ff57;
        }
        .og-btn-primary:hover:not(:disabled) {
          background: #d4eb4a;
          border-color: #d4eb4a;
          color: #0e0e0e;
        }

        .og-error {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          margin-top: 16px;
          padding: 12px 14px;
          background: rgba(239, 68, 68, 0.1);
          border: 1px solid rgba(239, 68, 68, 0.35);
          border-radius: 8px;
          color: #fca5a5;
          font-size: 13px;
        }

        .og-results {
          margin-top: 40px;
          animation: og-fade-up 0.45s ease forwards;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        @keyframes og-fade-up {
          from {
            opacity: 0;
            transform: translateY(16px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .og-tabs {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-bottom: 16px;
        }

        .og-tab {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          font-weight: 600;
          padding: 9px 14px;
          border-radius: 8px;
          border: 1px solid #2a2a2a;
          background: #161616;
          color: #888;
          cursor: pointer;
          transition: background 0.15s ease, color 0.15s ease, border-color 0.15s ease;
        }
        .og-tab:hover {
          border-color: #444;
          color: #ccc;
        }
        .og-tab-active {
          background: #e8ff57;
          color: #0e0e0e;
          border-color: #e8ff57;
        }
        .og-tab-active:hover {
          color: #0e0e0e;
          border-color: #e8ff57;
        }

        .og-tone {
          font-size: 12px;
          color: #888;
          padding: 10px 14px;
          background: #0e0e0e;
          border-radius: 6px;
          margin-bottom: 20px;
          border-left: 3px solid #e8ff57;
        }

        .og-field {
          margin-bottom: 20px;
        }

        .og-field-head {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 8px;
        }

        .og-field-title {
          font-family: 'Syne', sans-serif;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #666;
        }

        .og-copy-btn {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          font-size: 12px;
          font-weight: 600;
          padding: 5px 10px;
          border-radius: 6px;
          border: 1px solid #2a2a2a;
          background: transparent;
          color: #888;
          cursor: pointer;
          transition: background 0.15s ease, color 0.15s ease, border-color 0.15s ease;
        }
        .og-copy-btn:hover {
          border-color: #e8ff57;
          color: #e8ff57;
        }
        .og-copy-btn-done {
          border-color: #e8ff57;
          color: #e8ff57;
        }

        .og-field-box {
          background: #0e0e0e;
          border: 1px solid #2a2a2a;
          border-radius: 8px;
          padding: 14px 16px;
          font-size: 14px;
          line-height: 1.6;
          color: #d4d4d4;
          white-space: pre-wrap;
        }

        .og-field-box-subject {
          font-weight: 600;
          color: #fafafa;
        }

        .og-full-copy {
          width: 100%;
          margin-top: 8px;
        }

        .og-reset {
          margin-top: 20px;
        }

        @media (max-width: 480px) {
          .og-wrap { padding: 24px 16px 48px; }
          .og-card { padding: 18px; }
          .og-actions { flex-direction: column; }
          .og-btn { width: 100%; }
        }
      `}</style>

      <div className="og-root">
        <div className="og-grain" aria-hidden />
        <div className="og-wrap">
          <Link href="/dashboard" className="og-back">
            <ChevronRight size={14} style={{ transform: "rotate(180deg)" }} />
            Back to dashboard
          </Link>

          <span className="og-eyebrow">
            <Sparkles size={12} />
            Dentily Pro
          </span>

          <h1 className="og-title">
            Write outreach that <em>actually</em> gets replies
          </h1>
          <p className="og-sub">
            Paste a row from your Dentily CSV export. Claude writes three personalized email variants
            tuned to that practice&apos;s data.
          </p>

          <div className="og-card">
            <label className="og-label" htmlFor="og-csv">
              Lead CSV row
            </label>
            <textarea
              id="og-csv"
              className="og-textarea"
              value={csv}
              onChange={(e) => setCsv(e.target.value)}
              placeholder={EXAMPLE_CSV}
              disabled={loading}
            />

            <div className="og-actions">
              <button type="button" className="og-btn" onClick={loadExample} disabled={loading}>
                Load example
              </button>
              <button
                type="button"
                className="og-btn og-btn-primary"
                onClick={generate}
                disabled={!csv.trim() || loading}
              >
                {loading ? (
                  <>
                    <Loader2 size={16} className="og-spin" style={{ animation: "spin 1s linear infinite" }} />
                    Writing emails…
                  </>
                ) : (
                  <>
                    <Sparkles size={16} />
                    Generate outreach
                    <ChevronRight size={16} />
                  </>
                )}
              </button>
            </div>

            {error && (
              <div className="og-error" role="alert">
                <AlertCircle size={16} style={{ flexShrink: 0, marginTop: 2 }} />
                <span>{error}</span>
              </div>
            )}
          </div>

          {variants && activeVariant && (
            <div className="og-results" ref={resultsRef}>
              <div className="og-tabs" role="tablist">
                {variants.map((v) => (
                  <button
                    key={v.id}
                    type="button"
                    role="tab"
                    aria-selected={activeId === v.id}
                    className={`og-tab ${activeId === v.id ? "og-tab-active" : ""}`}
                    onClick={() => setActiveId(v.id)}
                  >
                    {tabIcon(v.id)}
                    {v.label}
                  </button>
                ))}
              </div>

              <div className="og-card" role="tabpanel">
                <div className="og-tone">{activeVariant.tone}</div>

                <div className="og-field">
                  <div className="og-field-head">
                    <span className="og-field-title">Subject line</span>
                    <button
                      type="button"
                      className={`og-copy-btn ${copied === "subject" ? "og-copy-btn-done" : ""}`}
                      onClick={() => copyText(activeVariant.subject, "subject")}
                    >
                      {copied === "subject" ? (
                        <>
                          <ClipboardCheck size={13} />
                          Copied ✓
                        </>
                      ) : (
                        <>
                          <Clipboard size={13} />
                          Copy
                        </>
                      )}
                    </button>
                  </div>
                  <div className="og-field-box og-field-box-subject">{activeVariant.subject}</div>
                </div>

                <div className="og-field">
                  <div className="og-field-head">
                    <span className="og-field-title">Email body</span>
                    <button
                      type="button"
                      className={`og-copy-btn ${copied === "body" ? "og-copy-btn-done" : ""}`}
                      onClick={() => copyText(activeVariant.body.replace(/\\n/g, "\n"), "body")}
                    >
                      {copied === "body" ? (
                        <>
                          <ClipboardCheck size={13} />
                          Copied ✓
                        </>
                      ) : (
                        <>
                          <Clipboard size={13} />
                          Copy
                        </>
                      )}
                    </button>
                  </div>
                  <div className="og-field-box">
                    {activeVariant.body.replace(/\\n/g, "\n")}
                  </div>
                </div>

                <button
                  type="button"
                  className="og-btn og-btn-primary og-full-copy"
                  onClick={() =>
                    copyText(
                      `Subject: ${activeVariant.subject}\n\n${activeVariant.body.replace(/\\n/g, "\n")}`,
                      "full"
                    )
                  }
                >
                  {copied === "full" ? (
                    <>
                      <ClipboardCheck size={16} />
                      Copied ✓
                    </>
                  ) : (
                    <>
                      <Clipboard size={16} />
                      Copy full email
                    </>
                  )}
                </button>
              </div>

              <button type="button" className="og-btn og-reset" onClick={startOver}>
                <RotateCcw size={14} />
                Start over
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
