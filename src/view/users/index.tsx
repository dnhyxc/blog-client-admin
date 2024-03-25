import React from 'react';
import { Button } from 'antd';
import PrintTable from './PrintTable';
import NormalTable from './NormalTable';
import styles from './index.less';

const PrintPage: React.FC = () => {
  return (
    <div className={styles.PrintPage}>
      <PrintTable />
      <NormalTable />
      <div className={styles.printAction}>
        <Button
          type="primary"
          className={styles.printBtn}
          onClick={window.print}
        >
          打印
        </Button>
      </div>
    </div>
  );
};

export default PrintPage;
