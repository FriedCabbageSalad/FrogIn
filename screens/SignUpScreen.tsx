import * as React from 'react';
import { Button, View, Text, ImageBackground, TouchableOpacity, TextInput, StyleSheet, Image } from 'react-native';
import { dimensions, showAlert, showAlertAction} from './../screens/Scripts.tsx';
import auth from '@react-native-firebase/auth';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';

//token for firebase backend
GoogleSignin.configure({
  webClientId: '843583618218-6lp78r9qb51e647tkmib9pt5m5ev667q.apps.googleusercontent.com',
});

async function onGoogleButtonPress() {
  // Check if your device supports Google Play
  await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
  // Get the users ID token
  const { idToken } = await GoogleSignin.signIn();
  // Create a Google credential with the token
  const googleCredential = auth.GoogleAuthProvider.credential(idToken);
  // Sign-in the user with the credential
  return auth().signInWithCredential(googleCredential);
}

function SignUpScreen({navigation}: {navigation: any}) {
  const [text, onChangeText] = React.useState('');
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
          <Text style={styles.h2}>Create Account</Text>
          <Text style={styles.h3}>Enter your email to get started now!</Text>
          
          {/* Email Input */}
          <TextInput
            style={styles.input}
            onChangeText={onChangeText}
            value={text}
            placeholder="email@domain.com"
          />
          {/* Sign Up Button */}
          <View style={{width: "125%"}}>
            <Button title="Sign up with email" color={'#000000'} 
              onPress={() => {
                if (text == "") {
                  showAlert('Error','Please enter an email','OK')
                } else {
                auth()
                .fetchSignInMethodsForEmail(text)
                  .then((val) => {
                    console.log(val)
                    if (val.includes("google.com")) {
                      showAlertAction('Account already exists! Log in with your Google account.','','Log in to FrogIn',() => navigation.navigate('LogIn'))
                    }
                    else if (val.includes("password")) {
                      showAlertAction('Account already exists! Log in with your email.','','Log in to FrogIn',() => navigation.navigate('LogIn'))
                    }
                  })
                .catch(error => {
                  if (error.code === 'auth/') {
                    showAlert('Invalid email address!','','OK');
                  }
                  else {
                    showAlert('Error',error,'OK');
                  }
                  console.error(error);
                })
                //success
                .then(() => navigation.navigate('Password', {emailstring: text}))
                };
              }}/>
          </View>
        </View>

        {/* Divider with text in the middle */}
        <View style={{position: 'absolute', top: dimensions()._height * 0.465, flexDirection: 'row', alignItems: 'center', marginHorizontal: '12.5%',}}>
          <View style={{flex: 1, height: 1, backgroundColor: 'white'}} />
            <View>
              <Text style={{width: 120, textAlign: 'center'}}>or continue with</Text>
            </View>
          <View style={{flex: 1, height: 1, backgroundColor: 'white'}} />
        </View>

        {/* Google sign up button */}
        <View style={{position: 'absolute', top: dimensions()._height * 0.515, justifyContent: 'center', alignItems: 'center', alignSelf: 'center'}}>
          <TouchableOpacity style={styles.googleButton} onPress={() => onGoogleButtonPress().then(() => navigation.navigate('Home'))}>{/*success*/}
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
export default SignUpScreen;

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
    width: '125%',
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
    width: '95%',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 8.5,
  }
});