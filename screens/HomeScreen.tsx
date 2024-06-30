import * as React from 'react';
import { useState, useEffect } from 'react';
import { Button, View, Text } from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

//page store for userdata
let ud : any[];
export function UpdateProfile(index: number, data: string) {
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
    
    // gets userdata from server and create userdata if it doesnt exist
    const userdata = firestore().collection('UserData').doc(user.uid).get().then(documentSnapshot => {
      if (!documentSnapshot.exists) {
          firestore().collection('UserData').get().then(querySnapshot => {
            firestore().collection('UserData').doc(user.uid).set({UID:user.uid, name:"test", friendlyUID: querySnapshot.size, mins: 0, frogs: [0], achievements: [0], friends: ["John Smith", "0000-0000", 0]})
          })
        }
      return firestore().collection('UserData').doc(user.uid).get()
    })

    //parse userdata into arrays of array to send to other screens
    async function parseud() {
      ud = [
        await userdata.then(documentSnapshot => documentSnapshot.get("UID")),
        await userdata.then(documentSnapshot => documentSnapshot.get("name")),
        await userdata.then(documentSnapshot => documentSnapshot.get("friendlyUID")),
        await userdata.then(documentSnapshot => documentSnapshot.get("mins")),
        await userdata.then(documentSnapshot => documentSnapshot.get("frogs")),
        await userdata.then(documentSnapshot => documentSnapshot.get("achievements")),
        await userdata.then(documentSnapshot => documentSnapshot.get("friends")),
      ];
      console.log(ud[1]);
    }
    parseud();
    
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
          onPress={() => navigation.navigate('Lock')}/>

        <Button title="Profile"
          onPress={() => navigation.navigate('Profile', {userdata: ud})}/>

        <Button title="FriendsList"
          onPress={() => navigation.navigate('FriendsList')}/>

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