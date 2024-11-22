import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen';
import ViewPollsScreen from '../screens/ViewPollsScreen';
import CreatePollScreen from '../screens/CreatePoll';
import PollDetailsScreen from '../screens/PollDetails';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="Enquetes" component={ViewPollsScreen} />
        <Stack.Screen name="Criar Enquete" component={CreatePollScreen} />
        <Stack.Screen name="Detalhes da Enquete" component={PollDetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
