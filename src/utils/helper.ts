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

export const concatClass = (...names: string[]) => {
  return names.join(' ');
};
