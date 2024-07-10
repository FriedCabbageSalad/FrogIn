import * as React from 'react';
import { useState, useEffect } from 'react';
import { Button, View, Text } from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

//page store for userdata
let ud : any[];

export function UpdateProfile(index: number, data: any) {
  ud[index] = data
}

function HomeScreen({navigation}: {navigation: any}) {

  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState<any>([]);

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
    
    // userdata processing
    function loadUD() { 
      firestore().collection('UserData').doc(user.uid).get().then(documentSnapshot => {
        // if userdata doesnt exis, create, and update ud
        if (!documentSnapshot.exists) {
            firestore().collection('UserData').get().then(querySnapshot => {
              firestore().collection('UserData').doc(user.uid).set({uid:user.uid, name: "user " + querySnapshot.size, fuid: querySnapshot.size, pfp: 0, mins: 0, frogs: [0], achievements: [0], friends: ["John Smith", "0000-0000", 0]})
              ud = [user.uid, "user " + querySnapshot.size, querySnapshot.size, 0, 0, [0], [0], ["John Smith", "0000-0000", 0]]
            })
          }
          // else load data from document into ud
          else {
            ud = [
              documentSnapshot.get("uid"),
              documentSnapshot.get("name"),
              documentSnapshot.get("fuid"),
              documentSnapshot.get("pfp"),
              documentSnapshot.get("mins"),
              documentSnapshot.get("frogs"),
              documentSnapshot.get("achievements"),
              documentSnapshot.get("friends"),
            ];
          }
          return documentSnapshot;
      })
    }
    loadUD();
    
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{fontSize: 40}}>WORK IN PROGRESS</Text>
        <Text style={{fontSize: 20}}>This is a Test Home Screen</Text>
        <Text style={{fontSize: 20}}>Welcome</Text>

        {/* <Button title="Log In"
          onPress={() => navigation.navigate('LogIn')}/>
        
        <Button title="Sign Up"
          onPress={() => navigation.navigate('SignUp')}/>
        
        <Button title="Password"
          onPress={() => navigation.navigate('Password')}/> */}


        <Button title="Settings"
          onPress={() => navigation.navigate('Settings')}/>

        <Button title="Lock"
          onPress={() => navigation.navigate('Lock')}/>

        <Button title="Profile"
          onPress={() => {navigation.navigate('Profile', {userdata: ud})}}/>

        <Button title="FriendsList"
          onPress={() => navigation.navigate('FriendsList')}/>


        <Button title="FrogPond"
          onPress={() => navigation.navigate('FrogPond')}/>

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