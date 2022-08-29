/* eslint-disable no-unused-vars */
import { ReactNode } from 'react';
import { ScrollEvent } from '@/typings/component';

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
