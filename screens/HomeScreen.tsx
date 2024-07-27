import * as React from 'react';
import { useState, useEffect, useRef } from 'react';
import { Button, View, Text, ImageBackground, Image, StyleSheet } from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { defaultFrogIndex } from './../screens/Scripts.tsx'
import { useNavigation, useIsFocused } from '@react-navigation/native';

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
    case "achievements": return 7
    case "friends": return 8
    default: return 9
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

//updating userdata backend only
export function updateBE(uid : string, field : string, data: any) {
  const fieldPath = new firestore.FieldPath(field)
  firestore().collection('UserData').doc(uid).update(fieldPath,  data)
}

function HomeScreen({navigation}: {navigation: any}) {

  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState<any>(null);
  const isFocused = useIsFocused();
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Auth 
  useEffect(() => {
    const subscriber = auth().onAuthStateChanged((user: any) => {
      setUser(user);
      setInitializing(false);
    });
    return subscriber; // unsubscribe on unmount
  }, []);

  // // Load ud when user detected
  // useEffect(() => {
  //   if (user) {
  //     loadUD();
  //   }
  // }, [user]);

  // Timer for loading and redirect
  useEffect(() => {
    console.log('loading screen effect ran')
    if (isFocused && user) {
      console.log('loading ud')
      loadUD();
      console.log('ud loaded')
      timerRef.current = setTimeout(() => {
        navigation.navigate('FrogPond');
      }, 2000);
    }
    if (isFocused && !user) {
      timerRef.current = setTimeout(() => {
        navigation.navigate('SignUp');
      }, 2000);
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [isFocused, navigation, user]);

  // Function to load and store ud
  async function loadUD() {
    await firestore().collection('UserData').doc(user.uid).get().then(documentSnapshot => {
      if (!documentSnapshot.exists) {
        firestore().collection('UserData').get().then(querySnapshot => {
          firestore().collection('UserData').doc(user.uid).set({
            uid: user.uid,
            email: user.email,
            name: "user " + querySnapshot.size,
            fuid: querySnapshot.size,
            pfp: defaultFrogIndex,
            mins: 0,
            frogs: [0,0,0,0,0,0,0,0,0],
            achievements: [],
            friends: []
          });
          ud = [user.uid, user.email, "user " + querySnapshot.size, querySnapshot.size, defaultFrogIndex, 0, [0,0,0,0,0,0,0,0,0], [], []];
        });
      } else {
        let uidStore = documentSnapshot.get("uid");
        let emailStore = documentSnapshot.get("email");
        let nameStore = documentSnapshot.get("name");
        let fuidStore = documentSnapshot.get("fuid");
        let pfpStore = documentSnapshot.get("pfp");
        let minsStore = documentSnapshot.get("mins");
        let frogsStore = documentSnapshot.get("frogs");
        let achievementsStore = documentSnapshot.get("achievements");
        let friendsStore = documentSnapshot.get("friends");
        //safety checks for userdata
        if (uidStore != user.uid) {updateBE(user.uid,'user',user.uid); uidStore = user.uid}
        if (emailStore != user.email) {updateBE(user.uid,'email',user.email); emailStore = user.email}
        if (typeof nameStore === 'undefined') {updateBE(user.uid,'name','user'); nameStore = 'user'}
        if (typeof(pfpStore) !== 'number') {updateBE(user.uid,'pfp',defaultFrogIndex); pfpStore = defaultFrogIndex}
        if (typeof(minsStore) !== 'number') {updateBE(user.uid,'mins',0); minsStore = 0}
        if (!Array.isArray(frogsStore)) {updateBE(user.uid,'frogs',[0,0,0,0,0,0,0,0,0]); frogsStore = [0,0,0,0,0,0,0,0,0]}
        if (!Array.isArray(achievementsStore)) {updateBE(user.uid,'achievements',[]); achievementsStore = []}
        if (!Array.isArray(friendsStore)) {updateBE(user.uid,'friends',[]); friendsStore = []}
        ud = [
          uidStore,
          emailStore,
          nameStore,
          fuidStore,
          pfpStore,
          minsStore,
          frogsStore,
          achievementsStore,
          friendsStore
        ];
      }
    });
  }

  if (initializing) return <Text style={{fontSize: 40}}></Text>;

  return (
      // <Text style={{fontSize: 40}}>WORK IN PROGRESS</Text>
      // <Text style={{fontSize: 20}}>This is a Test Home Screen</Text>
      // <Text style={{fontSize: 20}}>Welcome</Text>

      // <Button title="Log In"
      //   onPress={() => navigation.navigate('LogIn')}/>
      
      // <Button title="Sign Up"
      //   onPress={() => navigation.navigate('SignUp')}/>
      
      // <Button title="Password"
      //   onPress={() => navigation.navigate('Password')}/>

      // <Button title="Settings"
      //   onPress={() => navigation.navigate('Settings')}/>

      // <Button title="Lock"
      //   onPress={() => navigation.navigate('Lock')}/>

      // <Button title="Profile"
      //   onPress={() => navigation.navigate('Profile')}/>

      // <Button title="FriendsList"
      //   onPress={() => navigation.navigate('FriendsList')}/>

      // <Button title="FrogPond"
      //   onPress={() => navigation.navigate('FrogPond')}/>
      
      // <Button title="Leaderboard"
      //   onPress={() => navigation.navigate('Leaderboard')}/>

      // <Button title="Log Out"
      //   onPress={() => auth()
      //     .signOut()
      //     .catch(error => {})
      //     }/>

    <ImageBackground source={require('./../assets/loading_background.png')} resizeMode='cover' style={styles.imageSizing}>

      {/* Application Name and Logo */}
      <View style={{position: 'absolute', top: 70, justifyContent: 'center',alignItems: 'center', alignSelf: 'center'}}>
        <Text style={styles.header}>FrogIn</Text>
        <Image source={require('./../assets/default_frog.png')} resizeMode='contain' style={styles.logo}/>
      </View>

      <View style={{position: 'relative', justifyContent: 'center',alignItems: 'center', alignSelf: 'center'}}>
        {/* <Text style={{fontSize: 28, fontWeight: 'bold', color: 'white'}}>Loading</Text> */}
        {/* <Image source={require('./../assets/loading_circle.png')} style={{width: dimensions()._width * 0.5, height: dimensions()._width * 0.5}} resizeMode='stretch'/> */}
      </View>

    </ImageBackground>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({
  header: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 48,
    fontFamily: 'serif',
    padding: 5,
  },
  logo: {
    width: '90%',
    height: '120%',
  },
  imageSizing: {
    width: '100%',
    height: '100%'
  },
});