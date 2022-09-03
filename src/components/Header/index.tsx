/*
 * @Description: 头部组件
 * @Author: dnh
 * @Date: 2022-06-13 09:41:39
 * @LastEditors: dnh
 * @FilePath: \src\components\Header\index.tsx
 */
import React, { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { LeftOutlined } from '@ant-design/icons';
import MIcons from '../Icons';
import Menu from './Menu';
import styles from './index.less';

interface IProps {
  children?: ReactNode;
  left?: ReactNode;
  right?: ReactNode;
  needLeft?: boolean;
  needMenu?: boolean;
}

const Header: React.FC<IProps> = ({
  children,
  left,
  right,
  needLeft = false,
  needMenu = false,
}) => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  const goArticle = () => {
    navigate('/article');
  };

  return (
    <div className={styles.herderWrap}>
      <div className={styles.left}>
        {needLeft &&
          (left || (
            <div className={styles.back} onClick={goBack}>
              <LeftOutlined />
            </div>
          ))}
        <MIcons name="icon-haidao_" className={styles.iconWrap} onClick={goArticle} />
        <div className={styles.child}>{children || '后台管理'}</div>
        {needMenu && <Menu />}
      </div>
      <div className={styles.right}>{right && <span>{right}</span>}</div>
    </div>
  );
};

export default Header;
