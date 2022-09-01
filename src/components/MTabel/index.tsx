/* eslint-disable no-unused-vars */
import { Checkbox } from 'antd';
import React, { ReactNode, useEffect, useState } from 'react';
import classname from 'classname';
import {
  UserItemParams,
  UserInfoParams,
  ColumnsParams,
} from '@/typings/common';
import styles from './index.less';

interface IProps {
  dataSource: UserInfoParams[];
  actions?: (item: UserInfoParams) => ReactNode;
  columns: ColumnsParams[];
  needCheckBox?: boolean;
  getCheckedList?: (list: any[]) => void;
}

const MTabel: React.FC<IProps> = ({
  dataSource = [],
  columns,
  actions,
  getCheckedList,
  needCheckBox,
}) => {
  const [dataKeys, setDataKeys] = useState<string[]>([]);
  const [flex, setFlex] = useState<(number | string)[]>([]);
  const [renders, setRenders] = useState<Function[]>([]);
  const [selectedList, setSelectList] = useState<UserInfoParams[]>([]);

  useEffect(() => {
    const dataIndexs: string[] = [];
    const flexs: (string | number)[] = [];
    const renders: any = [];
    if (columns?.length) {
      columns.forEach((i) => {
        dataIndexs.push(i.dataIndex);
        flexs.push(i.flex);
        renders.push(i.render);
      });
    }
    setDataKeys(dataIndexs);
    setFlex(flexs);
    setRenders(renders);
  }, [dataSource, columns]);

  useEffect(() => {
    getCheckedList && getCheckedList(selectedList);
  }, [selectedList]);

  // 选择中每行数据事件
  const onCheckedItem = (item: any) => {
    const findItem = selectedList.find((i) => i.id === item.id);
    if (findItem) {
      const list = selectedList.filter((i) => i.id !== findItem.id);
      setSelectList && setSelectList([...list]);
    } else {
      selectedList.push(item);
      setSelectList && setSelectList([...selectedList]);
    }
  };

  // 全选
  const onCheckedAll = () => {
    if (selectedList.length < dataSource.length) {
      setSelectList(dataSource);
    } else {
      setSelectList([]);
    }
  };

  // 判断是否选中
  const isChecked = (item: any) => {
    const findItem = selectedList.find((i) => i.id === item.id);
    if (findItem) {
      return true;
    }
    return false;
  };

  return (
    <div className={styles.MTabel}>
      <div className={classname(styles.bgcUserInfo, styles.userInfo)}>
        {columns.map((i, index) => {
          return (
            <div
              key={i.dataIndex}
              className={classname(styles[i.dataIndex], styles.needBorder)}
              style={{ flex: flex[index] }}
            >
              {index === 0 && needCheckBox && (
                <span className={styles.checkAll}>
                  <Checkbox
                    checked={
                      selectedList.length > 0 &&
                      selectedList.length === dataSource.length
                    }
                    indeterminate={
                      !(
                        selectedList.length > 0 &&
                        selectedList.length === dataSource.length
                      )
                    }
                    onChange={onCheckedAll}
                  />
                </span>
              )}
              {i.title}
            </div>
          );
        })}
      </div>
      {dataSource.map((i) => {
        return (
          <div className={styles.userInfo} key={i.id}>
            {dataKeys.map((j, count) => {
              return (
                <div
                  key={j}
                  className={classname(styles[j], styles.tabelItem)}
                  style={{
                    flex: flex[count],
                  }}
                >
                  {count === 0 && needCheckBox && (
                    <span className={styles.checkAll}>
                      <Checkbox
                        checked={isChecked(i)}
                        onChange={() => onCheckedItem(i)}
                      />
                    </span>
                  )}
                  {renders[count] ? (
                    <div className={styles.renderNode}>
                      {renders[count](i[j], i)}
                    </div>
                  ) : (
                    <span className={styles.text}>
                      {i[j] || (j !== 'actions' && '-')}
                    </span>
                  )}
                  {j === 'actions' && actions && actions(i)}
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default MTabel;
