import React from 'react';
import Content from '@/components/Content';
import Header from '@/components/Header';
import MAlert from '@/components/Alert';
import { useLoginStatus } from '@/hooks';
import styles from './index.less';

const Create: React.FC = () => {
  const { showAlert, toLogin, onCloseAlert } = useLoginStatus();
  return (
    <div className={styles.CreateContainer}>
      {showAlert && <MAlert onClick={toLogin} onClose={onCloseAlert} />}
      <Header needLeft needMenu />
      <Content className={styles.contentWrap}>
        <div className={styles.content}>Create</div>
      </Content>
    </div>
  );
};

export default Create;
