import * as React from 'react';
import { Button, View, Text } from 'react-native';

function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>This is the Home Screen</Text>

      <Button title="Log In"
        onPress={() => navigation.navigate('LogIn')}/>
      
      <Button title="Sign Up"
        onPress={() => navigation.navigate('SignUp')}/>
      
      <Button title="Password Test"
        onPress={() => navigation.navigate('Password')}/>

      <Button title="Settings"
        onPress={() => navigation.navigate('Settings')}/>

    </View>
  );
}

export default HomeScreen;