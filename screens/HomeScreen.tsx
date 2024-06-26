import * as React from 'react';
import { Button, View, Text } from 'react-native';

function HomeScreen({ navigation}: {navigation: any}) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{fontSize: 40}}>WORK IN PROGRESS</Text>
      <Text style={{fontSize: 20}}>This is a Test Home Screen</Text>

      <Button title="Log In"
        onPress={() => navigation.navigate('LogIn')}/>
      
      <Button title="Sign Up"
        onPress={() => navigation.navigate('SignUp')}/>
      
      <Button title="Password"
        onPress={() => navigation.navigate('Password')}/>

      <Button title="Settings"
        onPress={() => navigation.navigate('Settings')}/>

      <Button title="Lock"
        onPress={() => navigation.navigate('Lock')}/>

      <Button title="Profile"
        onPress={() => navigation.navigate('Profile')}/>

      <Button title="FriendsList"
        onPress={() => navigation.navigate('FriendsList')}/>
    </View>
  );
}

export default HomeScreen;