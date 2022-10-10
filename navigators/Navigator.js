import React, {useContext} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../views/Home';
import Profile from '../views/Profile';
import Login from '../views/Login';
import CreatePost from '../views/CreatePost';
import {MainContext} from '../context/MainContext';
import Single from '../views/Single';
import EditPost from '../views/EditPost';
import MyFiles from '../views/MyFiles';
import ChatView from '../views/ChatView';
import OwnChats from '../views/OwnChats';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const TabScreen = () => {
  return (
    <Tab.Navigator screenOptions={{headerShown: false}}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Create post" component={CreatePost} />
      <Tab.Screen name="Profile" component={Profile} />
      <Tab.Screen name="OwnChats" component={OwnChats} />


    </Tab.Navigator>
  );
};

const StackScreen = () => {
  const {isLoggedIn} = useContext(MainContext);
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      {isLoggedIn ? (
        <>
          <Stack.Screen
            name="Tabs"
            component={TabScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen name="Single" component={Single} />
          <Stack.Screen name="EditPost" component={EditPost} />
          <Stack.Screen name="MyFiles" component={MyFiles} />
          <Stack.Screen name="ChatView" component={ChatView} />


        </>
      ) : (
        <Stack.Screen name="Login" component={Login} />
      )}
    </Stack.Navigator>
  );
};

const Navigator = () => {
  return (
    <NavigationContainer>
      <StackScreen />
    </NavigationContainer>
  );
};

export default Navigator;
