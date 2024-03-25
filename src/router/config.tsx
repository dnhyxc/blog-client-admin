/*
 * @Description: 路由配置
 * @Author: dnh
 * @Date: 2022-06-13 09:41:39
 * @LastEditors: dnh
 * @FilePath: \src\router\config.tsx
 */
import { lazy, Suspense, ReactNode } from 'react';
import { Navigate, RouteObject } from 'react-router-dom';
import { Spin } from 'antd';
import AppLayout from '@/layout';
import styles from './index.less';

const Login = lazy(() => import('@/view/login'));
const Setting = lazy(() => import('@/view/setting'));
const Article = lazy(() => import('@/view/article'));
const Detail = lazy(() => import('@/view/detail'));
const Account = lazy(() => import('@/view/account'));
const Users = lazy(() => import('@/view/users'));
const Create = lazy(() => import('@/view/create'));

const lazyLoad = (children: ReactNode, needSpin = true): ReactNode => {
  return (
    <Suspense
      fallback={
        needSpin ? (
          <Spin className={styles.loading} tip="正在卖力加载中..." />
        ) : null
      }
    >
      {children}
    </Suspense>
  );
};

const children = [
  {
    path: 'article',
    element: lazyLoad(<Article />),
  },
  {
    path: 'account',
    element: lazyLoad(<Account />),
  },
  {
    path: 'create',
    element: lazyLoad(<Create />),
  },
  {
    path: 'users',
    element: lazyLoad(<Users />),
  },
];

const routes: RouteObject[] = [
  {
    path: '/',
    element: <AppLayout />, // 指定路由渲染容器
    children,
  },
  {
    path: 'detail/:id',
    element: lazyLoad(<Detail />),
  },
  {
    path: 'setting',
    element: lazyLoad(<Setting />),
  },
  {
    path: 'login',
    element: lazyLoad(<Login />),
  },
  {
    path: '*',
    element: <Navigate to="/" />, // 路由重定向
  },
];

export default routes;
