export function formatStudyTime(totalMinutes: number): string {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  return `${hours}h ${minutes.toString().padStart(2, '0')}m`;
}

export function getInitials(name: string): string {
  const trimmed = name.trim();
  if (!trimmed) {
    return 'GP';
  }

  const parts = trimmed.split(/\s+/).filter(Boolean);

  if (parts.length >= 2) {
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }

  const single = parts[0];
  if (single.length >= 2) {
    return (single[0] + single[single.length - 1]).toUpperCase();
  }

  return single[0].toUpperCase();
}

export function formatJoinDate(isoDate: string | null): string {
  if (!isoDate) {
    return 'Today';
  }

  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(isoDate));
}
