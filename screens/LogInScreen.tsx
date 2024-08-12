import * as React from 'react';
import { Button, View, Text, ImageBackground, TouchableOpacity, TextInput, StyleSheet, Image, ScrollView } from 'react-native';
import { dimensions, showAlert, showAlertAction, showAlertConfirm } from './../screens/Scripts.tsx';
import auth from '@react-native-firebase/auth';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';

//token for firebase backend
GoogleSignin.configure({
  webClientId: '843583618218-6lp78r9qb51e647tkmib9pt5m5ev667q.apps.googleusercontent.com',
});

async function onGoogleButtonPress() {
  // Check if your device supports Google Play
  await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
  // Get the users ID token
  const { idToken } = await GoogleSignin.signIn();
  // Create a Google credential with the token
  const googleCredential = auth.GoogleAuthProvider.credential(idToken);
  // Sign-in the user with the credential
  return auth().signInWithCredential(googleCredential);
}

function LogInScreen({navigation}: {navigation: any}) {
  const [text, onChangeText] = React.useState('');
  const [text2, onChangeText2] = React.useState('');
  return (
      <ImageBackground source={require('./../assets/background.png')} resizeMode='cover' style={styles.container}>
        <View style={{position: 'absolute', left: 0, borderRadius: 10, margin: 7, padding: 3, backgroundColor: '#516D67', zIndex: 1}}>  
          <TouchableOpacity
              onPress={() => navigation.goBack()}>
              <Image source={require('./../assets/left_arrow.png')} resizeMode='contain' style={{width: 30, height: 30}}/>
          </TouchableOpacity>
        </View>
      <ScrollView contentContainerStyle={[styles.scrollViewContent, {zIndex: 2}]}>
        <View>
            {/* Application Name and Logo */}
            <View style={styles.headerContainer}>
              <Text style={styles.header}>FrogIn</Text>
              <Text style={{fontSize: 5}}> </Text>
              <Image source={require('./../assets/default_frog.png')} resizeMode='stretch' style={styles.logo}/>
            </View>

            {/* Log In Features */}
            <View style={styles.loginContainer}>
              <Text style={styles.h2}>Login</Text>
              <Text style={styles.h3}>Enter your email and password</Text>

              {/* Email Input */}
              <TextInput
                style={styles.input}
                onChangeText={onChangeText}
                value={text}
                placeholder="email@domain.com"
                placeholderTextColor={"#888"}
              />

              {/* Password Input */}
              <TextInput
                style={styles.input}
                onChangeText={onChangeText2}
                value={text2}
                secureTextEntry={true}
                placeholder="Password"
                placeholderTextColor={"#888"}
              />
              {/* Log In Button */}
              <TouchableOpacity style={styles.signUpButton} onPress={() => {
                    if (text == "" || text2 == "") {
                      showAlert('Error','Please enter an email and password','OK')
                    } else {
                    auth()
                    .signInWithEmailAndPassword(text, text2)
                    .then(() => {
                      //success
                      navigation.navigate('Home')
                    })
                    .catch(error => {
                      if (error.code === 'auth/invalid-email') {
                        showAlert('Invalid email address!','','OK');
                      }
                      else if (error.code === 'auth/wrong-password') {
                        showAlert('Wrong password!','','OK');
                      }
                      else if (error.code === 'auth/user-not-found') {
                        showAlertAction('Account not found','','Sign Up for FrogIn',() => navigation.navigate('SignUp'));
                      }
                      else {
                        //console.error(error);
                      }
                    })
                  }
                  }}>
                    <Text style={{color: 'white', justifyContent: 'center', alignItems: 'center' }}>Log In</Text>
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
              <TouchableOpacity style={[styles.googleButton, {alignSelf: 'center'}]} onPress={() => onGoogleButtonPress().then(() => navigation.navigate('Home'))}>
                <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                  <Image source={require('./../assets/google.jpg')} style={{height: '150%', width: '10%'}} resizeMode='contain'/>
                  <Text style={{color: 'black', paddingHorizontal: '2%'}}>Google</Text>
                </View>
              </TouchableOpacity>
                <View>
                  <Text style={styles.TOS}>By clicking continue, you agree to our{"\n"}Terms of Service and Privacy Policy</Text>
                <View style={styles.loginPrompt}>
                  <Text style={styles.TOS}>Forgot your password?</Text>
                  <TouchableOpacity style={styles.logInButton} onPress={() => (text == '') ?
                    showAlert('Please enter your email.','','OK') :
                    auth().sendPasswordResetEmail(text).then(
                      () => {
                        //success
                        showAlert('Password reset email has been sent!','Please check ' + text,'OK')
                      })
                      .catch(error => {
                        if (error.code === 'auth/invalid-email') {
                          showAlert('Invalid email address!','','OK');
                        }
                        else if (error.code === 'auth/user-not-found') {
                          showAlertConfirm('Account not found','','Sign Up for Frog In','Try another email',() => navigation.navigate('SignUp'),()=> {});
                        }
                        else {
                          //console.error(error);
                        }
                      })
                    }>
                    <Text style={styles.logInText}>Reset Password</Text>
                  </TouchableOpacity>
                </View>
                </View>
        </ScrollView>
      </ImageBackground>
  );
}
export default LogInScreen;

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
    padding: 5,
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
    marginTop: 10,
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
    marginVertical: dimensions()._height * -0.1,
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
    height: 80,
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
  googleButton: {
    width: '80%',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 8.5,
  },
  loginPrompt: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
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