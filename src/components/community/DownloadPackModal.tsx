import * as Dialog from "@radix-ui/react-dialog";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import TenneyButton from "../TenneyButton";
import type { TenneyScalePack } from "../../lib/tenneyScales/types";
import { downloadFile } from "../../lib/download/downloadFile";

type DownloadPackModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  pack: TenneyScalePack | null;
  baseUrl: string;
};

type PackFile = {
  id: string;
  label: string;
  description: string;
  path: string;
  filename: string;
  mime?: string;
};

const MIME_BY_EXTENSION: Record<string, string> = {
  json: "application/json",
  scl: "text/plain; charset=utf-8",
  ascl: "text/plain; charset=utf-8",
  scala: "text/plain; charset=utf-8",
  kbm: "text/plain; charset=utf-8",
};

const resolveUrl = (baseUrl: string, path: string) => {
  const normalizedBase = baseUrl.endsWith("/") ? baseUrl : `${baseUrl}/`;
  return `${normalizedBase}${path.replace(/^\/+/, "")}`;
};

const getFilenameFromPath = (path: string) => {
  const parts = path.split("/");
  return parts[parts.length - 1] || "";
};

const getMimeForFilename = (filename: string) => {
  const extension = filename.split(".").pop()?.toLowerCase();
  if (!extension) return undefined;
  return MIME_BY_EXTENSION[extension];
};

export default function DownloadPackModal({
  open,
  onOpenChange,
  pack,
  baseUrl,
}: DownloadPackModalProps) {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const copyTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (copyTimeoutRef.current) {
        clearTimeout(copyTimeoutRef.current);
      }
    };
  }, []);

  const files = useMemo<PackFile[]>(() => {
    if (!pack) return [];
    const entries: PackFile[] = [];

    entries.push({
      id: "tenney",
      label: "Tenney import",
      description: "Tenney scale-builder JSON for instant import.",
      path: pack.files.tenney,
      filename: `${pack.slug}-scale-builder.json`,
    });

    if (pack.files.scl) {
      const original = getFilenameFromPath(pack.files.scl);
      const filename = original.endsWith(".scl") ? original : `${pack.slug}.scl`;
      entries.push({
        id: "scl",
        label: "Scala (.scl)",
        description: "Classic Scala tuning format for wide compatibility.",
        path: pack.files.scl,
        filename,
      });
    }

    if (pack.files.ascl) {
      const original = getFilenameFromPath(pack.files.ascl);
      const filename = original.endsWith(".ascl") ? original : `${pack.slug}.ascl`;
      entries.push({
        id: "ascl",
        label: "Ableton Scala (.ascl)",
        description: "Ableton-ready Scala JSON export.",
        path: pack.files.ascl,
        filename,
      });
    }

    if (pack.files.kbm) {
      const original = getFilenameFromPath(pack.files.kbm);
      const filename = original.endsWith(".kbm") ? original : `${pack.slug}.kbm`;
      entries.push({
        id: "kbm",
        label: "KBM mapping (.kbm)",
        description: "Keyboard mapping table for MIDI layouts.",
        path: pack.files.kbm,
        filename,
      });
    }

    return entries.map((entry) => ({
      ...entry,
      mime: getMimeForFilename(entry.filename),
    }));
  }, [pack]);

  const handleCopy = useCallback((id: string, url: string) => {
    const finish = () => {
      setCopiedId(id);
      if (copyTimeoutRef.current) {
        clearTimeout(copyTimeoutRef.current);
      }
      copyTimeoutRef.current = setTimeout(() => setCopiedId(null), 2000);
    };

    if (navigator?.clipboard?.writeText) {
      navigator.clipboard
        .writeText(url)
        .then(finish)
        .catch(() => finish());
      return;
    }

    const textArea = document.createElement("textarea");
    textArea.value = url;
    textArea.style.position = "fixed";
    textArea.style.opacity = "0";
    document.body.appendChild(textArea);
    textArea.select();
    try {
      document.execCommand("copy");
    } catch {
      // Ignore copy failures.
    } finally {
      document.body.removeChild(textArea);
      finish();
    }
  }, []);

  const handleDownload = useCallback(
    async (entry: PackFile) => {
      const url = resolveUrl(baseUrl, entry.path);
      await downloadFile({ url, filename: entry.filename, mime: entry.mime });
    },
    [baseUrl],
  );

  return (
    <Dialog.Root open={open && Boolean(pack)} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm transition-opacity motion-reduce:transition-none" />
        <div className="fixed inset-0 z-50 flex items-end justify-center p-4 sm:items-center">
          <Dialog.Content className="tenney-plusgrid w-full max-w-[720px] max-h-[75vh] overflow-auto rounded-t-[22px] border border-tenney-line/70 bg-white/85 p-5 shadow-soft backdrop-blur-lg dark:bg-slate-950/70 sm:max-h-[85vh] sm:rounded-[22px]">
            <div className="flex items-start justify-between gap-4">
              <div>
                <Dialog.Title className="text-lg font-semibold text-slate-900 dark:text-white">
                  Download files
                </Dialog.Title>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {pack ? pack.title : "Scale pack downloads"}
                </p>
              </div>
              <Dialog.Close asChild>
                <button
                  type="button"
                  className="rounded-full border border-tenney-line/70 px-3 py-1 text-xs text-slate-600 transition hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
                >
                  Close
                </button>
              </Dialog.Close>
            </div>

            <div className="mt-5 grid gap-3">
              {files.length === 0 && (
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  No downloadable files available.
                </p>
              )}
              {files.map((entry) => {
                const url = resolveUrl(baseUrl, entry.path);
                return (
                  <div
                    key={entry.id}
                    className="flex flex-wrap items-center justify-between gap-3 rounded-card border border-tenney-line/70 bg-white/70 px-4 py-3 text-xs text-slate-600 shadow-soft dark:bg-slate-950/60 dark:text-slate-300"
                  >
                    <div className="space-y-1">
                      <p className="text-sm font-semibold text-slate-900 dark:text-white">{entry.label}</p>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400">{entry.description}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <TenneyButton size="sm" variant="secondary" onClick={() => void handleDownload(entry)}>
                        Download
                      </TenneyButton>
                      <TenneyButton
                        variant="icon"
                        size="sm"
                        aria-label={`Copy ${entry.label} link`}
                        onClick={() => handleCopy(entry.id, url)}
                      >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M8 7h9a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 15H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v1"
                          />
                        </svg>
                      </TenneyButton>
                      {copiedId === entry.id && (
                        <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
                          Copied
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </Dialog.Content>
        </div>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
