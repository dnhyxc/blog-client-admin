// 上传文件
const UPLOAD = '/admin/upload';

// 用户注册
const REGISTER = '/admin/register';
// 用户登录
const LOGIN = '/admin/login';
// 更新用户信息
const UPDATE_INFO = '/admin/updateInfo';
// 获取用户信息
const GET_USER_INFO = '/admin/getUserInfo';
// 更改密码
const UPDATE_PASSWORD = '/admin/updatePassword';

// 校验token是否过期
const VERIFY = '/admin/verify';

// 获取文章列表
const ARTICLE_LIST = '/admin/articleList';

// 获取用户列表
const GET_USER_LIST = '/admin/getUserList';
// 获取用户列表
const BATCH_DELETE_USER = '/admin/batchDeleteUser';
// 设置用户权限
const SET_AUTH = '/admin/setAuth';

export {
  REGISTER,
  LOGIN,
  UPDATE_INFO,
  GET_USER_INFO,
  UPDATE_PASSWORD,
  UPLOAD,
  VERIFY,
  ARTICLE_LIST,
  GET_USER_LIST,
  BATCH_DELETE_USER,
  SET_AUTH,
};
