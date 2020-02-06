import * as _ from 'lodash';
import { helpers, types } from '@/utils';
import {
  ACTION_SET_FROM,
  ACTION_SET_TO,
  ACTION_SET_ISCITYSELECTVISIBLE,
  ACTION_SET_CURRENTSELECTINGLEFTCITY,
  ACTION_SET_CITYDATA,
  ACTION_SET_ISLOADINGCITYDATA,
  ACTION_SET_ISDATESELECTVISIBLE,
  ACTION_SET_HIGHSPEED
} from '@/actions/homeActions';

export const initialState: types.SkipCheck = {
  from: '北京',
  to: '上海',
  isCitySelectVisible: false,
  currentSelectingLeftCity: false,
  cityData: null,
  isLoadingCityData: false,
  isDateSelectVisible: false,
  highSpeed: false,
  departDate: ''
};

// 给组件用
export type AppStoreType = typeof initialState;

export default (state: any = initialState, action: types.ActionType) => {
  switch (action.type) {
    case ACTION_SET_FROM:
      return _.assign({}, state, {
        from: action.payload.from
      });
    case ACTION_SET_TO:
      return _.assign({}, state, {
        to: action.payload.to
      });
    case ACTION_SET_ISCITYSELECTVISIBLE:
      return _.assign({}, state, {
        isCitySelectVisible: action.payload.isCitySelectVisible
      });
    case ACTION_SET_CURRENTSELECTINGLEFTCITY:
      return _.assign({}, state, {
        currentSelectingLeftCity: action.payload.currentSelectingLeftCity
      });

    case ACTION_SET_CITYDATA:
      return _.assign({}, state, {
        cityData: action.payload.cityData
      });

    case ACTION_SET_ISLOADINGCITYDATA:
      return _.assign({}, state, {
        isLoadingCityData: action.payload.isLoadingCityData
      });

    case ACTION_SET_ISDATESELECTVISIBLE:
      return _.assign({}, state, {
        isDateSelectVisible: action.payload.isDateSelectVisible
      });
    case ACTION_SET_HIGHSPEED:
      return _.assign({}, state, {
        highSpeed: action.payload.highSpeed
      });

    default:
      return state;
  }
};
