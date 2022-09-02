import React from 'react';
import Content from '@/components/Content';
import Header from '@/components/Header';
import styles from './index.less';

const Create: React.FC = () => {
  return (
    <div className={styles.CreateContainer}>
      <Header needLeft needMenu />
      <Content className={styles.contentWrap}>
        <div className={styles.content}>Create</div>
      </Content>
    </div>
  );
};

export default Create;
