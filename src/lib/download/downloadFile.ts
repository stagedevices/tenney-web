type DownloadOptions = {
  url: string;
  filename: string;
  mime?: string;
  openInNewTabFallback?: boolean;
};

export async function downloadFile({
  url,
  filename,
  mime,
  openInNewTabFallback,
}: DownloadOptions): Promise<void> {
  let blobUrl: string | null = null;

  try {
    const response = await fetch(url, { cache: "no-store" });
    if (!response.ok) {
      throw new Error(`Failed to download ${url}`);
    }
    let blob = await response.blob();
    if (mime && (!blob.type || blob.type.length === 0)) {
      blob = new Blob([blob], { type: mime });
    }
    blobUrl = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = blobUrl;
    link.download = filename;
    link.rel = "noopener";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (error) {
    if (openInNewTabFallback !== false) {
      window.open(url, "_blank", "noopener,noreferrer");
      return;
    }
    throw error;
  } finally {
    if (blobUrl) {
      setTimeout(() => URL.revokeObjectURL(blobUrl!), 250);
    }
  }
}
