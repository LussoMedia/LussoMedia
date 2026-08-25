// Strips control characters (including CR/LF) from user-supplied strings
// before they're used in contexts where an embedded newline could matter —
// email subject lines being the main one here. Resend's JSON API makes
// classic SMTP header injection unlikely, but there's no reason to trust
// that implicitly.
export function stripControlChars(value: string): string {
  return value.replace(/[\x00-\x1F\x7F]/g, ' ').trim();
}
