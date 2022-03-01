import { Client } from '@notionhq/client';

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

type searchDBPropsType = {
  categories?: string[];
  tags?: string[];
  words?: string[];
  pageSize?: number;
  startCursor?: string;
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
    });
  });
};

export { searchDB };
