import * as React from 'react';
import { useState, useEffect } from 'react';
import { Button, View, Text } from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {defaultFrogIndex} from './../screens/Scripts.tsx'

//userdata storage
let ud : any[];

//converts field into index
function fieldToIndex(name : string) : number {
  switch (name) {
    case "uid": return 0
    case "email": return 1
    case "name": return 2
    case "fuid": return 3
    case "pfp": return 4
    case "mins": return 5
    case "frogs": return 6
    case "achivements": return 7
    case "friends": return 8
    default: return 0
  }
}

//sending userdata to other components
export function getUD(field : string) {
  return ud[fieldToIndex(field)]
}

//updating userdata
export function updateUD(field : string, data: any) {
  ud[fieldToIndex(field)] = data
  const fieldPath = new firestore.FieldPath(field)
  firestore().collection('UserData').doc(ud[0]).update(fieldPath,  data)
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
        // if userdata doesnt exist, create, and update ud
        if (!documentSnapshot.exists) {
            firestore().collection('UserData').get().then(querySnapshot => {
              firestore().collection('UserData').doc(user.uid).set({uid:user.uid, email:user.email, name: "user " + querySnapshot.size, fuid: querySnapshot.size, pfp: defaultFrogIndex, mins: 0, frogs: [0,0,0,0,0,0,0,0,0], achievements: [], friends: []})
              ud = [user.uid, user.email, "user " + querySnapshot.size, querySnapshot.size, defaultFrogIndex, 0, [0,0,0,0,0,0,0,0,0], [], []]
            })
          }
          // else load data from document into ud
          else {
            ud = [
              documentSnapshot.get("uid"),
              documentSnapshot.get("email"),
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
          onPress={() => navigation.navigate('Profile')}/>

        <Button title="FriendsList"
          onPress={() => navigation.navigate('FriendsList')}/>

        <Button title="FrogPond"
          onPress={() => navigation.navigate('FrogPond')}/>
        
        <Button title="Leaderboard"
          onPress={() => navigation.navigate('Leaderboard')}/>

        <Button title="Test"
          onPress={() => navigation.navigate('AchievementList')}/>

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