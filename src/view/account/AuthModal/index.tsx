import type { RadioChangeEvent } from 'antd';
import React, { useState } from 'react';
import { Modal, Radio, Space } from 'antd';
import styles from './index.less';

interface IProps {
  visible: boolean;
  onCancel: Function;
  onOk: Function;
}

const AuthModal: React.FC<IProps> = ({ visible, onCancel, onOk }) => {
  const [value, setValue] = useState<number>(1);

  const onChange = (e: RadioChangeEvent) => {
    setValue(e.target.value);
  };

  return (
    <Modal
      visible={visible}
      title="权限设置"
      width="60%"
      maskClosable={false}
      style={{ minWidth: '350px' }}
      onCancel={() => onCancel()}
      onOk={() => onOk(value)}
    >
      <div className={styles.AuthModal}>
        <Radio.Group onChange={onChange} value={value}>
          <Space direction="vertical">
            <Radio value={1}>
              设置为管理员（管理员可对所有文章进行上下架操作）
            </Radio>
            {/* <Radio value={2}>
              设置为超级管理员（超级管理员可对所有文章进行删除操作）
            </Radio> */}
          </Space>
        </Radio.Group>
      </div>
    </Modal>
  );
};

export default AuthModal;
