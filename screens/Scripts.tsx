import {useState} from 'react';
import { CommonActions } from '@react-navigation/native';
import { Dimensions, Alert, } from 'react-native';
import firestore from '@react-native-firebase/firestore';


export const frogDirectories = [
    {image: require('./../assets/tank_with_egg.png')},
    {image: require('./../assets/frogs/locked_frog.png')},
    {image: require('./../assets/frogs/dead_frog_thin.png')},
    {image: require('./../assets/frogs/default_frog.png')},
    {image: require('./../assets/frogs/blue_frog.png')},
    {image: require('./../assets/frogs/ocean_frog.png')},
    {image: require('./../assets/frogs/gray_frog.png')},
    {image: require('./../assets/frogs/purple_frog.png')},
    {image: require('./../assets/frogs/red_frog.png')},
    {image: require('./../assets/frogs/white_frog.png')},
    {image: require('./../assets/frogs/dark_gray_frog.png')},
    {image: require('./../assets/frogs/brown_frog.png')},
  ]

export const frogName = [
  "Tank with Egg",
  "Locked Frog",
  "Dead Frog",
  "Green Frog",
  "Blue Frog",
  "Ocean Frog",
  "Gray Frog",
  "Purple Frog",
  "Red Frog",
  "White Frog",
  "Dark Gray Frog",
  "Brown Frog"
]

export const frogRarity = [
  "osuhow?",
  "osuhow?",
  "osuhow?",
  "Common",
  "Common",
  "Uncommon",
  "Uncommon",
  "Rare",
  "Rare",
  "Legendary",
  "Epic",
  "Epic"
]

export function getRarityColour(frogID : number) {
  switch (true) {
    // Common
    case (frogID === 3 || frogID === 4): return "white"
    // Uncommon
    case (frogID === 5 || frogID === 6): return "#478E6D"
    // Rare
    case (frogID === 7 || frogID === 8): return "blue"
    // Epic
    case (frogID === 10 || frogID === 11): return "purple"
    // Legendary
    case (frogID === 9): return "#FFE7A1"
    default: return "black"
  }
}
export const defaultFrogIndex : number = 3;

const { height, width } = Dimensions.get('window')
export function dimensions() {

    var _borderRadius = Math.round((height + width) / 2),
        _height = Math.round(height),
        _width = Math.round(width)

    return { _borderRadius, _height, _width }
}

export function GachaNumberGenerator() {
    return Math.ceil(Math.random() * 100); //rolls 1 to 100
}

//matrix to determine gacha rolls
const gachamatrix : number[][] = [
  //frogs 0 to 8, 100 acts as failsafe
  [65,30, 5, 0, 0, 0, 0, 0, 0,100], //<30m
  [30,20,20,10,10,10, 0, 0, 0,100], //30m to 1h
  [20,10,10,15,15,15, 5, 5, 5,100], //1h to 2h
  [ 0, 0,10,20,20,20,10,10,10,100], //>2h
]

//determines which category to roll in
export const timeCat = (sec : number) => {
  switch (true) {
    case (sec < 30*60): return 0
    case (sec >= 30*60 && sec < 60*60): return 1
    case (sec >= 60*60 && sec < 120*60): return 2
    case (sec >= 120*60): return 3
    default: return 0
  }}


export function frogGacha(sec : number) {
  var roll = GachaNumberGenerator()
  console.log('roll' + roll)
  var result = 0
  var category = timeCat(sec)
  while (roll > 0) {
    roll = roll - gachamatrix[category][result]
    if (roll <= 0) {
      break
    } else {
      result++
    }}
    console.log('res' + result)
  if (result >= 9) {return defaultFrogIndex} //failsafe
  return result + defaultFrogIndex;
}

export const showAlert = (title : string, msg : string, button : string) =>
  Alert.alert(
    title,
    msg,
    [
      {
        text: button,
        style: 'default',
      },
    ],
  )
  
export const showAlertAction = (title : string, msg : string, button : string, action : () => Function) =>
  Alert.alert(
    title,
    msg,
    [
      {
        text: button,
        style: 'default',
        onPress: action,
      },
    ],
  )

export const showAlertConfirm = (title : string, msg : string, Nbutton : string, Pbutton: string, Naction : () => Function, Paction : () => Function) =>
  Alert.alert(
    title,
    msg,
    [
      {
        text: Nbutton,
        style: 'default',
        onPress: Naction,
      },
      {
        text: Pbutton,
        style: 'default',
        onPress: Paction,
      }
    ],
  )

export const parseFUID = (fuid : number) => 
  ("00000000" + fuid.toString()).slice(-8).replace(/(\d{4})(\d{4})/, "$1-$2")

