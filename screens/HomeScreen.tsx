import * as React from 'react';
import { Button, View, Text } from 'react-native';

function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>This is the Home Screen</Text>
      <Button
        title="Go to Log In Screen"
        onPress={() => navigation.navigate('LogIn')}
      />

        <Button
        title="Go to Settings Screen"
        onPress={() => navigation.navigate('Settings')}
      />
      
    </View>
  );
}

export default HomeScreen;