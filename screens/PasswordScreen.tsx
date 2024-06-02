import * as React from 'react';
import { 
  Button,
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

function PasswordScreen({ navigation}: {navigation: any}) {
  // text = Username, text2 = password, text 3 is confirm password
  const [text, onChangeText] = React.useState('');
  const [text2, onChangeText2] = React.useState('');
  const [text3, onChangeText3] = React.useState('');
  const Separator = () => <View style={styles.separator} />;

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <ImageBackground source={require('./../assets/background.png')} resizeMode='cover' style={styles.imageSizing}>
          {/* Application Name and Logo */}
          <View style={{position: 'absolute', top: dimensions()._height * 0.075, justifyContent: 'center',alignItems: 'center', alignSelf: 'center'}}>
            <Text style={styles.header}>FrogIn</Text>
            <Image source={require('./../assets/default_frog.png')} resizeMode='stretch' style={styles.logo}/>
          </View>
          {/* Sign Up Fields */}
          <View style={{position: 'absolute', top: dimensions()._height * 0.2, justifyContent: 'center',alignItems: 'center', alignSelf: 'center'}}>
            <TextInput
              style={styles.input}
              onChangeText={onChangeText}
              value={text}
              placeholder="Username"
            />
              <TextInput
              style={styles.input}
              onChangeText={onChangeText2}
              value={text2}
              placeholder="Password"
            />
              <TextInput
              style={styles.input}
              onChangeText={onChangeText3}
              value={text3}
              placeholder="Confirm Password"
            />

            <Separator/>
            
            {/* Confirmation Button */}
            <TouchableOpacity style={styles.signUpButton} onPress={() => navigation.navigate('')}>
                <Text style={{color: 'white', paddingHorizontal: '2%', justifyContent: 'center', alignItems: 'center' }}>Sign Up</Text>
            </TouchableOpacity>

          </View>

      </ImageBackground>
    </View>
  );
}
export default PasswordScreen;

const styles = StyleSheet.create({
  imageSizing: {
    width: '100%',
    height: '100%'
  },
  header: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 48,
    fontFamily: 'Sans-serif',
    padding: 5
  },
  logo: {
    width: '75%',
    height: '100%',
  },
  input: {
    width: '150%',
    height: 40,
    margin: 12,
    borderWidth: 0,
    padding: 10,
    paddingLeft: 20,
    borderRadius: 8.5,
    backgroundColor: 'white'
  },
  signUpButton: {
    width: '150%',
    alignItems: 'center',
    backgroundColor: 'black',
    padding: 10,
    borderRadius: 8.5,
  },
  separator: {
    marginVertical: '3%',
  }
});