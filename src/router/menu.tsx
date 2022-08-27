import {
  HomeOutlined,
  FolderOpenOutlined,
  FieldTimeOutlined,
} from '@ant-design/icons';
import styles from './index.less';

const menuList = [
  {
    key: 'article',
    icon: <HomeOutlined className={styles.menu_icon} />,
    label: '文章管理',
    name: '文章管理',
    path: '/article',
  },
  {
    key: 'account',
    icon: <FolderOpenOutlined className={styles.menu_icon} />,
    label: '用户管理',
    name: '用户管理',
    path: '/account',
  },
  {
    key: 'create',
    icon: <FieldTimeOutlined className={styles.menu_icon} />,
    label: '发布文章',
    name: '发布文章',
    path: '/create',
  },
];

export { menuList };
