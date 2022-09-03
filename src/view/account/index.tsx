import React, { useEffect, useState, useRef } from 'react';
import { Button, Modal, message } from 'antd';
import Content from '@/components/Content';
import Header from '@/components/Header';
import MTabel from '@/components/MTabel';
import Footer from '@/components/Footer';
import { useScrollLoad } from '@/hooks';
import useStore from '@/store';
import { normalizeResult, formatDate } from '@/utils';
import * as Service from '@/service';
import { PAGESIZE } from '@/constant';
import AuthModal from './AuthModal';
import {
  UserItemParams,
  ColumnsParams,
  UserInfoParams,
  UserListResponst,
} from '@/typings/common';
import styles from './index.less';

const Account: React.FC = () => {
  const [visible, setVisible] = useState<boolean>(false);
  const [selectUser, setSelectUser] = useState<UserInfoParams>();
  const [checkedList, setCheckedList] = useState<UserItemParams[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [userList, setUserList] = useState<UserListResponst>({
    list: [],
    total: 0,
    count: 0,
  });

  const listRef = useRef<UserInfoParams[]>([]);
  const {
    userInfoStore: { getUserInfo },
  } = useStore();
  const { pageNo, onScroll } = useScrollLoad({
    data: userList,
    loading,
    pageSize: PAGESIZE,
  });

  useEffect(() => {
    getUserList();
  }, [pageNo]);

  // 设置权限
  const onSetAuth = (item: UserInfoParams) => {
    setSelectUser(item);
    setVisible(true);
  };

  // 影藏弹窗
  const onCancel = () => {
    setVisible(false);
  };

  // 影藏弹窗
  const onOk = async (value: number) => {
    if (!selectUser) return;
    const res = normalizeResult<number>(
      await Service.setAuth({
        auth: value,
        userId: selectUser?.id,
      })
    );
    setVisible(false);
    if (res.success) {
      message.success(res.message);
    } else {
      message.error(res.message);
    }
  };

  // 获取用户列表
  const getUserList = async () => {
    setLoading(true);
    const res = normalizeResult<UserListResponst>(
      await Service.getUserList({
        pageNo,
        pageSize: PAGESIZE,
        userId: getUserInfo?.userId,
      })
    );
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

  // 删除接口
  const deleteMethed = async (userIds: string[]) => {
    const res = normalizeResult<number>(
      await Service.batchDeleteUser({ userIds })
    );
    if (res.success) {
      const list = userList.list.filter((i) => !userIds.includes(i.id));
      setUserList({
        list,
        total: userList.total - userIds.length,
        count: userList.count,
      });
      message.success(res.message);
    } else {
      message.error(res.message);
    }
  };

  // 删除用户
  const onDeleteUser = (item: UserInfoParams) => {
    const userId = [item.id];
    Modal.confirm({
      title: '删除用户',
      content: '确定彻底删除当前用户吗？',
      onOk: () => deleteMethed(userId),
    });
  };

  // 获取选中列表
  const getCheckedList = (list: UserItemParams[]) => {
    setCheckedList(list);
  };

  // 批量删除
  const onDeleteAll = async () => {
    const userIds = checkedList.map((i) => i.id);
    Modal.confirm({
      title: '批量删除用户',
      content: '确定彻底删除当前所选用户吗？',
      onOk: () => deleteMethed(userIds),
    });
  };

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
      render: (text: string) => {
        return <div className={styles.job}>{text || '-'}</div>;
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
      render: (text: number) => {
        return <div className={styles.job}>{formatDate(text) || '-'}</div>;
      },
    },
    {
      title: '操作',
      dataIndex: 'actions',
      flex: 0.1,
    },
  ];

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

  return (
    <div className={styles.AccountContainer}>
      <Header needMenu />
      <Content containerClassName={styles.containerClassName} onScroll={onScroll}>
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
