import { post } from '@/utils/request';
import { uploadFile } from './upload';
import { GetArticleListParams } from '@/typings/common';
import * as API from './api';
import {
  register,
  login,
  updateInfo,
  getUserInfo,
  updatePassword,
  verify,
} from './user';

export {
  register,
  login,
  updateInfo,
  getUserInfo,
  uploadFile,
  updatePassword,
  verify,
};

export async function getArticleList(params: GetArticleListParams) {
  const res = await post(API.ARTICLE_LIST, params);
  return res;
}

export async function getUserList(params: {
  pageNo: number;
  pageSize: number;
  userId: string;
}) {
  const res = await post(API.GET_USER_LIST, params);
  return res;
}

export async function batchDeleteUser(params: { userIds: string[] }) {
  const res = await post(API.BATCH_DELETE_USER, params);
  return res;
}

export async function setAuth(params: { auth: number; userId: string }) {
  const res = await post(API.SET_AUTH, params);
  return res;
}
