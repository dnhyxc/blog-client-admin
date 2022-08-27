import React from 'react';
import Content from '@/components/Content';
import Header from '@/components/Header';
import MAlert from '@/components/Alert';
import { useLoginStatus } from '@/hooks';
import styles from './index.less';

const Setting: React.FC = () => {
  const { showAlert, toLogin, onCloseAlert } = useLoginStatus();
  return (
    <div className={styles.SettingContainer}>
      {showAlert && <MAlert onClick={toLogin} onClose={onCloseAlert} />}
      <Header needLeft needMenu />
      <Content className={styles.contentWrap}>
        <div className={styles.content}>Setting</div>
      </Content>
    </div>
  );
};

export default Setting;
