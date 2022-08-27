import * as API from '@/service/api';
import ABOUTME from '@/assets/images/about_me.jpg';
import HEAD_UEL from '@/assets/images/header.jpg';
import CARD_URL from '@/assets/images/card.png';
import EMPTY_URL from '@/assets/images/empty.jpg';
import MAIN_COVER from '@/assets/images/mainCover.png';

export { ABOUTME, HEAD_UEL, CARD_URL, EMPTY_URL, MAIN_COVER };

// 每页数量
export const PAGESIZE = 20;

// 文件上传路径
export const UPLOADURL = '/api/upload';

export const FILETYPE = ['image/jpeg', 'image/png', 'image/jpg', 'image/gif'];

export const UPDATE_INFO_API_PATH = {
  1: API.UPDATE_INFO,
  2: API.UPDATE_PASSWORD,
};

export const ICONLINKS = [
  {
    name: 'icon-juejin',
    className: 'juejin',
    label: 'juejin',
    title: '掘金',
  },
  {
    name: 'icon-github-fill',
    className: 'adsIcon',
    label: 'github',
    title: 'github',
  },
  {
    name: 'icon-zhihu-circle-fill',
    className: 'adsIcon',
    label: 'zhihu',
    title: '知乎',
  },
  {
    name: 'icon-wangzhi',
    className: 'wangzhiIcon',
    label: 'blog',
    title: '其它',
  },
];

export const USER_MENU = [
  {
    key: '1',
    icon: 'icon-gerenzhongxin',
    text: '我的主页',
    path: '/personal',
  },
  {
    key: '2',
    icon: 'icon-shezhi3',
    text: '个人设置',
    path: '/setting/profile',
  },
  {
    key: '3',
    icon: 'icon-tuichu1',
    text: '退出登录',
    path: '/login',
  },
];

export const GATEWAY_HOST = '';
