import { PostFilters } from '@src/common/utils/post/post.type';

export const parsingFilters = (filters: string[]) =>
  filters.reduce((newFilter: PostFilters, filter) => {
    if (filter[0] === '@') newFilter.categories.push(filter.substring(1));
    else if (filter[0] === '_') newFilter.tags.push(filter.substring(1));
    else newFilter.words.push(filter);
    return newFilter;
  }, { categories: [], tags: [], words: [] });
