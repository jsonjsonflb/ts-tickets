import * as React from 'react';
import { types } from '@/utils';
import { connect } from 'react-redux';
import Router from '@/routes/router';

class App extends React.Component<
  types.ContainerPropsInterface<types.SkipCheck>,
  types.SkipCheck
> {
  public render() {
    return (
      <div>
        <Router />
      </div>
    );
  }
}

const mapState = (state: any) => {
  return {
    state
  };
};

export default connect(mapState)(App);
