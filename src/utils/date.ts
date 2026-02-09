import { differenceInCalendarDays, format } from 'date-fns';

export function nightsBetween(
  from?: Date | string,
  to?: Date | string,
): number {
  if (!from || !to) return 0;

  const fromDate = typeof from === 'string' ? new Date(from) : from;
  const toDate = typeof to === 'string' ? new Date(to) : to;

  return Math.max(0, differenceInCalendarDays(toDate, fromDate));
}

export function formatDateRange(from: string, to: string) {
  const start = new Date(from);
  const end = new Date(to);
  return `${format(start, 'MMM d')} - ${format(end, 'MMM d, yyyy')}`;
}
