import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import Content from '@/components/Content';
import Header from '@/components/Header';
import MAlert from '@/components/Alert';
import MTabel from '@/components/MTabel';
import Footer from '@/components/Footer';
import { useLoginStatus } from '@/hooks';
import AuthModal from './AuthModal';
import { UserItemParams, ColumnsParams } from '@/typings/common';
import styles from './index.less';

const columns: ColumnsParams[] = [
  {
    title: '用户名',
    dataIndex: 'username',
    flex: 0.15,
  },
  {
    title: '职位',
    dataIndex: 'job',
    flex: 0.2,
    render: (text: string, item: UserItemParams) => {
      return <div className={styles.job}>{item.job}</div>;
    },
  },
  {
    title: '简介',
    dataIndex: 'introduce',
    flex: 0.35,
  },
  {
    title: '注册时间',
    dataIndex: 'registerTime',
    flex: 0.2,
  },
  {
    title: '操作',
    dataIndex: 'actions',
    flex: 0.1,
  },
];

const data: UserItemParams[] = [
  {
    id: '1',
    username: 'dnhyxc',
    job: '前端工程师',
    introduce: '简介',
    registerTime: '2022/09/02',
  },
  {
    id: '2',
    username: 'cxcx',
    job: '前端工程师1',
    introduce: '个人简介个人简介个人简介个人简介个人简介个人简介',
    registerTime: '2022/02/09 20:20:19',
  },
  {
    id: '3',
    username: 'zczc',
    job: '全栈工程师啊啊啊啊啊啊',
    introduce: '目之所及都是你',
    registerTime: '2022/02/09 20:20:19',
  },
];

const Account: React.FC = () => {
  const [visible, setVisible] = useState<boolean>(false);
  const [checkedList, setCheckedList] = useState<UserItemParams[]>([]);

  const { showAlert, toLogin, onCloseAlert } = useLoginStatus();

  // 设置权限
  const onSetAuth = (item: UserItemParams) => {
    console.log(item, 'onSetAuth>>>item');
    setVisible(true);
  };

  // 删除用户
  const onDeleteUser = (item: UserItemParams) => {
    Modal.confirm({
      title: '删除用户',
      content: '确定彻底删除当前用户吗？',
      onOk: () => onDeleteOneUser(item),
    });
  };

  const onDeleteOneUser = (item: UserItemParams) => {
    console.log(item, 'onDeleteUser>>>item');
  };

  // 渲染列表操作按钮
  const actions = (item: UserItemParams) => {
    return (
      <div>
        <Button
          type="link"
          className={styles.action}
          onClick={() => onSetAuth(item)}
        >
          权限
        </Button>
        <Button
          type="link"
          className={styles.action}
          onClick={() => onDeleteUser(item)}
        >
          删除
        </Button>
      </div>
    );
  };

  // 获取选中列表
  const getCheckedList = (list: UserItemParams[]) => {
    setCheckedList(list);
  };

  // 影藏弹窗
  const onCancel = () => {
    setVisible(false);
  };

  // 影藏弹窗
  const onOk = (value: number) => {
    console.log(value, 'value');
    setVisible(false);
  };

  // 批量删除
  const onDeleteAll = () => {
    console.log(checkedList, 'checkedList>>删除所有');
  };

  return (
    <div className={styles.AccountContainer}>
      {showAlert && <MAlert onClick={toLogin} onClose={onCloseAlert} />}
      <Header needLeft needMenu />
      <Content className={styles.contentWrap}>
        <div className={styles.content}>
          <MTabel
            dataSource={data}
            columns={columns}
            actions={actions}
            needCheckBox
            getCheckedList={getCheckedList}
          />
        </div>
      </Content>
      <Footer>
        <div className={styles.multibar}>
          <Button
            className={styles.multibarBtn}
            type="primary"
            ghost
            onClick={onDeleteAll}
          >
            批量删除
          </Button>
        </div>
      </Footer>
      {visible && (
        <AuthModal visible={visible} onCancel={onCancel} onOk={onOk} />
      )}
    </div>
  );
};

export default Account;
