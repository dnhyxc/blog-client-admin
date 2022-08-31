/*
 * @Description: 布局组件
 * @Author: dnh
 * @Date: 2022-06-13 09:41:39
 * @LastEditors: dnh
 * @FilePath: \src\layout\index.tsx
 */
import { useEffect } from 'react';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import { Layout } from 'antd';
import { verify } from '@/service';
import useStore from '@/store';
import { normalizeResult } from '@/utils';
import styles from './index.less';

const { Content } = Layout;

const AppLayout = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { userInfoStore: { getUserInfo } } = useStore();

  useEffect(() => {
    const sliceName = pathname !== '/' ? pathname.slice(1) : pathname;
    // type 没有值说明不是setting，走正常的路由设置
    if (sliceName === '/') {
      navigate('article');
    }
  }, [pathname]);

  useEffect(() => {
    verifyToken();
  }, [getUserInfo?.userId]);

  // 校验token是否过期
  const verifyToken = async () => {
    const res = normalizeResult<number>(await verify());
    if (!res.success) {
      navigate('/login', {
        replace: true,
      });
    }
  };

  return (
    <div className={styles.container}>
      <Layout className={styles.layout}>
        <Content>
          <Outlet />
        </Content>
      </Layout>
    </div>
  );
};

export default AppLayout;
