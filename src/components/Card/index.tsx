/* eslint-disable no-unused-vars */
import React from 'react';
import { Skeleton, Checkbox, Button } from 'antd';
import classname from 'classname';
import { formatGapTime } from '@/utils';
import { useHtmlWidth } from '@/hooks';
import Image from '@/components/Image';
import { CARD_URL } from '@/constant';
import { ArticleItem } from '@/typings/common';
import styles from './index.less';

interface IProps {
  list: ArticleItem[];
  cardImgWrapStyle?: string;
  skeletonRows?: number;
  skeletonAvatar?: string;
  showInfo?: boolean;
  loadText?: string;
  loading?: boolean;
  checkedList?: ArticleItem[];
  toDetail?: (id: string, needScroll?: boolean) => void;
  getCheckedlist?: Function;
  deleteArticle?: (id: string) => void;
  onShelvesArticle?: (id: string) => void;
  // onEditArticle?: Function;
}

const Card: React.FC<IProps> = ({
  list,
  toDetail,
  cardImgWrapStyle,
  skeletonRows = 3,
  skeletonAvatar,
  showInfo,
  loadText,
  loading,
  checkedList = [],
  getCheckedlist,
  deleteArticle,
  onShelvesArticle,
  // onEditArticle,
}) => {
  const { htmlWidth } = useHtmlWidth();

  const onShelves = (e: any, item: ArticleItem) => {
    e.stopPropagation();
    onShelvesArticle && onShelvesArticle(item.id);
  };

  const onDelete = (e: any, item: ArticleItem) => {
    e.stopPropagation();
    deleteArticle && deleteArticle(item.id);
  };

  const onSelectItem = (item: ArticleItem) => {
    const findItem = checkedList.find((i) => i.id === item.id);
    if (findItem) {
      const list = checkedList.filter((i) => i.id !== findItem.id);
      getCheckedlist && getCheckedlist([...list]);
    } else {
      checkedList.push(item);
      getCheckedlist && getCheckedlist([...checkedList]);
    }
  };

  const isChecked = (item: ArticleItem) => {
    const findItem = checkedList.find((i) => i.id === item.id);
    if (findItem) {
      return true;
    }
    return false;
  };

  return (
    <div className={classname(styles.wrap)}>
      {list && list.length > 0 ? (
        list.map((i) => (
          <div
            className={classname(styles.item)}
            key={i.id}
            onClick={() => toDetail && toDetail(i.id)}
          >
            {htmlWidth > 960 && (
              <div className={classname(styles.imgWrap)}>
                <div className={styles.text}>{i.title}</div>
                <div
                  className={classname(styles.cardImgWrap, cardImgWrapStyle)}
                >
                  <Image
                    url={i.coverImage || CARD_URL}
                    transitionImg={CARD_URL}
                    className={classname(styles.image)}
                    imageScaleStyle={styles.imageScaleStyle}
                  />
                </div>
              </div>
            )}
            <div className={styles.info}>
              <div className={styles.name}>
                <div className={styles.checkAction}>
                  <Checkbox
                    checked={isChecked(i)}
                    onClick={(e) => e.stopPropagation()}
                    onChange={() => onSelectItem(i)}
                    indeterminate={!isChecked(i)}
                  />
                  <span className={styles.title}>{i.title}</span>
                </div>
                <div>
                  {i.isDelete && (
                    <Button
                      type="link"
                      className={styles.deleteBtn}
                      onClick={(e) => onShelves(e, i)}
                    >
                      重新上架
                    </Button>
                  )}
                  <Button
                    type="link"
                    className={styles.deleteBtn}
                    onClick={(e) => onDelete(e, i)}
                  >
                    删除
                  </Button>
                </div>
              </div>
              {htmlWidth > 960 && (
                <div className={styles.desc}>{i.abstract}</div>
              )}
              {htmlWidth <= 960 && (
                <div className={styles.mobileDesc}>
                  <div className={styles.desc}>{i.abstract}</div>
                  <div className={styles.mobileImgWrap}>
                    <Image
                      url={i.coverImage || CARD_URL}
                      transitionImg={CARD_URL}
                      className={classname(styles.image)}
                      imageScaleStyle={styles.imageScaleStyle}
                    />
                  </div>
                </div>
              )}
              {htmlWidth > 960 && (
                <div className={styles.classifyInfo}>
                  <span>{i?.authorName}</span>
                  <span className={styles.classify}>
                    标签：
                    {i.tag}
                  </span>
                  <span>
                    分类：
                    {i.classify}
                  </span>
                  <span className={styles.date}>
                    {formatGapTime(i.createTime)}
                  </span>
                </div>
              )}
            </div>
          </div>
        ))
      ) : (
        <div className={classname(styles.item, styles.skeletonWrap)}>
          <Skeleton.Image
            className={classname(styles.skeletonAvatar, skeletonAvatar)}
          />
          <Skeleton active title paragraph={{ rows: skeletonRows }} />
        </div>
      )}
      {showInfo &&
        (!loading ? (
          <div className={styles.noMore}>
            {list.length > 0
              ? `共(${list.length})
          篇，${loadText || '已是全部家当'}～～～`
              : `共(${list.length})
            篇，空空如也～～～`}
          </div>
        ) : (
          <div className={styles.noMore}>loading...</div>
        ))}
    </div>
  );
};

export default Card;
