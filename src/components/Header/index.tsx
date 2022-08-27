/*
 * @Description: 头部组件
 * @Author: dnh
 * @Date: 2022-06-13 09:41:39
 * @LastEditors: dnh
 * @FilePath: \src\components\Header\index.tsx
 */
import React, { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
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
  needLeft = true,
  needMenu = false,
}) => {
  const navigate = useNavigate();

  const goArticle = () => {
    navigate('/article');
  };

  return (
    <div className={styles.herderWrap}>
      <div className={styles.left}>
        {needLeft &&
          (left || (
            <div className={styles.back}>
              <MIcons
                name="icon-haidao_"
                className={styles.iconWrap}
                onClick={goArticle}
              />
            </div>
          ))}
        <div className={styles.child}>{children || '博客管理'}</div>
        {needMenu && <Menu />}
      </div>
      <div className={styles.right}>{right && <span>{right}</span>}</div>
    </div>
  );
};

export default Header;
