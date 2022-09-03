/*
 * @Description: 详情页
 * @Author: dnh
 * @Date: 2022-06-13 09:41:39
 * @LastEditors: dnh
 * @FilePath: \src\view\detail\index.tsx
 */
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Affix, BackTop, Spin, Button, message } from 'antd';
import classname from 'classname';
import { ArrowUpOutlined } from '@ant-design/icons';
import Preview from '@/components/Preview';
import Header from '@/components/Header';
import Image from '@/components/Image';
import { HEAD_UEL, CARD_URL } from '@/constant';
import Toc from '@/components/ArticleToc';
import { useHtmlWidth } from '@/hooks';
import { normalizeResult } from '@/utils/tools';
import useStore from '@/store';
import * as Service from '@/service';
import { formatGapTime } from '@/utils';
import Comments from '@/components/Comments';
import { ArticleDetailParams } from '@/typings/common';
import styles from './index.less';

const ArticleDetail: React.FC = () => {
  const [detail, setDetail] = useState<ArticleDetailParams>();
  const [loading, setLoading] = useState<boolean>(false);

  const { id } = useParams();
  const navigate = useNavigate();
  const {
    userInfoStore: { getUserInfo },
  } = useStore();
  const { htmlWidth } = useHtmlWidth();

  useEffect(() => {
    if (id) {
      getArticleDetail();
    }
  }, [id]);

  const getArticleDetail = async () => {
    setLoading(true);
    const res = normalizeResult<ArticleDetailParams>(
      await Service.getArticleDetail({ id: id! })
    );
    setLoading(false);
    if (res.success) {
      setDetail(res.data);
    } else {
      message.error(res.message);
    }
  };

  // 编辑文章
  const onEditArticle = () => {
    navigate(`/create?id=${id}`);
  };

  const renderCoverImg = (detail: ArticleDetailParams) => {
    return (
      <div className={styles.titleWrap}>
        <div className={styles.title}>{detail?.title}</div>
        <div className={styles.userInfo}>
          <Image
            url={detail?.headUrl || HEAD_UEL}
            transitionImg={HEAD_UEL}
            className={styles.herdImg}
          />
          <div className={styles.createInfo}>
            <div className={styles.username}>{detail?.authorName}</div>
            <div>
              <span>{formatGapTime(detail?.createTime)}</span>
              {getUserInfo?.userId === detail?.authorId && (
                <Button type="link" onClick={onEditArticle}>
                  编辑
                </Button>
              )}
            </div>
          </div>
        </div>
        {detail?.coverImage && (
          <Image
            url={detail?.coverImage || CARD_URL}
            transitionImg={CARD_URL}
            className={styles.image}
          />
        )}
        <p className={styles.desc}>{detail.abstract}</p>
      </div>
    );
  };

  return (
    <Spin
      spinning={loading}
      className={styles.spinWrap}
      tip="正在卖力加载中..."
    >
      <div
        className={classname(
          styles.detailContainer,
          detail?.content.includes('#') && styles.hanToc
        )}
      >
        <div className={styles.headerWrap}>
          <Header needLeft needMenu>
            <div className={styles.headerContent}>
              <div>文章详情</div>
            </div>
          </Header>
        </div>
        {detail && (
          <div className={styles.content}>
            <div className={styles.preview}>
              <Preview
                className={styles.previewContent}
                mackdown={detail.content}
                coverImg={renderCoverImg(detail)}
              >
                <div className={styles.tagWrap}>
                  <div className={styles.tagList}>
                    <span className={styles.label}>分类：</span>
                    <div className={styles.tagItemWrap}>
                      <span className={styles.tag}>{detail.classify}</span>
                    </div>
                  </div>
                  <div className={styles.tagList}>
                    <span className={styles.label}>标签：</span>
                    <div className={styles.tagItemWrap}>
                      <span className={styles.tag}>{detail.tag}</span>
                    </div>
                  </div>
                </div>
              </Preview>
              <div className={styles.commentList}>
                <Comments authorId={detail.authorId} />
              </div>
            </div>
            <div className={styles.rightBar}>
              <Affix offsetTop={50}>
                <Toc mackdown={detail.content} />
              </Affix>
            </div>
          </div>
        )}
      </div>
      {htmlWidth > 960 && (
        <BackTop className={styles.backTopWrap}>
          <div className={styles.backTop}>
            <ArrowUpOutlined className={styles.topIcon} />
          </div>
        </BackTop>
      )}
    </Spin>
  );
};

export default ArticleDetail;
