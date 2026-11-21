import type { MouseEvent } from 'react';

const PDF_MAGIC_BYTES = [0x25, 0x50, 0x44, 0x46, 0x2d]; // "%PDF-"
export const RESUME_FILENAME = 'Rimsha-Shafique-Resume.pdf';

function isPdfBuffer(buffer: ArrayBuffer): boolean {
  if (buffer.byteLength < PDF_MAGIC_BYTES.length) return false;
  const view = new Uint8Array(buffer, 0, PDF_MAGIC_BYTES.length);
  return PDF_MAGIC_BYTES.every((byte, index) => view[index] === byte);
}

export async function triggerResumeDownload(
  url: string,
  filename: string = RESUME_FILENAME
): Promise<boolean> {
  try {
    const response = await fetch(url, {
      method: 'GET',
      cache: 'no-store',
      credentials: 'same-origin',
    });

    if (!response.ok) return false;

    const buffer = await response.arrayBuffer();
    if (!isPdfBuffer(buffer)) return false;

    const blob = new Blob([buffer], { type: 'application/pdf' });
    const objectUrl = URL.createObjectURL(blob);

    const anchor = document.createElement('a');
    anchor.href = objectUrl;
    anchor.download = filename;
    anchor.hidden = true;
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();

    window.setTimeout(() => {
      URL.revokeObjectURL(objectUrl);
    }, 10_000);

    return true;
  } catch {
    return false;
  }
}

export function handleResumeLinkClick(
  event: MouseEvent<HTMLAnchorElement>,
  url: string,
  afterClick?: () => void
): void {
  if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) {
    return;
  }

  event.preventDefault();
  afterClick?.();

  void triggerResumeDownload(url, RESUME_FILENAME).then((succeeded) => {
    if (!succeeded) {
      window.location.assign(url);
    }
  });
}
