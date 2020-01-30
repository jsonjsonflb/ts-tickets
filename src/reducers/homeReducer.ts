import * as _ from 'lodash';
import { helpers, types } from '@/utils';

const initialState: types.SkipCheck = {
  from: '北京',
  to: '上海',
  isCitySelectVisible: false,
  currentSelectingLeftCity: false,
  cityData: [],
  isLoadingCityData: false,
  isDateSelectVisible: false,
  highSpeed: false
};

// 给组件用
export type AppStoreType = typeof initialState;

const nameSpace = 'home';

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
