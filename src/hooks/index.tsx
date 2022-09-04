import { useEffect, useRef, useState, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { message } from 'antd';
import useStore from '@/store';
// import * as Service from '@/service';
// import { normalizeResult } from '@/utils/tools';
import {
  ScrollEvent,
  useScrollLoadParams,
  // useDeleteArticleParams,
} from '@/typings/common';

// 有依赖的防抖函数
export const useDebounce = (fn: Function, delay: number, dep: any[]) => {
  const { current } = useRef<any>({ fn, timer: null });

  useEffect(() => {
    current.fn = fn;
  }, [fn]);

  return useCallback((...args: any[]) => {
    if (current.timer) {
      clearTimeout(current.timer);
    }
    current.timer = setTimeout(() => {
      current.fn(...args);
    }, delay);
  }, dep);
};

// 没有依赖的防抖函数
export const useNoDependDebounce = (fn: Function, delay: number) => {
  const refTimer = useRef<any>();

  return function f(...args: any) {
    if (refTimer.current) {
      clearTimeout(refTimer.current);
    }
    refTimer.current = setTimeout(() => {
      fn(args);
    }, delay);
  };
};

// 实时获取页面宽度的hooks
export const useHtmlWidth = () => {
  const [htmlWidth, setHtmlWidth] = useState<number>(window.innerWidth);

  useEffect(() => {
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('resize', onResize);
    };
  }, []);

  const onResize = useDebounce(() => {
    const width = window.innerWidth;
    setHtmlWidth(width);
  }, 100, []);

  return { htmlWidth };
};

export const useGetBodyWidth = () => {
  const [bodyWidth, setBodyWidth] = useState<number>(window.innerWidth);

  useEffect(() => {
    setBodyWidth(window.innerWidth);
  }, []);

  return { bodyWidth };
};

// 获取登录状态的hooks
export const useLoginStatus = () => {
  const [showAlert, setShowAlert] = useState<boolean>(false);

  const { commonStore } = useStore();
  const navigate = useNavigate();
  const { pathname, search } = useLocation();

  const onCloseAlert = () => {
    setShowAlert(false);
  };

  const setAlertStatus = (status: boolean) => {
    setShowAlert(status);
  };

  const toLogin = () => {
    commonStore.setAuth({ redirectUrl: `${pathname}${search}` });
    navigate('/login', { replace: true });
  };

  const setResult = (res: any, callback?: Function) => {
    if (res.success) {
      callback && callback();
    }
    if (!res.success && res.code === 409) {
      setAlertStatus(true);
    }
    if (!res.success && res.code !== 409) {
      message.error(res.message);
    }
  };

  return { showAlert, toLogin, onCloseAlert, setAlertStatus, setResult };
};

// 是否需要滚动到评论输入框位置hooks
export const useScroll = (needScroll: string | null) => {
  const [commentOffsetTop, setCommentOffsetTop] = useState<number>(0);

  const commentRef: any = useRef(null);

  useEffect(() => {
    if (commentRef && commentRef.current) {
      setCommentOffsetTop(commentRef.current.offsetTop);
    }
  }, [commentRef]);

  useEffect(() => {
    if (needScroll === '1') {
      document.documentElement.scrollTop = commentOffsetTop;
    }
  }, [commentOffsetTop, needScroll]);

  return { commentRef, commentOffsetTop };
};

// 滚动加载自定义hooks
export const useScrollLoad = ({
  data,
  loading,
  pageSize,
  scrollStyle, // 如果需要吸顶，组件必须设置ref=scrollRef，且必须传入scrollStyle参数
}: useScrollLoadParams<any>) => {
  const [pageNo, setPageNo] = useState<number>(1);
  const [suckTop, setSuckTop] = useState<boolean>(false);
  const [scrollTop, setScrollTop] = useState<number>(0);

  const scrollRef = useRef<any>(null);
  const scrollbarRef = useRef<any>(null);

  const addClassName = (scrollTop: number, scrollRef: any) => {
    if (!scrollStyle) return;
    if (scrollTop >= scrollRef?.current?.offsetTop) {
      setSuckTop(true);
      scrollRef?.current?.classList?.add(scrollStyle);
    } else {
      setSuckTop(false);
      scrollRef?.current?.classList?.remove(scrollStyle);
    }
  };

  // 滚动加载
  const onScroll = (event: ScrollEvent) => {
    const { scrollTop, scrollHeight, clientHeight } = event;
    // 元素吸顶控制器
    addClassName(scrollTop, scrollRef);
    setScrollTop(scrollTop);
    if (
      !loading &&
      data?.count === pageSize &&
      data?.list?.length < data?.total &&
      Math.round(scrollTop) + clientHeight + 1 >= scrollHeight
    ) {
      setPageNo(pageNo + 1);
    }
  };

  return {
    pageNo,
    setPageNo,
    onScroll,
    scrollRef,
    suckTop,
    scrollbarRef,
    scrollTop,
  };
};
