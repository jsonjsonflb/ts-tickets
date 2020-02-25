import React, { useCallback, useMemo } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Loadable from 'react-loadable';
import Loading from '@/components/Loading';
import Banner from '@/routes/HomePage/Banner/Banner';
import {
  showCitySelector,
  exchangeFromTo,
  hideCitySelector,
  fetchData,
  setSelectedCity,
  showDateSelector,
  hideDateSelector,
  setDepartDate,
  toggleHighSpeed
} from '@/actions/homeActions';
import { types, helpers } from '@/utils';
import styles from './index.scss';

const Header = Loadable({
  loader: () => import(/* webpackChunkName: 'Header' */ '@/components/Header'),
  loading: Loading
});
const Journey = Loadable({
  loader: () =>
    import(/* webpackChunkName: 'Journey' */ '@/routes/HomePage/Journey'),
  loading: Loading
});
const DepartDate = Loadable({
  loader: () =>
    import(/* webpackChunkName: 'DepartDate' */ '@/routes/HomePage/DepartDate'),
  loading: Loading
});
const CitySelector = Loadable({
  loader: () =>
    import(
      /* webpackChunkName: 'CitySelector' */ '@/components/CitySelector/CitySelector'
    ),
  loading: Loading
});
const DateSelector = Loadable({
  loader: () =>
    import(/* webpackChunkName: 'DateSelector' */ '@/components/DateSelector'),
  loading: Loading
});

import HighSpeed from '@/routes/HomePage/HighSpeed';
import Submit from '@/routes/HomePage/Submit/Submit';

function HomePage(props: types.ContainerPropsInterface<types.SkipCheck>) {
  const {
    from,
    to,
    isCitySelectVisible,
    cityData,
    isLoadingCityData,
    departDate,
    isDateSelectVisible,
    highSpeed
  } = props.state;
  const { dispatch } = props;

  // const doExchangeFromTo = useCallback(() => {
  //   dispatch(exchangeFromTo());
  // }, [dispatch]);
  // const doShowCitySelector = useCallback(
  //   (m: boolean) => {
  //     dispatch(showCitySelector(m));
  //   },
  //   [dispatch]
  // );

  const cbs = useMemo(() => {
    return bindActionCreators(
      {
        showCitySelector,
        exchangeFromTo
      },
      dispatch
    );
  }, [dispatch]);
  // 城市选择浮层的回调，绑定 disatch
  const citySelectorCbs = useMemo(() => {
    return bindActionCreators(
      {
        onBack: hideCitySelector,
        fetchData,
        onSelect: setSelectedCity
      },
      dispatch
    );
  }, [dispatch]);

  // 日期展示组件的回调
  const departDateCbs = useMemo(() => {
    return bindActionCreators(
      {
        onClick: showDateSelector
      },
      dispatch
    );
  }, [dispatch]);

  // 时间选择回调
  const dateSelectorCbs = useMemo(() => {
    return bindActionCreators(
      {
        onBack: hideDateSelector
      },
      dispatch
    );
  }, [dispatch]);

  // 日期选择
  const onSelectDate = useCallback(
    day => {
      if (!day) {
        return;
      }
      if (day < helpers.h0()) {
        return;
      }

      dispatch(setDepartDate(day));
      dispatch(hideDateSelector());
    },
    [dispatch]
  );

  // 是否高铁
  const highSpeedCbs = useMemo(() => {
    return bindActionCreators(
      {
        toggle: toggleHighSpeed
      },
      dispatch
    );
  }, [dispatch]);

  return (
    <div>
      <Header title={'火车车票'} />
      <Banner />
      <form className={styles.form} action="index.html">
        <Journey
          // showCitySelector={doShowCitySelector}
          // exchangeFromTo={doExchangeFromTo}
          {...cbs}
          from={from}
          to={to}
        />
        <DepartDate {...departDateCbs} time={departDate} />
        <HighSpeed highSpeed={highSpeed} {...highSpeedCbs} />
        <Submit />
      </form>
      <CitySelector
        show={isCitySelectVisible}
        cityData={cityData}
        isLoading={isLoadingCityData}
        {...citySelectorCbs}
      />
      <DateSelector
        show={isDateSelectVisible}
        {...dateSelectorCbs}
        onSelect={onSelectDate}
      />
    </div>
  );
}

export default connect((state: any) => ({ state: state.home }))(HomePage);