// Returns formatted friends list
export function getFriends(friends : string[]) {
  const friendArray : any[] = []
  for (let i = 0; i < friends.length; i++) {
    firestore().collection('UserData').doc(friends[i]).get().then(documentSnapshot => {
      // if userdata does exist
      if (documentSnapshot.exists) {
        const friendUD = { uid: friends[i] ,name : documentSnapshot.get("name"), fuid : parseFUID(documentSnapshot.get("fuid")), pfp : documentSnapshot.get("pfp")};
        friendArray.push(friendUD)
      }})
  }
    return friendArray;
}

// Check if achievement unlocked
export function isUnlocked(progress: string) : boolean {
  const [current, total] = progress.split('/').map(Number);
  return current >= total;
}

// Returns formatted achievements list
export function getAchievements(mins : number, frogs : number[], friends : any[], achievements : number[]) {
  //Get data
  const numHours = Math.floor(mins/60);
  const numFrogs = frogs.reduce((x : number, y : number) => x + y, 0);
  const numFriends = friends.length;
  
  //Calculate progress
  function checkProgress(type : string, amount : number) {
    switch (type) {
      case 'hours': {
        return Math.min(numHours, amount) + '/' + amount
      }
      case 'frogs' : {
        return Math.min(numFrogs, amount) + '/' + amount
      }
      case 'friends' : {
        return Math.min(numFriends, amount) + '/' + amount
      }
      default : return '0/' + amount
    }
  }

  //Array to return
  const achievementArray = [
    {
      id: '1',
      name: 'Focus Time 1',
      description: 'Focus for 4 hours total',
      progress: checkProgress('hours', 4),
      claimed: false,
    },
    {
      id: '2',
      name: 'Focus Time 2',
      description: 'Focus for 8 hours total',
      progress: checkProgress('hours', 8),
      claimed: false,
    },
    {
      id: '3',
      name: 'Focus Time 3',
      description: 'Focus for 12 hours total',
      progress: checkProgress('hours', 12),
      claimed: false,
    },
    {
      id: '4',
      name: 'Focus Time 4',
      description: 'Focus for 16 hours total',
      progress: checkProgress('hours', 16),
      claimed: false,
    },
    {
      id: '5',
      name: 'Focus Time 5',
      description: 'Focus for 20 hours total',
      progress: checkProgress('hours', 20),
      claimed: achievements.includes(5),
    },
    {
      id: '6',
      name: 'Frog Growing 1',
      description: 'Grow 5 Frogs',
      progress: checkProgress('frogs', 5),
      claimed: false,
    },
    {
      id: '7',
      name: 'Frog Growing 2',
      description: 'Grow 10 Frogs',
      progress: checkProgress('frogs', 10),
      claimed: false,
    },
    {
      id: '8',
      name: 'Frog Growing 3',
      description: 'Grow 15 Frogs',
      progress: checkProgress('frogs', 15),
      claimed: false,
    },
    {
      id: '9',
      name: 'Frog Growing 4',
      description: 'Grow 20 Frogs',
      progress: checkProgress('frogs', 20),
      claimed: false,
    },
    {
      id: '10',
      name: 'Frog Growing 5',
      description: 'Grow 25 Frogs',
      progress: checkProgress('frogs', 25),
      claimed: achievements.includes(5),
    },
    {
      id: '11',
      name: 'Add Friend 1',
      description: 'Add 1 Friend',
      progress: checkProgress('friends', 1),
      claimed: false,
    },
    {
      id: '12',
      name: 'Add Friend 2',
      description: 'Add 2 Friends',
      progress: checkProgress('friends', 2),
      claimed: false,
    },
    {
      id: '13',
      name: 'Add Friend 3',
      description: 'Add 3 Friends',
      progress: checkProgress('friends', 3),
      claimed: false,
    },
    {
      id: '14',
      name: 'Add Friend 4',
      description: 'Add 4 Friends',
      progress: checkProgress('friends', 4),
      claimed: false,
    },
    {
      id: '15',
      name: 'Add Friend 5',
      description: 'Add 5 Friends',
      progress: checkProgress('friends', 5),
      claimed: false,
    },
  ];

  return achievementArray
}

export async function getLB() {
  let LBArray: any[] = [];

  const querySnapshot = await firestore().collection('UserData').where('mins', '>', 0).get();
  
  querySnapshot.forEach((queryDocumentSnapshot) => {
    LBArray.push({
      rank: 0,
      uid: queryDocumentSnapshot.get('uid'),
      name: queryDocumentSnapshot.get('name'),
      pfp: queryDocumentSnapshot.get('pfp'),
      hours: queryDocumentSnapshot.get('mins')
    });
  });
  
  LBArray = LBArray.sort((a, b) => b.hours - a.hours).slice(0,5)

  for (let i = 0; i < LBArray.length; i++) {
    LBArray[i].rank = i + 1;
  }

  return LBArray
}

export function getRankColor(rank : number) {
  switch (rank) {
    case 1:
      return '#ffd700';
    case 2:
      return '#d4d4d4';
    case 3:
      return '#cd7f32';
    default:
      return 'white'; // default color if rank doesn't match any case
  }
}