import React, { useCallback, useMemo } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Loadable from 'react-loadable';
import Loading from '@/components/Loading';
import {
  showCitySelector,
  exchangeFromTo,
  hideCitySelector,
  fetchData,
  setSelectedCity,
  showDateSelector,
  hideDateSelector
} from '@/actions/homeActions';
import { types } from '@/utils';
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

function HomePage(props: types.ContainerPropsInterface<types.SkipCheck>) {
  const {
    from,
    to,
    isCitySelectVisible,
    cityData,
    isLoadingCityData,
    departDate,
    isDateSelectVisible
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

  const dateSelectorCbs = useMemo(() => {
    return bindActionCreators(
      {
        onBack: hideDateSelector,
        onSelect: () => {}
      },
      dispatch
    );
  }, [dispatch]);

  return (
    <div>
      <Header title={'火车车票'} />
      <form className={styles.form} action="">
        <Journey
          // showCitySelector={doShowCitySelector}
          // exchangeFromTo={doExchangeFromTo}
          {...cbs}
          from={from}
          to={to}
        />
        <DepartDate {...departDateCbs} time={departDate} />
      </form>
      <CitySelector
        show={isCitySelectVisible}
        cityData={cityData}
        isLoading={isLoadingCityData}
        {...citySelectorCbs}
      />
      <DateSelector show={isDateSelectVisible} {...dateSelectorCbs} />
    </div>
  );
}

export default connect((state: any) => ({ state: state.home }))(HomePage);
