import { QueryDatabaseResponse } from '@notionhq/client/build/src/api-endpoints';
import { searchDB } from './notionUtil';

type iconType = null | {
  type: 'file';
  file: {
    url: string;
  };
};

const PAGE_SIZE = 10;

const getSearchData = async (filters: string[], nextCursor?: string) => {
  const [categories, tags, words]: [string[], string[], string[]] = [[], [], []];

  filters.forEach((filter) => {
    if (filter[0] === '@') categories.push(filter.substring(1));
    else if (filter[0] === '_') tags.push(filter.substring(1));
    else words.push(filter);
  });

  const getData: QueryDatabaseResponse = await searchDB({ categories, tags, words, startCursor: nextCursor, pageSize: PAGE_SIZE });

  const parsingData =
    getData.results?.map((result: any) => {
      const { category, tag, title, description } = result.properties;
      const { created_time, last_edited_time, icon, url }: { created_time: string; last_edited_time: string; icon: iconType; url: string } = result;
      const { name, color }: { name: string; color: string } = category.select;
      const { multi_select }: { multi_select: { name: string; color: string } } = tag;
      const created = new Date(created_time);
      const lastEdited = new Date(last_edited_time);
      const image: string | null = icon ? (icon.type === 'file' ? icon.file.url : null) : null;

      return {
        created: created.setHours(created.getHours() + 9),
        lastEdited: lastEdited.setHours(lastEdited.getHours() + 9),
        image,
        category: { name, color },
        tag: multi_select,
        title: title.title[0].plain_text as string,
        description: description.rich_text[0].plain_text as string,
        url,
      };
    }) ?? [];

  const { next_cursor, has_more } = getData;

  return { results: parsingData, nextCursor: next_cursor, hasMore: has_more };
};

export { getSearchData };
