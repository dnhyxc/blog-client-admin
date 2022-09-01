import React, { useEffect, useState, useRef } from 'react';
import { Button, message } from 'antd';
import Content from '@/components/Content';
import Header from '@/components/Header';
import MAlert from '@/components/Alert';
import Card from '@/components/Card';
import Footer from '@/components/Footer';
import { useLoginStatus, useScrollLoad } from '@/hooks';
import * as Service from '@/service';
import { PAGESIZE } from '@/constant';
import { normalizeResult } from '@/utils';
import { ArticleItem, ArticleListResult } from '@/typings/common';
import styles from './index.less';

const Article: React.FC = () => {
  const [checkedList, setCheckedList] = useState<ArticleItem[]>([]);
  const [articleList, setArticleList] = useState<ArticleListResult>({
    list: [],
    total: 0,
    count: 0,
  });
  const [loading, setLoading] = useState<boolean>(false);

  const listRef = useRef<ArticleItem[]>([]);
  const { pageNo, onScroll } = useScrollLoad({
    data: articleList,
    loading,
    pageSize: PAGESIZE,
  });

  const { showAlert, toLogin, onCloseAlert } = useLoginStatus();

  useEffect(() => {
    getArticleList();
  }, [pageNo]);

  // 获取文章列表
  const getArticleList = async () => {
    setLoading(true);
    const res = normalizeResult<ArticleListResult>(
      await Service.getArticleList({
        pageNo,
        pageSize: PAGESIZE,
      })
    );
    setLoading(false);
    if (res.success) {
      const { total, list } = res.data;
      // 使用ref暂存list，防止滚动加载时，list添加错乱问题
      listRef.current = [...listRef.current, ...list];
      setArticleList({
        list: listRef.current,
        total,
        count: list.length,
      });
    } else {
      message.error(res.message);
    }
  };

  // 删除接口
  const batchDelArticle = async (articleIds: string[]) => {
    const res = normalizeResult<number>(
      await Service.batchDelArticle({ articleIds })
    );
    if (res.success) {
      const list = articleList.list.filter((i) => !articleIds.includes(i.id));
      setArticleList({
        list,
        total: articleList.total - articleIds.length,
        count: articleList.count,
      });
      message.success(res.message);
    } else {
      message.error(res.message);
    }
  };

  const getCheckedlist = (checkedList: ArticleItem[]) => {
    setCheckedList(checkedList);
  };

  const onCheckAll = () => {
    if (checkedList.length < articleList.list.length) {
      setCheckedList(articleList.list);
    } else {
      setCheckedList([]);
    }
  };

  // 批量删除
  const onDeleteAll = () => {
    const articleIds = checkedList.map((i) => i.id);
    batchDelArticle(articleIds);
  };

  // 单个删除
  const deleteArticle = (id: string) => {
    batchDelArticle([id]);
  };

  const multibar = () => {
    return (
      <div className={styles.multibar}>
        <Button
          className={styles.multibarBtn}
          type="primary"
          onClick={() => onCheckAll()}
        >
          {checkedList.length && checkedList.length === articleList.list.length
            ? '取消全选'
            : '全选'}
        </Button>
        <Button
          disabled={!checkedList.length}
          className={styles.multibarBtn}
          type="primary"
          ghost
          onClick={onDeleteAll}
        >
          批量删除
        </Button>
      </div>
    );
  };

  return (
    <div className={styles.ArticleContainer}>
      {showAlert && <MAlert onClick={toLogin} onClose={onCloseAlert} />}
      <Header needLeft needMenu />
      <Content className={styles.contentWrap} onScroll={onScroll}>
        <div className={styles.content}>
          <Card
            list={articleList.list}
            // toDetail={toDetail}
            deleteArticle={deleteArticle}
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
