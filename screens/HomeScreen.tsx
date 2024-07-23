import * as React from 'react';
import { useState, useEffect, useRef } from 'react';
import { Button, View, Text } from 'react-native';
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

  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState<any>(null);
  const isFocused = useIsFocused();
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged((user: any) => {
      setUser(user);
      setInitializing(false);
    });
    return subscriber; // unsubscribe on unmount
  }, []);

  useEffect(() => {
    if (user) {
      loadUD();
    }
  }, [user]);

  useEffect(() => {
    if (isFocused && user) {
      timerRef.current = setTimeout(() => {
        navigation.navigate('FrogPond');
      }, 1000);
    }
    if (isFocused && !user) {
      timerRef.current = setTimeout(() => {
        navigation.navigate('SignUp');
      }, 1000);
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [isFocused, navigation, user]);

  function loadUD() {
    firestore().collection('UserData').doc(user.uid).get().then(documentSnapshot => {
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
    });
  }

  if (initializing) return <Text style={{fontSize: 40}}></Text>;

  //user logged in
  if (user) {
    // userdata processing
    loadUD();
  }

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{fontSize: 40}}>WORK IN PROGRESS</Text>
      <Text style={{fontSize: 20}}>This is a Test Home Screen</Text>
      <Text style={{fontSize: 20}}>Welcome</Text>

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
        onPress={() => navigation.navigate('Profile')}/>

      <Button title="FriendsList"
        onPress={() => navigation.navigate('FriendsList')}/>

      <Button title="FrogPond"
        onPress={() => navigation.navigate('FrogPond')}/>
      
      <Button title="Leaderboard"
        onPress={() => navigation.navigate('Leaderboard')}/>

      <Button title="Log Out"
        onPress={() => auth()
          .signOut()
          .catch(error => {})
          }/>
    </View>
  );
}

export default HomeScreen;