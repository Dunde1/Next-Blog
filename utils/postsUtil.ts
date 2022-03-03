const getPosts = async (filters: string[], cursor?: string) => {
  const url = '/get/posts';
  const filtersQuery = `filters=${JSON.stringify(filters.map((filter) => filter.replace('#', '_')))}`;
  const result = await fetch(`${url}?${filtersQuery}${cursor ? `&cursor=${JSON.stringify(cursor)}` : ''}`, { method: 'GET' });

  return result.json();
};

export { getPosts };
