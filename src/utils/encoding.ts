export function fixTitleEncoding(title: string | undefined | null): string {
  if (!title) return title || '';
  try {
    if (/^[\x00-\xFF]*$/.test(title)) {
      const bytes = new Uint8Array(title.length);
      for (let i = 0; i < title.length; i++) {
        bytes[i] = title.charCodeAt(i);
      }
      return new TextDecoder('utf-8', { fatal: true }).decode(bytes);
    }
  } catch (e) {
  }
  return title;
}
