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
  setSelectedCity
} from '@/actions/homeActions';
import { types } from '@/utils';
import styles from './index.scss';

const Header = Loadable({
  loader: () =>
    import(/* webpackChunkName: 'Header' */ '@/routes/HomePage/Header'),
  loading: Loading
});
const Journey = Loadable({
  loader: () =>
    import(/* webpackChunkName: 'Journey' */ '@/routes/HomePage/Journey'),
  loading: Loading
});
const CitySelector = Loadable({
  loader: () =>
    import(
      /* webpackChunkName: 'CitySelector' */ '@/components/CitySelector/CitySelector'
    ),
  loading: Loading
});

function HomePage(props: types.ContainerPropsInterface<types.SkipCheck>) {
  const {
    from,
    to,
    isCitySelectVisible,
    cityData,
    isLoadingCityData
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
      </form>
      <CitySelector
        show={isCitySelectVisible}
        cityData={cityData}
        isLoading={isLoadingCityData}
        {...citySelectorCbs}
      />
    </div>
  );
}

export default connect((state: any) => ({ state: state.home }))(HomePage);
