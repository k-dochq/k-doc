export type ArticleItemType =
  | string
  | { content: string; subItems?: string[] }
  | { title: string; subItems?: Array<string | { content: string; subSubItems?: string[] }> };
