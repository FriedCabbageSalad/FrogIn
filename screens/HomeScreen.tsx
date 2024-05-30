import * as React from 'react';
import { Button, View, Text } from 'react-native';

function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>This is the Home Screen</Text>
<<<<<<< HEAD

      <Button title="Log In"
        onPress={() => navigation.navigate('LogIn')}/>

      <Button title="Settings"
        onPress={() => navigation.navigate('Settings')}/>

=======
      <Button
        title="Go to Log In Screen"
        onPress={() => navigation.navigate('LogIn')}
      />

        <Button
        title="Go to Settings Screen"
        onPress={() => navigation.navigate('Settings')}
      />
      
>>>>>>> 6c1db4613216e7379817b682959bc628c4c3e7fc
    </View>
  );
}

export default HomeScreen;