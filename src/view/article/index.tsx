import React, { useState } from 'react';
import { Button } from 'antd';
import Content from '@/components/Content';
import Header from '@/components/Header';
import MAlert from '@/components/Alert';
import Card from '@/components/Card';
import Footer from '@/components/Footer';
import { useLoginStatus } from '@/hooks';
import { ArticleItem } from '@/typings/common';
import styles from './index.less';

const data = [
  {
    abstract: 'React + Koa 前后端分离项目部署',
    authorId: 'zczc',
    authorName: '54364559AC70E6C0216DFEBE25E7D97A',
    classify: '项目部署',
    createTime: 1660881221123,
    id: '62ff097d9d77bcda955a7cac',
    tag: '项目部署',
    title: '项目部署',
    coverImage: '',
  },
  {
    abstract: '前后端分离项目部署',
    authorId: '62f5f159a2bea42533787e81',
    authorName: 'cxcx',
    classify: '架构',
    createTime: 1660881221133,
    id: '62ff097d9d77bcda955a7caa',
    coverImage: '',
    tag: '项目部署1',
    title: '项目部署1',
  },
  {
    abstract: '前后端分离项目部署',
    authorId: '62f5f159a2bea42533787e82',
    authorName: 'dnhyxc',
    classify: '架构',
    createTime: 1660881221136,
    id: '62ff097d9d77bcda955a7cab',
    coverImage: '',
    tag: '项目部署2',
    title: '项目部署2',
  },
];

const Article: React.FC = () => {
  const [checkedList, setCheckedList] = useState<ArticleItem[]>([]);

  const { showAlert, toLogin, onCloseAlert } = useLoginStatus();

  const getCheckedlist = (checkedList: ArticleItem[]) => {
    setCheckedList(checkedList);
  };

  const onCheckAll = () => {
    if (checkedList.length < data.length) {
      setCheckedList(data);
    } else {
      setCheckedList([]);
    }
  };

  const onDeleteAll = () => {
    console.log(checkedList, 'checkedList');
  };

  const multibar = () => {
    return (
      <div className={styles.multibar}>
        <Button
          className={styles.multibarBtn}
          type="primary"
          onClick={() => onCheckAll()}
        >
          {checkedList.length && checkedList.length === data.length
            ? '取消全选'
            : '全选'}
        </Button>
        <Button className={styles.multibarBtn} type="primary" ghost onClick={onDeleteAll}>
          批量删除
        </Button>
      </div>
    );
  };

  return (
    <div className={styles.ArticleContainer}>
      {showAlert && <MAlert onClick={toLogin} onClose={onCloseAlert} />}
      <Header needLeft needMenu />
      <Content className={styles.contentWrap}>
        <div className={styles.content}>
          <Card
            list={data}
            // toDetail={toDetail}
            // deleteArticle={deleteArticle}
            showInfo
            checkedList={checkedList}
            getCheckedlist={getCheckedlist}
          />
        </div>
      </Content>
      <Footer>{multibar()}</Footer>
    </div>
  );
};

export default Article;
