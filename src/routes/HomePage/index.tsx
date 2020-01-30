import React from 'react';
import { connect } from 'react-redux';
import Loadable from 'react-loadable';
import Loading from '@/components/Loading';

const Header = Loadable({
  loader: () => import(/* webpackChunkName: 'Header' */ '@/components/Header'),
  loading: Loading
});

function HomePage(props: any) {
  return (
    <div>
      <Header />
      <h1>{props.state.from}</h1>
    </div>
  );
}

export default connect((state: any) => ({ state: state.home }))(HomePage);
