import { QueryDatabaseResponse } from '@notionhq/client/build/src/api-endpoints';
import { searchDB } from './notionUtil';

const PAGE_SIZE = 10;

const getSearchData = async (datas: string[], nextCursor?: string) => {
  const [categories, tags, words]: [string[], string[], string[]] = [[], [], []];

  datas.forEach((data) => {
    if (data[0] === '@') categories.push(data.substring(1));
    else if (data[0] === '#') tags.push(data.substring(1));
    else words.push(data);
  });

  const getData: QueryDatabaseResponse = await searchDB({ categories, tags, words, startCursor: nextCursor, pageSize: PAGE_SIZE });

  const parsingData = getData.results.map((result: any) => {
    const { category, tag, title, description } = result.properties;

    return {
      category: category.select.name as string,
      tag: tag.multi_select.map((value: { name: string }) => value.name) as string[],
      title: title.title[0].plain_text as string,
      description: description.rich_text[0].plain_text as string,
      url: result.url as string,
    };
  });

  return { parsingData, nextCursor: getData.next_cursor, hasMore: getData.has_more };
};

export { getSearchData };
