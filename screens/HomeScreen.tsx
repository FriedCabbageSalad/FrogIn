import * as React from 'react';
import { useState, useEffect } from 'react';
import { Button, View, Text } from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

function HomeScreen({navigation}: {navigation: any}) {
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  // Handle user state changes
  function onAuthStateChanged(user: any) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return (
  <Text style={{fontSize: 40}}>LOADING</Text>
  );

  //user not logged in
  if (!user) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{fontSize: 40}}>WORK IN PROGRESS</Text>
      <Text style={{fontSize: 20}}>This is a Test Home Screen</Text>

      <Button title="Log In"
        onPress={() => navigation.navigate('LogIn')}/>
      
      <Button title="Sign Up"
        onPress={() => navigation.navigate('SignUp')}/>
    </View>
    );
  }

  //user logged in
  if (user) {
    // gets userdata from server and create userdata if it doesnt exist
    const userdata = firestore().collection('UserData').doc(user.uid).get().then(documentSnapshot => {
      if (!documentSnapshot.exists) {
          firestore().collection('UserData').get().then(querySnapshot => {
            console.error('Total users: ', querySnapshot.size);
            firestore().collection('UserData').doc(user.uid).set({UID:user.uid, name:"test", friendlyUID: querySnapshot.size, mins: 0, frogs: 0, achievements: [0], friends: ["Johnny", 0]})
          })
        }
      return firestore().collection('UserData').doc(user.uid).get()
    })
    .then(documentSnapshot => documentSnapshot.data());

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{fontSize: 40}}>WORK IN PROGRESS</Text>
        <Text style={{fontSize: 20}}>This is a Test Home Screen</Text>

        <Button title="Log In"
          onPress={() => navigation.navigate('LogIn')}/>
        
        <Button title="Sign Up"
          onPress={() => navigation.navigate('SignUp')}/>
        
        <Button title="Password"
          onPress={() => navigation.navigate('Password')}/>

        <Button title="Settings"
          onPress={() => navigation.navigate('Settings')}/>

        <Button title="Lock"
          onPress={() => navigation.navigate('Lock', {userdata: userdata})}/>

        <Button title="Profile"
          onPress={() => navigation.navigate('Profile', {userdata: userdata})}/>

        <Button title="FriendsList"
          onPress={() => navigation.navigate('FriendsList', {userdata: userdata})}/>

        <Button title="Log Out"
          onPress={() => auth()
            .signOut()
            .catch(error => {})
            }/>
      </View>
    );
  }
}

export default HomeScreen;