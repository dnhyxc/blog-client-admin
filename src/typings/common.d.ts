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
  isDelete?: boolean;
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
  registerTime?: number | string;
}

export interface UserInfoParams {
  id: string;
  token?: string;
  username?: string;
  job?: string;
  motto?: string;
  introduce?: string;
  headUrl?: string;
  github?: string;
  juejin?: string;
  zhihu?: string;
  blog?: string;
  mainCover?: string;
  articleTotal?: string;
  registerTime?: number;
}

export interface UserListResponst {
  list: UserInfoParams[];
  total: number;
  count: number;
}

export interface useScrollLoadParams<T> {
  data?: T;
  loading?: boolean;
  pageSize?: number;
  scrollStyle?: string;
}

export interface ColumnsParams {
  title: string;
  dataIndex: string;
  flex: number | string;
  render?: (text: any, item: any) => ReactNode;
}

export interface RowSelectionParams {
  selectedList: any[];
  onCheckItem: (item?: any) => void;
  onCheckAll?: () => {};
}

export interface CommentParams {
  commentId?: string;
  articleId: string;
  userId: string;
  username: string;
  date: number;
  content?: string;
  fromUserId?: string;
  likeCount?: number;
  replyCount?: number;
  headUrl?: string;
  fromUsername?: string;
  formContent?: string;
  replyList?: CommentParams[];
  fromCommentId?: string;
  isLike?: boolean;
  isDelete?: boolean;
}

export interface ArticleDetailParams {
  id: string;
  title: string;
  content: string;
  classify: string;
  tag: string;
  coverImage: string;
  headUrl: string;
  abstract: string;
  createTime: number;
  comments: CommentParams[];
  authorName: string;
  authorId: string;
  replyCount: number;
}

export { ScrollEvent };
