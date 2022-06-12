import { Client } from '@notionhq/client';
import { NotionQueryOption, NotionResults, NotionSearchFilter } from '@server/api/external/notion/notionAPI.type';
import { DEFAULT_PAGE_SIZE } from '@server/api/external/notion/shared/const';

const notion = new Client({ auth: process.env.NOTION_KEY });

const notionQuery = (queryOption?: NotionQueryOption) => {
  const databaseId = process.env.NOTION_DATABASE_ID;

  if (!databaseId) {
    console.error('Invalid database id');
    return;
  }

  return notion.databases.query({ ...queryOption, database_id: databaseId });
};

export const notionAPI = {
  getAllSearchNotionData: async () => {
    const results: NotionResults = [];

    const requestAllNotionData = async (startCursor?: string) => {
      const getResults = await notionQuery({ start_cursor: startCursor });

      if (getResults) {
        results.push(...getResults.results);

        if (getResults.next_cursor) {
          await requestAllNotionData(getResults.next_cursor);
        }
      }
    };

    await requestAllNotionData();

    return results;
  },
  getSearchNotionData: async (props: NotionSearchFilter) => {
    const {
      categories = [],
      tags = [], words = [],
      pageSize = DEFAULT_PAGE_SIZE,
      startCursor,
    } = props;

    return notionQuery({
      filter: {
        and: [
          ...categories.map((category) => ({ property: 'category', select: { equals: category } })),
          ...tags.map((tag) => ({ property: 'tag', multi_select: { contains: tag } })),
          ...words.map((word) => ({ property: 'title', title: { contains: word } })),
          ...words.map((word) => ({ property: 'description', rich_text: { contains: word } })),
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
  },
};
