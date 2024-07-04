import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import WelcomeScreen from '../screens/WelcomeScreen';
import AddCountryScreen from '../screens/AddCountryScreen';
import EditDeleteCountryScreen from '../screens/EditDeleteCountryScreen';
import ViewCountriesScreen from '../screens/ViewCountriesScreen';
import GamesScreen from '../screens/API';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const HomeTabs: React.FC = () => (
  <Tab.Navigator>
    <Tab.Screen name="AddCountry" component={AddCountryScreen} />
    <Tab.Screen name="ViewCountries" component={ViewCountriesScreen} />
    <Tab.Screen name="EditDeleteCountry" component={EditDeleteCountryScreen} />
    <Tab.Screen name="Games" component={GamesScreen} />
  </Tab.Navigator>
);

const MainNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Main" component={HomeTabs} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigator;

