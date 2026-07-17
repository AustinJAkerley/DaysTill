/** Returns a Date set to local midnight for the given date. */
function startOfDay(d: Date): Date {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

/** Parses an ISO date string ("YYYY-MM-DD") into a local midnight Date. */
export function parseISODate(iso: string): Date {
  const [year, month, day] = iso.split('-').map(Number);
  return new Date(year, (month || 1) - 1, day || 1);
}

/** Formats a Date to an ISO date string ("YYYY-MM-DD"). */
export function toISODate(d: Date): string {
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * Whole days from today until the target date.
 * Positive = in the future, 0 = today, negative = in the past.
 */
export function daysUntil(iso: string): number {
  const today = startOfDay(new Date());
  const target = startOfDay(parseISODate(iso));
  const msPerDay = 24 * 60 * 60 * 1000;
  return Math.round((target.getTime() - today.getTime()) / msPerDay);
}

/** A short human label for the countdown, e.g. "12 days left" or "3 days ago". */
export function countdownLabel(iso: string): string {
  const days = daysUntil(iso);
  if (days === 0) return 'Today';
  if (days === 1) return 'Tomorrow';
  if (days === -1) return 'Yesterday';
  if (days > 1) return `${days} days left`;
  return `${Math.abs(days)} days ago`;
}

/** Formats a target date for display, e.g. "Fri, Dec 25, 2026". */
export function formatLongDate(iso: string): string {
  return parseISODate(iso).toLocaleDateString(undefined, {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}
