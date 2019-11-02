import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import LoginScreen from './screens/Login';
import RegisterScreen from './screens/Register';
import MealsScreen from './screens/Meals';
import AuthLoading from './screens/AuthLoading';
import Modal from './screens/Modal';

const onBoardingNavigator = createStackNavigator({
  Login: LoginScreen,
  Register: RegisterScreen
}, {
  initialRouteName: 'Login'
});

const AppNavigator = createStackNavigator({
  Meals: {
    screen: MealsScreen
  },
}, {
  initialRouteName: 'Meals'
});

const RootStack = createStackNavigator({
  Main: AppNavigator,
  Modal: Modal,
}, {
  mode: 'modal',
  headerMode: 'none'
});

const BaseStack = createSwitchNavigator({
  AuthLoading,
  OnBoarding: onBoardingNavigator,
  Root: RootStack
}, {
  initialRouteName: 'AuthLoading'
});

export default createAppContainer(BaseStack);