import React from 'react';
import { Provider } from 'react-redux';
import { createRootNavigator } from './router';
import { isSignedIn } from './auth';
import store from './store';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      signedIn: false,
      checkedSignIn: false
    };
  }

  componentWillMount() {
    isSignedIn()
      .then(res => this.setState({ signedIn: res, checkedSignIn: true }))
      .catch(error => console.error(error));
  }

  render() {
    const { checkedSignIn, signedIn } = this.state;

    if (!checkedSignIn) {
      return null;
    }

    const Layout = createRootNavigator(signedIn);
    return (
      <Provider store={store}>
        <Layout />
      </Provider>
    );
  }
}
