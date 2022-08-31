import React, { useEffect, useState, useRef } from 'react';
import { Button, Modal, message } from 'antd';
import Content from '@/components/Content';
import Header from '@/components/Header';
import MAlert from '@/components/Alert';
import MTabel from '@/components/MTabel';
import Footer from '@/components/Footer';
import { useLoginStatus, useScrollLoad } from '@/hooks';
import useStore from '@/store';
import { normalizeResult } from '@/utils';
import * as Service from '@/service';
import { PAGESIZE } from '@/constant';
import AuthModal from './AuthModal';
import { UserItemParams, ColumnsParams, UserInfoParams, UserListResponst } from '@/typings/common';
import styles from './index.less';

const columns: ColumnsParams[] = [
  {
    title: '用户名',
    dataIndex: 'username',
    flex: 0.15,
    render: (text: string, item: UserItemParams) => {
      return <div className={styles.job}>{item.username}</div>;
    },
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

// const data: UserItemParams[] = [
//   {
//     id: '1',
//     username: 'dnhyxc',
//     job: '前端工程师',
//     introduce: '简介',
//     registerTime: '2022/09/02',
//   },
//   {
//     id: '2',
//     username: 'cxcx',
//     job: '前端工程师1',
//     introduce: '个人简介个人简介个人简介个人简介个人简介个人简介',
//     registerTime: '2022/02/09 20:20:19',
//   },
//   {
//     id: '3',
//     username: 'zczc',
//     job: '全栈工程师啊啊啊啊啊啊',
//     introduce: '目之所及都是你',
//     registerTime: '2022/02/09 20:20:19',
//   },
// ];

const Account: React.FC = () => {
  const [visible, setVisible] = useState<boolean>(false);
  const [checkedList, setCheckedList] = useState<UserItemParams[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [userList, setUserList] = useState<UserListResponst>({ list: [], total: 0, count: 0 });

  const listRef = useRef<UserInfoParams[]>([]);
  const { showAlert, toLogin, onCloseAlert } = useLoginStatus();
  const { userInfoStore: { getUserInfo } } = useStore();
  const { pageNo, onScroll } = useScrollLoad({
    data: userList,
    loading,
    pageSize: PAGESIZE,
  });

  useEffect(() => {
    getUserList();
  }, [pageNo]);

  // 获取用户列表
  const getUserList = async () => {
    setLoading(true);
    const res = normalizeResult<UserListResponst>(await Service.getUserList({
      pageNo,
      pageSize: PAGESIZE,
      userId: getUserInfo?.userId
    }));
    setLoading(false);
    if (res.success) {
      const { total, list } = res.data;
      // 使用ref暂存list，防止滚动加载时，list添加错乱问题
      listRef.current = [...listRef.current, ...list];
      setUserList({
        list: listRef.current,
        total,
        count: list.length,
      });
    } else {
      message.error(res.message);
    }
  };

  console.log(userList, 'userList');

  // 设置权限
  const onSetAuth = (item: UserInfoParams) => {
    console.log(item, 'onSetAuth>>>item');
    setVisible(true);
  };

  // 删除用户
  const onDeleteUser = (item: UserInfoParams) => {
    Modal.confirm({
      title: '删除用户',
      content: '确定彻底删除当前用户吗？',
      onOk: () => onDeleteOneUser(item),
    });
  };

  const onDeleteOneUser = (item: UserInfoParams) => {
    console.log(item, 'onDeleteUser>>>item');
  };

  // 渲染列表操作按钮
  const actions = (item: UserInfoParams) => {
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
      <Content className={styles.contentWrap} onScroll={onScroll}>
        <div className={styles.content}>
          <MTabel
            dataSource={userList.list}
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
            disabled={!checkedList.length}
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
