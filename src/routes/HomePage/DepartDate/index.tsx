import React, { useMemo } from 'react';
import { helpers } from '@/utils';
import styles from './index.scss';
import dayjs from 'dayjs';

interface DepartDateTypes {
  time: any;
  onClick: () => void;
}

export default (props: DepartDateTypes) => {
  const { time, onClick } = props;
  // 重置小时分钟秒。只保留日期
  const h0OfDepart = helpers.h0(time);

  // 优化 departDateString 的计算。hoOfDepart日期改变才计算
  const departDateString = useMemo(() => {
    return h0OfDepart ? dayjs(h0OfDepart).format('YYYY-MM-DD') : '';
  }, [h0OfDepart]);

  // 获得星期
  const departDate = new Date(h0OfDepart); // 取得今天日期的时间对象
  const isToday = h0OfDepart === helpers.h0();
  const weekString = helpers.getWeeking(departDate) + (isToday ? '(今天)' : '');

  return (
    <div
      className={styles.depart_date}
      onClick={() => {
        if (onClick) {
          onClick();
        }
      }}
    >
      <input type={'hidden'} name={'date'} value={departDateString} />
      {departDateString}
      {weekString}
    </div>
  );
};
