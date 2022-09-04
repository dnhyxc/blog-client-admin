import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { Button, message, Modal } from 'antd';
import Image from '@/components/Image';
import * as Service from '@/service';
import { normalizeResult } from '@/utils/tools';
import { formatGapTime } from '@/utils';
import { HEAD_UEL } from '@/constant';
import MIcons from '@/components/Icons';
import { useScroll } from '@/hooks';
import { CommentParams } from '@/typings/common';
import styles from './index.less';

interface IProps {
  authorId: string;
}

const Comments: React.FC<IProps> = ({ authorId }) => {
  const [viewMoreComments, setViewMoreComments] = useState<string[]>([]);
  const [comments, setComments] = useState<CommentParams[]>([]);

  const { id } = useParams();
  const [search] = useSearchParams();
  const needScroll: string | null = search.get('needScroll');
  const { commentRef } = useScroll(needScroll);
  const navigate = useNavigate();

  useEffect(() => {
    getCommentList();
  }, [id]);

  // 计算评论数
  const getCommentCount = (comments: CommentParams[]) => {
    let count = 0;
    comments.forEach((i) => {
      const length: number = i.replyList?.length || 0;
      count += length + 1;
    });
    return count;
  };

  // 获取评论列表
  const getCommentList = async () => {
    if (!id) return;
    const res = normalizeResult<CommentParams[]>(
      await Service.getCommentList({ id })
    );
    if (res.success) {
      setComments(res.data);
    } else {
      message.error(res.message);
    }
  };

  // 收集可以查看全部的commentId
  const onViewMoreReply = (commentId: string) => {
    setViewMoreComments([...viewMoreComments, commentId]);
  };

  // 判断viewMoreComments是否包含commentId，以此返回对应的replyList
  const checkReplyList = (replyList: CommentParams[], commentId: string) => {
    if (viewMoreComments.includes(commentId)) {
      return replyList;
    }
    return replyList.slice(0, 2);
  };

  // 删除评论
  const onDeleteComment = (comment: CommentParams, isThreeTier?: boolean) => {
    if (!id) return;
    const params = isThreeTier
      ? {
        commentId: comment.commentId!,
        fromCommentId: comment.commentId!,
        articleId: id,
      }
      : {
        commentId: comment.commentId!,
        articleId: id,
      };
    Modal.confirm(modalConfig(params));
  };

  const modalConfig = (params: {
    commentId: string;
    fromCommentId?: string;
    articleId: string
  }) => {
    return {
      title: '确定删除该评论吗？',
      async onOk() {
        deleteComment(params);
      },
    };
  };

  const deleteComment = async (params: {
    commentId: string;
    fromCommentId?: string;
    articleId: string
  }) => {
    const res = normalizeResult<number>(await Service.deleteComment(params));
    if (res.success) {
      getCommentList && getCommentList();
    } else {
      message.error(res.message);
    }
  };

  // 恢复前台删除的评论
  const onRestoreComment = async (comment: CommentParams, isThreeTier?: boolean) => {
    if (!id) return;
    const params = isThreeTier
      ? {
        commentId: comment.commentId!,
        fromCommentId: comment.commentId!,
        articleId: id,
      }
      : {
        commentId: comment.commentId!,
        articleId: id,
      };
    const res = normalizeResult<string>(await Service.restoreComment(params));
    if (res.success) {
      getCommentList && getCommentList();
    } else {
      message.error(res.message);
    }
  };

  const toPersonal = (userId: string) => {
    navigate(`/personal?id=${userId}`);
  };

  return (
    <div className={styles.Comments} ref={commentRef}>
      {comments?.length > 0 && (
        <div className={styles.title}>
          全部评论
          <span className={styles.replyCount}>{getCommentCount(comments)}</span>
        </div>
      )}
      {comments?.length > 0 &&
        comments.map((i) => {
          return (
            <div className={styles.commentWrap} key={i.commentId}>
              <div className={styles.avatar}>
                <Image
                  url={i.headUrl || HEAD_UEL}
                  transitionImg={HEAD_UEL}
                  className={styles.image}
                  onClick={() => toPersonal(i.userId)}
                />
              </div>
              <div className={styles.commentContent}>
                <div className={styles.commentMain}>
                  <div className={styles.userInfo}>
                    <span className={styles.name}>{i.username}</span>
                    <div className={styles.date}>
                      {formatGapTime(i.date)}
                      {i?.isDelete && (
                        <span>
                          <Button
                            type="link"
                            className={styles.deleteComment}
                            onClick={() => onRestoreComment(i)}
                          >
                            恢复评论
                          </Button>
                        </span>
                      )}
                      <Button
                        type="link"
                        className={styles.deleteComment}
                        onClick={() => onDeleteComment(i)}
                      >
                        删除
                      </Button>
                    </div>
                  </div>
                  <div className={styles.desc}>{i.content}</div>
                </div>
                {i.replyList && i.replyList.length > 0 && (
                  <div className={styles.commentChild}>
                    {checkReplyList(i.replyList, i.commentId!).map((j) => {
                      return (
                        <div
                          className={styles.commentChildItem}
                          key={j.commentId}
                        >
                          <div className={styles.avatar}>
                            <Image
                              url={j.headUrl || HEAD_UEL}
                              transitionImg={HEAD_UEL}
                              className={styles.image}
                              onClick={() => toPersonal(j.userId)}
                            />
                          </div>
                          <div className={styles.commentChildItemContent}>
                            <div className={styles.userInfo}>
                              <span className={styles.name}>
                                <span>{j.username}</span>
                                {j.userId === authorId && (
                                  <span className={styles.isAuthor}>
                                    (作者)
                                  </span>
                                )}
                                {j.fromUsername && (
                                  <span className={styles.replyInfo}>
                                    回复
                                    <span className={styles.fromUsername}>
                                      {j.fromUsername}
                                    </span>
                                  </span>
                                )}
                              </span>
                              <div className={styles.date}>
                                {formatGapTime(j.date)}
                                {j?.isDelete && (
                                  <span>
                                    <Button
                                      type="link"
                                      className={styles.deleteComment}
                                      onClick={() => onRestoreComment(j, true)}
                                    >
                                      恢复评论
                                    </Button>
                                  </span>
                                )}
                                <Button
                                  type="link"
                                  className={styles.deleteComment}
                                  onClick={() => onDeleteComment(j, true)}
                                >
                                  删除
                                </Button>
                              </div>
                            </div>
                            {j.content && (
                              <div className={styles.desc}>{j.content}</div>
                            )}
                            {j.formContent && (
                              <div className={styles.formContent}>
                                {`“${j.formContent}”`}
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                    {checkReplyList(i.replyList, i.commentId!).length !==
                      i.replyList.length && (
                        <div
                          className={styles.viewMore}
                          onClick={() => onViewMoreReply(i.commentId!)}
                        >
                          <span className={styles.viewText}>
                            查看更多（{i.replyList && i.replyList.length - 2}
                            条）回复
                          </span>
                          <MIcons
                            name="icon-xiajiantou"
                            onClick={() => onViewMoreReply(i.commentId!)}
                          />
                        </div>
                      )}
                  </div>
                )}
              </div>
            </div>
          );
        })}
    </div>
  );
};
export default Comments;
