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
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import ChatView from '../views/ChatView';
import OwnChats from '../views/OwnChats';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const TabScreen = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'fa-solid fa-house' : 'fa-solid fa-house';
          } else if (route.name === 'Create post') {
            iconName = focused ? 'fa-solid fa-circle-plus' : 'fa-solid fa-plus';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'fa-solid fa-user' : 'fa-solid fa-user';
          } else if (route.name === 'OwnChats') {
            iconName = focused ? 'fa-solid fa-comment' : 'fa-solid fa-comment';
          }
          // You can return any component that you like here!
          return <FontAwesomeIcon icon={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'rgba(246,203,100,1)',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Create post" component={CreatePost} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
};

const StackScreen = () => {
  const {isLoggedIn} = useContext(MainContext);
  return (
    <Stack.Navigator screenOptions={{headerShown: true}}>
      {isLoggedIn ? (
        <>
          <Stack.Screen
            name="Tabs"
            component={TabScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Single"
            component={Single}
            options={{title: 'Post'}}
          />
          <Stack.Screen
            name="editPost"
            component={EditPost}
            options={{title: 'Edit post'}}
          />
          <Stack.Screen
            name="MyFiles"
            component={MyFiles}
            options={{title: 'My files'}}
          />
          <Stack.Screen
            name="ChatView"
            component={ChatView}
            options={{title: 'Chat'}}
          />
          <Stack.Screen
            name="OwnChats"
            component={OwnChats}
            options={{title: 'My chats'}}
          />
        </>
      ) : (
        <Stack.Screen
          name="Login"
          component={Login}
          options={{headerShown: false}}
        />
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
