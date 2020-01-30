import { helpers } from '@/utils';
const nameSpace = 'HOME/';

export const ACTION_SET_FROM = nameSpace + 'SET_FROM';
export const ACTION_SET_TO = nameSpace + 'SET_TO';
export const ACTION_SET_ISCITYSELECTVISIBLE = nameSpace + 'SET_FROM';
export const ACTION_SET_CURRENTSELECTINGLEFTCITY =
  nameSpace + 'SET_CURRENTSELECTINGLEFTCITY';
export const ACTION_SET_CITYDATA = nameSpace + 'ASET_CITYDATA';
export const ACTION_SET_ISLOADINGCITYDATA = nameSpace + 'SET_ISLOADINGCITYDATA';
export const ACTION_SET_ISDATESELECTVISIBLE =
  nameSpace + 'SET_ISDATESELECTVISIBLE';
export const ACTION_SET_HIGHSPEED = nameSpace + 'SET_HIGHSPEED';

export const setFrom = (from: string) => {
  return helpers.createAction(ACTION_SET_FROM, {
    from
  });
};

export const setTo = (to: string) => {
  return helpers.createAction(ACTION_SET_FROM, {
    to
  });
};
