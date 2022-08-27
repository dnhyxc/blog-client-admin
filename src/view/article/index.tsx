import React from 'react';
import Content from '@/components/Content';
import Header from '@/components/Header';
import MAlert from '@/components/Alert';
import Card from '@/components/Card';
import { useLoginStatus } from '@/hooks';
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
];

const Article: React.FC = () => {
  const { showAlert, toLogin, onCloseAlert } = useLoginStatus();

  console.log(showAlert, 'showAlert');

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
          />
        </div>
      </Content>
    </div>
  );
};

export default Article;
