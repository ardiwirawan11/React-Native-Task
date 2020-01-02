import React from 'react'
import { Provider } from 'react-redux'
import configureStore from './store'
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import HomeScreen from './src/components/HomeScreen'
import MondayScreen from './src/components/MondayScreen'
import TuesdayScreen from './src/components/TuesdayScreen'
import WednesdayScreen from './src/components/WednesdayScreen'
import ThursdayScreen from './src/components/ThursdayScreen'
import FridayScreen from './src/components/FridayScreen'
import SaturdayScreen from './src/components/SaturdayScreen'
import SundayScreen from './src/components/SundayScreen'

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
  Monday: MondayScreen,
  Tuesday: TuesdayScreen,
  Wednesday: WednesdayScreen,
  Thursday: ThursdayScreen,
  Friday: FridayScreen,
  Saturday: SaturdayScreen,
  Sunday: SundayScreen
},
  {
    initialRouteName: 'Home'
  }
)

const AppContainer = createAppContainer(HomeStack)

