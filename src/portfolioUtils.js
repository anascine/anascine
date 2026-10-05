export const normalizeText = (value) => (typeof value === 'string' ? value.trim() : '');

export const withBaseUrl = (url, base = import.meta.env.BASE_URL || '/') => {
  if (!url) return url;

  if (/^(?:[a-z]+:)?\/\//i.test(url) || url.startsWith('data:') || url.startsWith('blob:') || url.startsWith('mailto:')) {
    return url;
  }

  const basePath = (base || '/').replace(/\/+$/, '/');
  const expectedPrefix = basePath === '/' ? '/' : basePath;

  if (url.startsWith(expectedPrefix)) {
    return url;
  }

  const normalizedPath = url.replace(/^\/+/, '');
  return `${basePath}${encodeURI(normalizedPath)}`;
};

export const buildFilterOptions = (videos) => {
  const categories = [...new Set(videos
    .map((video) => normalizeText(video.category))
    .filter(Boolean))];

  return [
    { value: 'all', label: 'All' },
    ...categories.map((category) => ({
      value: category.toLowerCase(),
      label: category,
    })),
  ];
};

export const normalizePortfolioData = (data, base = import.meta.env.BASE_URL || '/') => ({
  videos: (data.videos || [])
    .map((video) => ({
      ...video,
      video: withBaseUrl(video.video, base),
    }))
    .filter((video) => normalizeText(video.video) && normalizeText(video.title)),
});
