import { types } from '@/utils';

// action 生产器
export function createAction(
  type: string,
  payload?: types.SkipCheck
): types.ActionType {
  return {
    type,
    payload: payload || {}
  };
}

// 拼接类名
export const concatClass = (...names: string[]) => {
  return names.join(' ');
};

// 时间处理，获取每月的第一天的0时刻
export const getMonthFirstDay = (timestamp?: any) => {
  timestamp = timestamp ? timestamp : Date.now();
  const target = new Date(timestamp);
  target.setHours(0);
  target.setMinutes(0);
  target.setSeconds(0);
  target.setMilliseconds(0);
  target.setDate(1);

  return target;
};

// 时间处理（获取日）
export const h0 = (timestamp?: any) => {
  timestamp = timestamp ? timestamp : Date.now();
  const target = new Date(timestamp);

  target.setHours(0);
  target.setMinutes(0);
  target.setSeconds(0);
  target.setMilliseconds(0);

  return target.getTime();
};

/**
 * 生成星期几
 * @time 为时间对象
 */
export const getWeeking = (time: any) => {
  const departDate = new Date(time);

  const weekString =
    '周' + ['日', '一', '二', '三', '四', '五', '六'][departDate.getDay()];

  return weekString;
};
