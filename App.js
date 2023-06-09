import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

//ini kodingan screen yang digunain dalam project 
import Login from './src/screens/Login'; 
import Register from './src/screens/Register'; 
import Homepage from './src/screens/HomeScreen'; 
import AddList from './src/screens/AddList'; 
import EditList from './src/screens/EditList'; 
import Account from './src/screens/Account'; 

//pemanggilan stack dan bottom tab
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const HomeStack = () => {
  return(
  <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Home" component={Homepage} />
      <Stack.Screen name="EditList" component={EditList} />
  </Stack.Navigator>
  );
}

const RootHome = () => {
  return (
    <Tab.Navigator
      initialRouteName="HomePage"
      screenOptions={{
        tabBarActiveTintColor: 'white',
        tabBarInactiveTintColor : '#05BFDB',
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#000',
          paddingVertical : 10,
          height : 60,
        },
      }}
    >
      <Tab.Screen
        name="Homee"
        component={HomeStack}
        detachInactiveScreens={true}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({ color, size }) => (
            <Icon name="home-flood" color={color} size={40} />
          ),
        }}
      />
      <Tab.Screen
        name="Movie"
        component={AddList}
        detachInactiveScreens={true}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({ color, size }) => (
            <Icon name="filter-variant-plus" color={color} size={40} />
          ),
        }}
      />
          
      <Tab.Screen
        name="Home"
        component={Account}
        detachInactiveScreens={true}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({ color, size }) => (
            <Icon name="shield-account" color={color} size={40} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

//Navigation Container untuk manggil screen
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown:false}}>
        <Stack.Screen name='Login' component={Login} />
        <Stack.Screen name='Register' component={Register} />
        <Stack.Screen name='Home' component={RootHome} />
        <Stack.Screen name='HomeScreen' component={Homepage} detachInactiveScreens={true}/>
        <Stack.Screen name='AddList' component={AddList} detachInactiveScreens={true}/>
        <Stack.Screen name='EditList' component={EditList} />
        <Stack.Screen name='Account' component={Account} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App