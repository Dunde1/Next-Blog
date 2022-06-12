import { QueryDatabaseParameters, QueryDatabaseResponse } from '@notionhq/client/build/src/api-endpoints';

export type WithAuth<P> = P & {
  auth?: string;
};

export type NotionResults = QueryDatabaseResponse['results'];

export interface NotionQueryOption extends Omit<WithAuth<QueryDatabaseParameters>, 'database_id'> {
}

export interface NotionSearchFilter {
  categories?: string[];
  tags?: string[];
  words?: string[];
  pageSize?: number;
  startCursor?: string;
}
