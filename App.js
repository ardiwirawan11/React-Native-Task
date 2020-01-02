import React from 'react'
import { Provider } from 'react-redux'
import configureStore from './store'
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import HomeScreen from './src/components/HomeScreen'
import ResultScreen from './src/components/ResultScreen'

export default class App extends React.Component {
  static navigationOptions = {
    header: null
  }

  render() {
    const store = configureStore();
    return (
      <Provider store={store}>
        <AppContainer />
      </Provider>
    )
  }
}

const HomeStack = createStackNavigator({
  Home: HomeScreen,
  Result: ResultScreen
},
  {
    initialRouteName: 'Home'
  }
)

const AppContainer = createAppContainer(HomeStack)

