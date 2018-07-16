import React from 'react';
import { Provider, connect } from 'react-redux';
import { AppRegistry } from 'react-native';
import { reduxifyNavigator } from 'react-navigation-redux-helpers';
import { Root } from 'native-base';
import configureStore from './src/helpers/configureStore';
import RootNavigator from './src/helpers/navigation';
import { Font, AppLoading } from "expo";

console.ignoredYellowBox = ['Remote debugger', 'Warning: isMounted', 'Unable to symbolicate', 'Warning'];

const store = configureStore();

const App = reduxifyNavigator(RootNavigator, 'root');
const mapStateToProps = state => ({
  state: state.reduxNavigation,
});
const AppWithNavigationState = connect(mapStateToProps)(App);

class index extends React.Component {
  constructor(props) {
    super(props);
    this.state = { loading: true };
  }

  async componentWillMount() {
    await Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf")
    });
    this.setState({ loading: false });
  }

  render() {
    if (this.state.loading) {
      return (
        <Root>
          <AppLoading />
        </Root>
      );
    }
    return (
      <Provider store={store}>
        <Root>
          <AppWithNavigationState />
        </Root>
      </Provider>
    );
  }
}

export default index;

AppRegistry.registerComponent('TaskTimer', () => index);