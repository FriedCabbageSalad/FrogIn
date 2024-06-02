import * as React from 'react';

import 
{ Button,
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Image,
  Dimensions
} from 'react-native';

const { height, width } = Dimensions.get('window')

function dimensions() {

  var _height = Math.round(height),
      _width = Math.round(width)

  return { _height, _width }
}

function LogInScreen({ navigation}: {navigation: any}) {
  const [text, onChangeText] = React.useState('');
  const [text2, onChangeText2] = React.useState('');
  const Separator = () => <View style={styles.separator} />;
  return (
      <ImageBackground source={require('./../assets/background.png')} resizeMode='cover' style={styles.imageSizing}>

            {/* Application Name and Logo */}
            <View style={{position: 'absolute', top: dimensions()._height * 0.1, justifyContent: 'center',alignItems: 'center', alignSelf: 'center'}}>
              <Text style={styles.header}>FrogIn</Text>
              <Image source={require('./../assets/default_frog.png')} resizeMode='stretch' style={styles.logo}/>
            </View>

            {/* Log In Features */}
            <View style={{position: 'absolute', top: dimensions()._height * 0.25, justifyContent: 'center', alignItems: 'center', alignSelf: 'center'}}>
              <Text style={styles.h2}>Login</Text>
              <Text style={styles.h3}>Enter your details to login</Text>
              
              {/* Email Input */}
              <TextInput
                style={styles.input}
                onChangeText={onChangeText}
                value={text}
                placeholder="email@domain.com"
              />

              {/* Password Input */}
              <TextInput
                style={styles.input}
                onChangeText={onChangeText2}
                value={text2}
                placeholder="Password"
              />
              <Separator/>
              {/* Sign Up button, TO DO */}
              <View style={{width: "150%"}}>
                <Button title="Login" color={'#000000'} 
                  onPress={() => navigation.navigate('')}/>
              </View>
            </View>

            {/* Divider with text in the middle */}
            <View style={{position: 'absolute', top: dimensions()._height * 0.525, flexDirection: 'row', alignItems: 'center', marginHorizontal: '12.5%',}}>
              <View style={{flex: 1, height: 1, backgroundColor: 'black'}} />
                <View>
                  <Text style={{width: 120, textAlign: 'center'}}>or continue with</Text>
                </View>
              <View style={{flex: 1, height: 1, backgroundColor: 'black'}} />
            </View>

            {/* Google sign up button */}
            <View style={{position: 'absolute', top: dimensions()._height * 0.575, justifyContent: 'center', alignItems: 'center', alignSelf: 'center'}}>

              <TouchableOpacity style={styles.googleButton} onPress={() => navigation.navigate('')}>
                <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                  <Image source={require('./../assets/google.jpg')} style={{height: '150%', width: '10%'}} resizeMode='contain'/>
                  <Text style={{color: 'black', paddingHorizontal: '2%'}}>Google</Text>
                </View>
              </TouchableOpacity>

              <View style={{width: "75%"}}>
                <Separator/>
                <Text style={styles.TOS}>By clicking continue, you agree to our Terms of Service and Privacy Policy</Text>
              </View>
            </View>
            
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
    padding: 5,
  },
  h2: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 28,
    fontFamily: 'Sans-serif',
  },
  h3: {
    color: 'black',
    fontSize: 16,
    fontFamily: 'Sans-serif',
    padding: 5,
    paddingBottom: 10,
  },
  TOS: {
    color: 'black',
    fontSize: 14,
    fontFamily: 'Sans-serif',
    padding: 5,
    paddingBottom: 10,
  },
  imageSizing: {
    width: '100%',
    height: '100%'
  },
  logo: {
    width: '75%',
    height: '100%',
  },
  input: {
    width: '150%',
    height: 40,
    margin: 6,
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
    width: '95%',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 8.5,
  }
});