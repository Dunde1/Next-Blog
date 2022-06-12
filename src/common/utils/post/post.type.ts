import { NotionSearchFilter } from '@server/api/external/notion/notionAPI.type';

export interface PostFilters extends Required<Pick<NotionSearchFilter, 'categories' | 'tags' | 'words'>> {
}
