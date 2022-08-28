import React from 'react';
import { Skeleton, Checkbox } from 'antd';
// import { EllipsisOutlined } from '@ant-design/icons';
import classname from 'classname';
import { formatGapTime } from '@/utils';
// import useStore from '@/store';
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
  toDetail?: Function;
  getCheckedlist?: Function;
  // deleteArticle?: Function;
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
  // deleteArticle,
  // onEditArticle,
}) => {
  // const {
  //   userInfoStore: { getUserInfo },
  // } = useStore();
  const { htmlWidth } = useHtmlWidth();

  // const content = (item: ArticleItem) => {
  //   return (
  //     <>
  //       <div
  //         onClick={(e) => onEdit(e, item)}
  //         className={classname(styles.edit, styles.btn)}
  //       >
  //         编辑
  //       </div>
  //       <div onClick={(e) => onDelete(e, item)} className={styles.btn}>
  //         删除
  //       </div>
  //     </>
  //   );
  // };

  // const onEdit = (e: any, item: ArticleItem) => {
  //   e.stopPropagation();
  //   onEditArticle && onEditArticle(item.id);
  // };

  // const onDelete = (e: any, item: ArticleItem) => {
  //   e.stopPropagation();
  //   deleteArticle && deleteArticle(item.id);
  // };

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
                <span>{i.title}</span>
                <Checkbox
                  checked={isChecked(i)}
                  onChange={() => onSelectItem(i)}
                />
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
              {/* <div className={styles.action}>
                {getUserInfo?.userId === i.authorId && (
                  <Popover
                    placement="left"
                    content={() => content(i)}
                    trigger="hover"
                    zIndex={12}
                  >
                    <EllipsisOutlined
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                    />
                  </Popover>
                )}
              </div> */}
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
