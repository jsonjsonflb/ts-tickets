import './scss/index.scss'

import * as React from 'react';
import {connect} from 'react-redux';
import { AppStoreType } from '@/reducers/test';
import {helpers} from '@/utils'

export interface ContainerPropsInterface<T> {
  dispatch(action: { type: string; payload?: any }): void;
  state: T;
  [random: string]: any;
}

export interface ContainerStateInterface {
  [random: string]: any;
}


// @connect((state: any) => ({
//   state: state
// }))
class App extends React.PureComponent<ContainerPropsInterface<AppStoreType>,ContainerStateInterface> {



  public addNum = () => {
    this.props.dispatch(helpers.createAction('test/add'))
  }

  public render() {
    return (
      <div>
        {this.props.state.num}
        <button onClick={this.addNum}>点击</button>
      </div>
    );
  }
}

const mapProps = (state:any) => {
  return {
    state: state.test,
    all:state
  };
}

export default connect(mapProps)(App);


