import * as React from 'react';
import { Button, View, Text, ImageBackground, TouchableOpacity, TextInput, StyleSheet, Image, ScrollView } from 'react-native';
import auth from '@react-native-firebase/auth';
import { dimensions, showAlert, showAlertAction } from './../screens/Scripts.tsx'

function PasswordScreen({route, navigation}: {route: any, navigation: any}) {
  //email from previous screen
  const text4 = route.params.emailstring;
  // text = Username, text2 = password, text 3 is confirm password
  const [text2, onChangeText2] = React.useState('');
  const [text3, onChangeText3] = React.useState('');
  const Separator = () => <View style={styles.separator} />;

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <ImageBackground source={require('./../assets/background.png')} resizeMode='cover' style={styles.imageSizing}>
      <View style={{position: 'absolute', left: 0, borderRadius: 10, margin: 7, padding: 3, backgroundColor: '#516D67', zIndex: 1}}>  
          <TouchableOpacity
              onPress={() => navigation.goBack()}>
              <Image source={require('./../assets/left_arrow.png')} resizeMode='contain' style={{width: 30, height: 30}}/>
          </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={[styles.scrollViewContent, {zIndex : 2}]}>
        <View>
        {/* Application Name and Logo */}
        <View style={styles.headerContainer}>
          <Text style={styles.header}>FrogIn</Text>
          <Image source={require('./../assets/default_frog.png')} resizeMode='contain' style={styles.logo}/>
        </View>
        <Separator/>
          {/* Sign Up Fields */}
          <View style={{justifyContent: 'center',alignItems: 'center', alignSelf: 'center', width: '100%'}}>
              <TextInput
              style={styles.input}
              onChangeText={onChangeText2}
              value={text2}
              placeholder="Password"
              placeholderTextColor={"#888"}
            />
              <TextInput
              style={styles.input}
              onChangeText={onChangeText3}
              value={text3}
              placeholder="Confirm Password"
              placeholderTextColor={"#888"}
            />

            <Separator/>
            
            {/* Confirmation Button */}
            <TouchableOpacity style={styles.signUpButton} onPress={() => {

              if (text2 == "" || text3 == "") {
                showAlert("Please enter a password", "", "OK")
              }
              else if(text2 != text3) {
                showAlert("Passwords do not match", "", "OK")
              }
              else {
                auth()
                .createUserWithEmailAndPassword(text4, text2)
                .then(() => {
                  // success
                  navigation.navigate('Home')
                })
                .catch(error => {
                  if (error.code === 'auth/weak-password') {
                    showAlert("Weak Password","Choose a longer one","OK")
                  };
                })
            };
            }}>
                <Text style={{color: 'white', paddingHorizontal: '2%', justifyContent: 'center', alignItems: 'center' }}>Sign Up</Text>
            </TouchableOpacity>
          </View>
          </View>
          <View></View>
        </ScrollView>
      </ImageBackground>
    </View>
  );
}
export default PasswordScreen;

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
  imageSizing: {
    width: '100%',
    height: '100%'
  },
  header: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 48,
    fontFamily: 'serif',
    padding: 5
  },
  logo: {
    width: 100,
    height: 100,
  },
  input: {
    width: "80%",
    height: 40,
    margin: 12,
    borderWidth: 0,
    padding: 10,
    paddingLeft: 20,
    borderRadius: 8.5,
    backgroundColor: 'white',
    color: 'black',
  },
  signUpButton: {
    width: '80%',
    alignItems: 'center',
    backgroundColor: 'black',
    padding: 10,
    borderRadius: 8.5,
  },
  separator: {
    marginVertical: '3%',
  },
});