/* eslint-disable no-unused-vars */
import { ReactNode } from 'react';
import { ScrollEvent } from '@/typings/component';

export interface LoginData {
  username: string;
  token?: string;
  userId: string;
  job?: string;
  motto?: string;
  introduce?: string;
  headUrl?: string;
  github?: string;
  juejin?: string;
  zhihu?: string;
  blog?: string;
  mainCover?: string;
}

export interface ArticleItem {
  abstract: string;
  authorId: string;
  authorName: string;
  classify: string;
  content?: string;
  coverImage: string;
  createTime: number;
  id: string;
  tag: string;
  title: string;
}

export interface ArticleListResult {
  list: ArticleItem[];
  total: number;
  count: number;
}

export interface GetArticleListParams {
  pageNo: number;
  pageSize: number;
  filter?: any;
  userId?: string;
}

export interface UserItemParams {
  id: string;
  username: string;
  job: string;
  introduce: string;
  registerTime: number | string;
}

export interface ColumnsParams {
  title: string;
  dataIndex: string;
  flex: number | string;
  render?: (text: string, item: any) => ReactNode;
}

export interface RowSelectionParams {
  selectedList: any[];
  onCheckItem: (item?: any) => void;
  onCheckAll?: () => {};
}

export { ScrollEvent };
