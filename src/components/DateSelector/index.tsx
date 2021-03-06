import React from 'react';
import { helpers } from '@/utils';
import styles from './DateSelector.scss';
import Header from '@/components/Header';

/**
 * 日历天
 */
const Day = (props: any) => {
  const { day, onSelect } = props;

  if (!day) {
    return <td className={styles.null}></td>;
  }

  const classes = [];

  const now = helpers.h0();

  if (day < now) {
    classes.push(styles.disabled);
  }

  if ([6, 0].includes(new Date(day).getDay())) {
    classes.push(styles.weekend);
  }

  const dateString = now === day ? '今天' : new Date(day).getDate();

  return (
    <td
      className={helpers.concatClass(...classes)}
      onClick={() => onSelect(day)}
    >
      {dateString}
    </td>
  );
};

/**
 * 日历周
 * @param props
 */
interface WeekPropsTypes {
  days: any[];
  onSelect?: (props: any) => void;
}
function Week(props: WeekPropsTypes) {
  const { days, onSelect } = props;
  return (
    <tr className={styles.date_table_days}>
      {days.map((day: any, idx: number) => {
        return <Day key={idx} day={day} onSelect={onSelect} />;
      })}
    </tr>
  );
}
/**
 *  日历月
 *  @startTimeInMonth 本月第一天的 0 时刻
 */
const Month = (props: any) => {
  const { startTimeInMonth, onSelect } = props;
  const startDay = new Date(startTimeInMonth);
  const currentDay = new Date(startTimeInMonth);

  let days = [];

  while (currentDay.getMonth() === startDay.getMonth()) {
    // 循环当月有多少天
    days.push(currentDay.getTime());
    currentDay.setDate(currentDay.getDate() + 1);
  }

  // 计算起始日期前面的 占位（eg: 周三前面补两个）
  // getDay() 返回一个具体日期中一周的第几天 0是星期天
  days = new Array(startDay.getDay() ? startDay.getDay() - 1 : 6)
    .fill(null)
    .concat(days);

  // 计算最后一排的占位
  // 周天占位为0，周一6个
  const lastDay = new Date(days[days.length - 1]);
  days = days.concat(
    new Array(lastDay.getDay() ? 7 - lastDay.getDay() : 0).fill(null)
  );

  const weeks = [];

  for (let row = 0; row < days.length / 7; ++row) {
    const week = days.slice(row * 7, (row + 1) * 7);
    weeks.push(week);
  }

  return (
    <table className={styles.date_table}>
      <thead>
        <tr>
          <td colSpan={7}>
            <h5>
              {startDay.getFullYear()}年{startDay.getMonth() + 1}月
            </h5>
          </td>
        </tr>
      </thead>
      <tbody>
        <tr className={styles.data_table_weeks}>
          <th>周一</th>
          <th>周二</th>
          <th>周三</th>
          <th>周四</th>
          <th>周五</th>
          <th className={styles.weekend}>周六</th>
          <th className={styles.weekend}>周日</th>
        </tr>
        {weeks.map((week, index) => (
          <Week key={index} days={week} onSelect={onSelect} />
        ))}
      </tbody>
    </table>
  );
};

/**
 * 日期选择组件
 */
interface propsType {
  show: boolean;
  onSelect: (props: any) => void;
  onBack: () => void;
}

export default (props: propsType) => {
  const { show, onSelect, onBack } = props;

  // 获取最近三个月的起始日期的0时刻
  // 第一个月
  const nowDate = helpers.getMonthFirstDay();
  const monthSequence = [nowDate.getTime()];
  // 第二个月
  nowDate.setMonth(nowDate.getMonth() + 1);
  monthSequence.push(nowDate.getTime());
  // 第三个月
  nowDate.setMonth(nowDate.getMonth() + 1);
  monthSequence.push(nowDate.getTime());

  return (
    <div
      className={helpers.concatClass(
        styles.date_selector,
        show ? '' : styles.hidden
      )}
    >
      <Header title={'日期选择'} onBack={onBack} />
      <div className={styles.date_selector_tables}>
        {monthSequence.map((month, index) => {
          return (
            <Month key={index} onSelect={onSelect} startTimeInMonth={month} />
          );
        })}
      </div>
    </div>
  );
};
