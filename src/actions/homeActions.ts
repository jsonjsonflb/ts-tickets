import { helpers } from '@/utils';
const nameSpace = 'HOME/';

export const ACTION_SET_FROM = nameSpace + 'SET_FROM';
export const ACTION_SET_TO = nameSpace + 'SET_TO';
export const ACTION_SET_ISCITYSELECTVISIBLE =
  nameSpace + 'ACTION_SET_ISCITYSELECTVISIBLE';
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
  return helpers.createAction(ACTION_SET_TO, {
    to
  });
};

export const setIsLoadingCityData = (isLoadingCityData: boolean) => {
  return helpers.createAction(ACTION_SET_ISLOADINGCITYDATA, {
    isLoadingCityData
  });
};

export const setCityData = (cityData: any) => {
  return helpers.createAction(ACTION_SET_CITYDATA, {
    cityData
  });
};

// 是否是高铁
export const toggleHighSpeed = () => {
  return (dispatch: any, getState: any) => {
    const { highSpeed } = getState().home.home;
    dispatch(
      helpers.createAction(ACTION_SET_CITYDATA, {
        highSpeed: !highSpeed
      })
    );
  };
};

export const showCitySelector = (currentSelectingLeftCity: any) => {
  return (dispatch: any) => {
    dispatch(
      helpers.createAction(ACTION_SET_ISCITYSELECTVISIBLE, {
        isCitySelectVisible: true
      })
    );
    dispatch(
      helpers.createAction(ACTION_SET_CURRENTSELECTINGLEFTCITY, {
        currentSelectingLeftCity
      })
    );
  };
};

export const hideCitySelector = (currentSelectingLeftCity: any) => {
  return (dispatch: any) => {
    dispatch(
      helpers.createAction(ACTION_SET_ISCITYSELECTVISIBLE, {
        isCitySelectVisible: false
      })
    );
    dispatch(
      helpers.createAction(ACTION_SET_CURRENTSELECTINGLEFTCITY, {
        currentSelectingLeftCity
      })
    );
  };
};

export const setSelectedCity = (city: any) => {
  return (dispatch: any, getState: any) => {
    const { currentSelectingLeftCity } = getState().home;
    console.log('currentSelectingLeftCity', currentSelectingLeftCity);

    if (currentSelectingLeftCity) {
      dispatch(setFrom(city));
    } else {
      dispatch(setTo(city));
    }
    dispatch(hideCitySelector(city));
  };
};

export const showDateSelector = () => {
  return helpers.createAction(ACTION_SET_ISDATESELECTVISIBLE, {
    isDateSelectVisible: true
  });
};

export const hideDateSelector = () => {
  return helpers.createAction(ACTION_SET_ISDATESELECTVISIBLE, {
    isDateSelectVisible: false
  });
};

//  始发站 和 终点站 互换
export const exchangeFromTo = () => {
  return (dispatch: any, getState: any) => {
    const { from, to } = getState().home;
    console.log(from, to);
    dispatch(setFrom(to));
    dispatch(setTo(from));
  };
};

// 请求城市数据
export const fetchData = (params: any) => {
  return (dispatch: any, getState: any) => {
    const { isLoadingCityData } = getState().home;
    if (isLoadingCityData) {
      return;
    }

    // 取默认值
    const cache = JSON.parse(localStorage.getItem('city_data_cache') || '{}');

    // 判断过期时间
    if (Date.now() < cache.expires) {
      dispatch(setCityData(cache.data));
      return;
    }

    dispatch(setIsLoadingCityData(true));
    fetch('http://localhost:5555/rest/cities?_' + Date.now())
      .then(res => res.json())
      .then(cityData => {
        dispatch(setCityData(cityData));
        localStorage.setItem(
          'city_data_cache',
          JSON.stringify({
            expires: Date.now() + 60 * 1000,
            data: cityData
          })
        );

        dispatch(setIsLoadingCityData(false));
      })
      .catch(err => {
        console.log(err);
        dispatch(setIsLoadingCityData(false));
      });
  };
};
