import * as React from 'react';
import { useEffect} from 'react';
import { BackHandler } from 'react-native';
import { showAlertConfirm} from './screens/Scripts.tsx'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './screens/HomeScreen';
import SignUpScreen from './screens/SignUpScreen';
import LogInScreen from './screens/LogInScreen';
import SettingsScreen from './screens/SettingsScreen';
import PasswordScreen from './screens/PasswordScreen';
import LockScreen from './screens/LockScreen';
import ProfileScreen from './screens/ProfileScreen'
import FriendsListScreen from './screens/FriendsListScreen';
import FrogPondScreen from './screens/FrogPondScreen';
import LeaderboardScreen from './screens/LeaderboardScreen';

const Stack = createNativeStackNavigator();

function App() {
  //Prevent Back
  useEffect(() => {
    const backAction = () => {
        showAlertConfirm('Are you sure you want to exit the app?','','No','Yes',() => () => {},() => {BackHandler.exitApp();return () => {}})
        return true;
    };
    const backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        backAction
    );
    return () => backHandler.remove();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="LogIn" component={LogInScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
        <Stack.Screen name="Password" component={PasswordScreen} />
        <Stack.Screen name="Lock" component={LockScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="FriendsList" component={FriendsListScreen} />
        <Stack.Screen name="FrogPond" component={FrogPondScreen} />
        <Stack.Screen name="Leaderboard" component={LeaderboardScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;