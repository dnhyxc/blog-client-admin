import React, { useMemo } from 'react';
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

const PrintTable: React.FC = () => {
  const chunkedColumns = (columns: ColumnType[], size: number) => {
    const columnList = [];
    for (let i = 0; i < columns.length; i += size) {
      const chunk = columns.slice(i, i + size);
      columnList.push(chunk);
    }
    return columnList;
  };

  const columns: ColumnType[] | ColumnType[][] = useMemo(() => {
    const width = 200;
    const list = [
      {
        title: 'Full Name',
        width,
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: 'Age',
        width,
        dataIndex: 'age',
        key: 'age',
      },
      {
        title: 'Column 1',
        dataIndex: 'address',
        key: '1',
        width,
      },
      {
        title: 'Column 2',
        dataIndex: 'address',
        key: '2',
        width,
      },
      {
        title: 'Column 3',
        dataIndex: 'address',
        key: '3',
        width,
      },
      {
        title: 'Column 4',
        dataIndex: 'address',
        key: '4',
        width,
      },
      {
        title: 'Column 5',
        dataIndex: 'address',
        key: '5',
        width,
      },
      {
        title: 'Column 6',
        dataIndex: 'address',
        key: '6',
        width,
      },
      {
        title: 'Column 7',
        dataIndex: 'address',
        key: '7',
        width,
      },
      {
        title: 'Column 8',
        dataIndex: 'address',
        key: '8',
        width: 200,
        fixed: 'right',
      },
    ];

    return chunkedColumns(list, 4);
  }, []);

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
    <div className={styles.PrintTable}>
      {columns.map((i) => {
        return (
          <Table
            key={i[0].key}
            columns={i as ColumnsType<DataType>}
            dataSource={dataSource}
            pagination={false}
          />
        );
      })}
    </div>
  );
};

export default PrintTable;
