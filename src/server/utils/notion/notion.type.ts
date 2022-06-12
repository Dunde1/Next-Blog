import { QueryDatabaseResponse } from '@notionhq/client/build/src/api-endpoints';

type CreatedBy = {
  id: string;
  object: 'user';
};

type LastEditedBy = {
  id: string;
  object: 'user';
};

type Icon = {
  type: 'emoji';
  emoji: string;
} | {
  type: 'external';
  external: {
    url: string;
  };
} | {
  type: 'file';
  file: {
    url: string;
    expiry_time: string;
  };
} | null;

type Cover = {
  type: 'external';
  external: {
    url: string;
  };
} | {
  type: 'file';
  file: {
    url: string;
    expiry_time: string;
  };
} | null;

type Parent = {
  type: 'database_id';
  database_id: string;
} | {
  type: 'page_id';
  page_id: string;
} | {
  type: 'workspace';
  workspace: true;
};

type CreateAt = {
  id: string;
  type: 'created_time';
  created_time: string;
};

type MultiSelect = {
  id: string;
  name: string;
  color: string;
};

type Tag = {
  id: string;
  type: 'multi_select';
  multi_select: MultiSelect[];
};

type RichText = {
  type: 'text';
  text: {
    content: string;
    link: {
      url: string;
    } | null;
  };
  annotations: {
    bold: boolean;
    italic: boolean;
    strikethrough: boolean;
    underline: boolean;
    code: boolean;
    color: string;
  };
  plain_text: string;
  href: string | null;
};

type Category = {
  id: string;
  type: 'select';
  select: {
    id: string;
    name: string;
    color: string;
  };
};

type Description = {
  id: string;
  type: 'rich_text';
  rich_text: RichText[];
};

type LastUpdate = {
  id: string;
  type: 'last_edited_time';
  last_edited_time: string;
};

type Title = {
  id: string;
  type: 'title';
  title: RichText[]
};

export interface NotionCustomResultProperty {
  createAt?: CreateAt;
  tag?: Tag;
  description?: Description;
  category?: Category;
  lastUpdate?: LastUpdate;
  title?: Title;
}

export interface NotionCustomResult {
  object: 'page';
  id: string;
  created_time?: string;
  last_edited_time?: string;
  archived?: boolean;
  url?: string;
  created_by?: CreatedBy;
  last_edited_by?: LastEditedBy;
  icon?: Icon;
  cover?: Cover;
  parent?: Parent;
  properties?: NotionCustomResultProperty;
}

export interface NotionCustomResponse extends Omit<QueryDatabaseResponse, 'results'> {
  results: NotionCustomResult[];
}
