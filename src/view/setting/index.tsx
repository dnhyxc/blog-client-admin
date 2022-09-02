import React from 'react';
import Content from '@/components/Content';
import Header from '@/components/Header';
import styles from './index.less';

const Setting: React.FC = () => {
  return (
    <div className={styles.SettingContainer}>
      <Header needLeft needMenu />
      <Content className={styles.contentWrap}>
        <div className={styles.content}>Setting</div>
      </Content>
    </div>
  );
};

export default Setting;
