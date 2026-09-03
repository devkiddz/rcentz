export function humanizePortfolioValue(
  value: string
) {
  return value
    .toLowerCase()
    .split('_')
    .map(
      part =>
        part.charAt(0).toUpperCase() +
        part.slice(1)
    )
    .join(' ');
}

export function formatPortfolioDate(
  value: string | null,
  detailed = false
) {
  if (!value) {
    return null;
  }

  return new Intl.DateTimeFormat(
    'en-NG',
    detailed
      ? {
          day: 'numeric',
          month: 'short',
          year: 'numeric'
        }
      : {
          month: 'short',
          year: 'numeric'
        }
  ).format(
    new Date(value)
  );
}

export function getSafePortfolioUrl(
  value: string | null
) {
  if (!value) {
    return null;
  }

  try {
    const url =
      new URL(value);

    if (
      url.protocol !== 'https:' &&
      url.protocol !== 'http:'
    ) {
      return null;
    }

    return url.toString();
  } catch {
    return null;
  }
}