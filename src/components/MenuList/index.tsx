/*
 * @Description: 菜单组件
 * @Author: dnh
 * @Date: 2022-06-13 09:41:39
 * @LastEditors: dnh
 * @FilePath: \src\components\MenuList\index.tsx
 */
import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Menu, Layout } from 'antd';
import classname from 'classname';
// import useStore from '@/store';
import { menuList } from '@/router/menu';
import styles from './index.less';

const { Sider } = Layout;

interface IProps {
  width?: number;
}

const MenuList: React.FC<IProps> = ({ width = 180 }) => {
  const [selectMenu, setSelectMenu] = useState<string>('');
  const navigate = useNavigate();
  const { pathname } = useLocation();
  // const {
  //   userInfoStore: {
  //     getUserInfo: { userId },
  //   },
  // } = useStore();

  useEffect(() => {
    const sliceName = pathname !== '/' ? pathname.slice(1) : pathname;
    // type 没有值说明不是setting，走正常的路由设置
    if (sliceName === '/') {
      setSelectMenu('article');
      navigate('article');
    } else {
      const index = sliceName.indexOf('/', 1);
      if (index > -1) {
        const path = sliceName.slice(0, index);
        setSelectMenu(path);
      } else {
        setSelectMenu(sliceName);
      }
    }
    return () => {
      // console.log(pathname, '后置路由守卫');
    };
  }, [pathname]);

  // 设置路由守卫
  // useEffect(() => {
  //   if (
  //     !userId &&
  //     (pathname === '/article' ||
  //       pathname === '/auth' ||
  //       pathname === '/create' ||
  //       pathname === '/setting')
  //   ) {
  //     navigate('login');
  //   }
  // }, [pathname, userId]);

  const onSelectMenu = (value: { key: string }) => {
    setSelectMenu(value.key);
    navigate(value.key);
  };

  return (
    <Sider
      theme="light"
      trigger={null}
      collapsible
      width={width}
      className={classname(styles.siderWrap)}
    >
      <div className={styles.logo}>
        <span>博客管理</span>
      </div>
      <Menu
        mode="inline"
        defaultSelectedKeys={['article']}
        selectedKeys={[selectMenu]}
        items={menuList}
        onClick={(e) => onSelectMenu(e)}
      />
    </Sider>
  );
};

export default MenuList;
