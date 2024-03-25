import React from 'react';
import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import styles from './index.less';

interface DataType {
  key: React.Key;
  name: string;
  age: number;
  address: string;
}

interface ColumnType {
  title: string;
  key: string;
  dataIndex?: string;
  width?: number | string;
  fixed?: string;
  render?: () => void;
}

const NormalTable: React.FC = () => {
  const columns: ColumnType[] | ColumnType[][] = [
    {
      title: 'Full Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Column 1',
      dataIndex: 'address',
      key: '1',
    },
    {
      title: 'Column 2',
      dataIndex: 'address',
      key: '2',
    },
    {
      title: 'Column 3',
      dataIndex: 'address',
      key: '3',
    },
    {
      title: 'Column 4',
      dataIndex: 'address',
      key: '4',
    },
    {
      title: 'Column 5',
      dataIndex: 'address',
      key: '5',
    },
    {
      title: 'Column 6',
      dataIndex: 'address',
      key: '6',
    },
    {
      title: 'Column 7',
      dataIndex: 'address',
      key: '7',
    },
    {
      title: 'Column 8',
      dataIndex: 'address',
      key: '8',
      width: 200,
      fixed: 'right',
    },
  ];

  const dataSource: DataType[] = [];
  for (let i = 0; i < 5; i++) {
    dataSource.push({
      key: i,
      name: `Name ${i}`,
      age: 18,
      address: `Column no. ${i}`,
    });
  }
  return (
    <div className={styles.NormalTable}>
      <Table
        columns={columns as ColumnsType<DataType>}
        dataSource={dataSource}
        pagination={false}
        scroll={{ x: 1500 }}
      />
    </div>
  );
};

export default NormalTable;
