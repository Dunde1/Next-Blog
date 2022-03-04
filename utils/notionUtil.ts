import { Client } from '@notionhq/client';
import { QueryDatabaseResponse } from '@notionhq/client/build/src/api-endpoints';

type searchDBPropsType = {
  categories?: string[];
  tags?: string[];
  words?: string[];
  pageSize?: number;
  startCursor?: string;
};

const notion = new Client({ auth: process.env.NOTION_KEY });

const tryHandler = (fn: Function) => {
  const databaseId = process.env.NOTION_DATABASE_ID;

  if (!databaseId) {
    console.error('Invalid database id');
    return false;
  }

  try {
    return fn(databaseId);
  } catch (error) {
    console.error(error);
    return false;
  }
};

const getAllSearchDB = async () => {
  const getSearchDB = (startCursor?: string): QueryDatabaseResponse | false => {
    return tryHandler((databaseId: string) => {
      return notion.databases.query({
        database_id: databaseId,
        start_cursor: startCursor,
      });
    });
  };

  const results = [];
  const getResults = await getSearchDB();

  if (getResults) {
    results.push(...getResults.results);
    let { has_more, next_cursor } = getResults;

    while (has_more) {
      const getNextResults = getSearchDB(next_cursor ?? undefined);

      if (getNextResults) {
        results.push(...getNextResults.results);
        has_more = getNextResults.has_more;
        next_cursor = getNextResults.next_cursor;
      } else return;
    }
  } else return;

  return results;
};

const searchDB = async ({ categories = [], tags = [], words = [], pageSize = 10, startCursor }: searchDBPropsType) => {
  return tryHandler((databaseId: string) => {
    return notion.databases.query({
      database_id: databaseId,
      filter: {
        or: [
          ...categories.map((category) => {
            return { property: 'category', select: { equals: category } };
          }),
          ...tags.map((tag) => {
            return { property: 'tag', multi_select: { contains: tag } };
          }),
          ...words.map((word) => {
            return { property: 'title', title: { contains: word } };
          }),
          ...words.map((word) => {
            return { property: 'description', rich_text: { contains: word } };
          }),
        ],
      },
      start_cursor: startCursor,
      page_size: pageSize,
      sorts: [
        {
          timestamp: 'last_edited_time',
          direction: 'descending',
        },
      ],
    });
  });
};

export { getAllSearchDB, searchDB };
