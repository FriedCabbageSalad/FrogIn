import * as React from 'react';
<<<<<<< HEAD

import 
{ Button,
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Image 
} from 'react-native';

function LogInScreen({ navigation }) {
  const [text, onChangeText] = React.useState('');
  const Separator = () => <View style={styles.separator} />;
  return (
      <ImageBackground source={require('./../assets/background.png')} resizeMode='cover' style={styles.imageSizing}>

        {/* Application Name and Logo */}
        <View style={{flex: 8, justifyContent: 'center', alignItems: 'center'}}>
          <Text style={styles.header}>FrogIn</Text>
          <Image source={require('./../assets/default_frog.png')} resizeMode='cover' style={styles.logo}/>
        </View>

        {/* Log In Features */}
        <View style={{flex: 8, justifyContent: 'center', alignItems: 'center'}}>
          <Text style={styles.h2}>Create an account</Text>
          <Text style={styles.h3}>Enter your email to sign up for this app</Text>
          
          {/* Email Input */}
          <TextInput
            style={styles.input}
            onChangeText={onChangeText}
            value={text}
            placeholder="email@domain.com"
          />
          {/* Sign Up button, TO DO */}
          <View style={{width: "75%"}}>
            <Button title="Sign up with email" color={'#000000'} 
              onPress={() => navigation.navigate('')}/>
          </View>
        </View>

        {/* Divider with text in the middle */}
        <View style={{flexDirection: 'row', alignItems: 'center', marginHorizontal: '12.5%'}}>
          <View style={{flex: 1, height: 1, backgroundColor: 'white'}} />
            <View>
              <Text style={{width: 120, textAlign: 'center'}}>or continue with</Text>
            </View>
          <View style={{flex: 1, height: 1, backgroundColor: 'white'}} />
        </View>

        {/* Google sign up button */}
        <View style={{flex: 6, justifyContent: 'center', alignItems: 'center'}}>

          <TouchableOpacity style={styles.googleButton} onPress={() => navigation.navigate('')}>
            <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
              <Image source={require('./../assets/google.jpg')} style={{height: '150%', width: '10%'}} resizeMode='contain'/>
              <Text style={{color: 'black', paddingHorizontal: '2%'}}>Google</Text>
            </View>
          </TouchableOpacity>

          <View style={{width: "75%"}}>
            <Separator/>
            <Text style={styles.h3}>By clicking continue, you agree to our Terms of Service and Privacy Policy</Text>
          </View>
        </View>
        
        {/* Padding for vertical adjustment */}
        <View style={{flex: 10, justifyContent: 'center', alignItems: 'center'}}></View>
      </ImageBackground>
  );
}
export default LogInScreen;

const styles = StyleSheet.create({
  header: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 48,
    fontFamily: 'Sans-serif',
    padding: 5
  },
  h2: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 24,
    fontFamily: 'Sans-serif',
  },
  h3: {
    color: 'black',
    fontSize: 14,
    fontFamily: 'Sans-serif',
    padding: 5,
    paddingBottom: 15,
  },
  imageSizing: {
    width: '100%',
    height: '100%'
  },
  logo: {
    width: '30%',
    height: '45%'
  },
  input: {
    width: '75%',
    height: 40,
    margin: 12,
    borderWidth: 0,
    padding: 10,
    paddingLeft: 20,
    borderRadius: 8.5,
    backgroundColor: 'white'
  },
  separator: {
    marginVertical: '2%',
  },
  googleButton: {
    width: '75%',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 8.5,
  }
});
=======
import { Button, View, Text } from 'react-native';

function LogInScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Log In Screen</Text>
    </View>
  );
}
export default LogInScreen;
>>>>>>> 6c1db4613216e7379817b682959bc628c4c3e7fc
