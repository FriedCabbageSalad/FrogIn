import * as React from 'react';
import { Button, View, Text, ImageBackground, TouchableOpacity, TextInput, StyleSheet, Image, ScrollView } from 'react-native';
import { dimensions, showAlert, showAlertAction } from './../screens/Scripts.tsx';
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
  return (
    <ImageBackground source={require('./../assets/background.png')} resizeMode='cover' style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <View>
        {/* Application Name and Logo */}
        <View style={styles.headerContainer}>
          <Text style={styles.header}>FrogIn</Text>
          <Image source={require('./../assets/default_frog.png')} resizeMode='contain' style={styles.logo}/>
        </View>

        {/* Log In Features */}
        <View style={styles.loginContainer}>
          <Text style={styles.h2}>Create Account</Text>
          <Text style={styles.h3}>Enter your email to get started now!</Text>
          
          {/* Email Input */}
          <TextInput
            style={styles.input}
            onChangeText={onChangeText}
            value={text}
            placeholder="email@domain.com"
            placeholderTextColor={"#888"}
          />
          {/* Sign Up Button */}
          <TouchableOpacity style={styles.signUpButton} onPress={() => {
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
                    else { //success
                      navigation.navigate('Password', {emailstring: text})
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
                };
              }}>
              <Text style={{color: 'white', justifyContent: 'center', alignItems: 'center' }}>Sign Up</Text>
            </TouchableOpacity>
        </View>
      </View>

        {/* Divider with text in the middle */}
        <View style={styles.divider}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>or continue with</Text>
          <View style={styles.dividerLine} />
        </View>

        {/* Google sign up button */}
        <View style={{alignItems: 'center'}}>
          <TouchableOpacity 
            style={styles.googleButton} 
            onPress={() => onGoogleButtonPress().then(() => navigation.navigate('Home'))} //success
          >
            <View style={styles.googleButtonContent}>
              <Image source={require('./../assets/google.jpg')} style={styles.googleIcon} resizeMode='contain'/>
              <Text style={{color: 'black'}}>Google</Text>
            </View>
          </TouchableOpacity>
          </View>

        <View>
          <Text style={styles.TOS}>By clicking continue, you agree to our{"\n"}Terms of Service and Privacy Policy</Text>
          <View style={styles.loginPrompt}>
            <Text style={styles.TOS}>Already have an account?</Text>
            <TouchableOpacity style={styles.logInButton} onPress={() => navigation.navigate('LogIn')}>
              <Text style={styles.logInText}>Log In</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
}

export default SignUpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'space-between',
    padding: 20,
  },
  headerContainer: {
    alignItems: 'center',
    marginTop: 10,
  },
  header: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 48,
    fontFamily: 'serif',
    padding: 5
  },
  loginContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  signUpButton: {
    width: '80%',
    alignItems: 'center',
    backgroundColor: 'black',
    padding: 10,
    borderRadius: 8.5,
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
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: 'white',
  },
  dividerText: {
    width: 120,
    textAlign: 'center',
    color: 'white',
  },
  googleButtonContent: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  googleIcon: {
    height: 24,
    width: 24,
    marginRight: 10,
  },
  loginPrompt: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  TOS: {
    color: 'black',
    fontSize: 13,
    fontFamily: 'Sans-serif',
    padding: 5,
    paddingBottom: 10,
    textAlign: 'center',
  },
  logo: {
    width: 100,
    height: 100,
  },
  input: {
    width: '80%',
    height: 40,
    margin: 12,
    borderWidth: 0,
    padding: 10,
    paddingLeft: 20,
    borderRadius: 8.5,
    backgroundColor: 'white',
    color: 'black',
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
  },
  logInButton: {
    alignSelf: 'center'
  },
  logInText: {
    color: 'blue',
    fontSize: 13,
    fontFamily: 'Sans-serif',
    paddingBottom: 5,
    textDecorationLine: 'underline'
  }
});