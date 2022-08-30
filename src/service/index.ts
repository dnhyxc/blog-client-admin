import { post } from '@/utils/request';
import { uploadFile } from './upload';
import * as API from './api';
import {
  register,
  login,
  updateInfo,
  getUserInfo,
  updatePassword,
  verify,
} from './user';

export async function getArticlelist() {
  const res = await post(API.ARTICLE_LIST);
  return res;
}

export {
  register,
  login,
  updateInfo,
  getUserInfo,
  uploadFile,
  updatePassword,
  verify,
};
