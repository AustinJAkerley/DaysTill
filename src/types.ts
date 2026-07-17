export type Countdown = {
  id: string;
  title: string;
  /** Target day as an ISO date string, e.g. "2026-12-25". */
  date: string;
  /** Hex color used as the card accent. */
  color: string;
  createdAt: string;
  archived: boolean;
};
