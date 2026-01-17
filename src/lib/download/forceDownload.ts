type ForceDownloadOptions = {
  mimeType?: string;
  timeoutMs?: number;
};

export const forceDownload = async (
  url: string,
  filename: string,
  opts: ForceDownloadOptions = {},
) => {
  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), opts.timeoutMs ?? 12000);

  try {
    const response = await fetch(url, { mode: "cors", signal: controller.signal });
    if (!response.ok) {
      throw new Error(`Download failed with status ${response.status}`);
    }
    const blob = await response.blob();
    const resolvedBlob = opts.mimeType ? new Blob([blob], { type: opts.mimeType }) : blob;
    const objectUrl = URL.createObjectURL(resolvedBlob);
    const anchor = document.createElement("a");
    anchor.href = objectUrl;
    anchor.download = filename;
    anchor.rel = "noopener";
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    URL.revokeObjectURL(objectUrl);
  } catch (error) {
    window.open(url, "_blank", "noopener,noreferrer");
  } finally {
    window.clearTimeout(timeout);
  }
};
