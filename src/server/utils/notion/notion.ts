import { notionAPI } from '@server/api/external/notion/notionAPI';
import { DEFAULT_PAGE_SIZE } from '@server/api/external/notion/shared/const';
import { parsingFilters } from '@src/common/utils/post/post';
import { NotionCustomResponse } from '@server/utils/notion/notion.type';

const PAGE_SIZE = DEFAULT_PAGE_SIZE;

const getSearchData = async (filters: string[], nextCursor?: string) => {
  const queryOption = parsingFilters(filters);

  const response = await notionAPI.getSearchNotionData({
    ...queryOption,
    startCursor: nextCursor,
    pageSize: PAGE_SIZE,
  }) as NotionCustomResponse;

  const parsingData = response?.results?.map((result) => {
    const { properties } = result;
    if (properties == null) return {};

    const { category, tag, title, description } = properties;
    const {
      created_time: createdTime,
      last_edited_time: lastEditedTime,
      icon,
      url,
    } = result;
    const created = createdTime ? new Date(createdTime) : null;
    const lastEdited = lastEditedTime ? new Date(lastEditedTime) : null;
    const image = icon ? (icon.type === 'file' ? icon.file.url : (icon.type === 'external' ? icon.external.url : undefined)) : undefined;

    return {
      created: created?.setHours(created.getHours() + 9),
      lastEdited: lastEdited?.setHours(lastEdited.getHours() + 9),
      image,
      category,
      tag: tag?.multi_select,
      title: title?.title[0].plain_text,
      description: description?.rich_text[0].plain_text,
      url,
    };
  }) ?? [];

  const { next_cursor: ResponseNextCursor, has_more: hasMore } = response;

  return { results: parsingData, nextCursor: ResponseNextCursor, hasMore };
};

export { getSearchData };
