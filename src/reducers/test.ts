import * as _ from 'lodash';
import { createStore } from 'redux';
import { types } from '@/utils';

const initialState = {
  num: 1
};

// 给组件用
export type AppStoreType = typeof initialState;

const nameSpace = 'test';

export default (state: any = initialState, action: types.ActionType) => {
  switch (action.type) {
    case `${nameSpace}/add`:
      let num = Number(state.num) + 1;
      return _.assign({}, state, {
        num
      });

    default:
      return state;
  }
};
