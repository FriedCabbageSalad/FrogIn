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
    {image: require('./../assets/frogs/golden_frog.png')},
    {image: require('./../assets/frogs/mysterious_frog.png')},
    {image: require('./../assets/frogs/rainbow_frog.png')},
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
  "Brown Frog",
  "Golden Frog",
  "Mysterious Frog",
  "Rainbow Frog",
]

export const frogRarity = [
  "osuhow?",
  "osuhow?",
  "osuhow?",
  "Common",
  "Common",
  "Uncommon",
  "Rare",
  "Rare",
  "Rare",
  "Legendary",
  "Epic",
  "Epic",
  "Mythic",
  "Mythic",
  "Mythic",
]

export const frogInfo = [
  //Default
  `Conservation Status:
  Least Concern

  Lithobates clamitans, commonly known as the green frog, is a North American species inhabiting freshwater environments. Distinguished by its dorsolateral ridges, it exhibits green or brown coloration.
  `,
  //Blue
  `Conservation Status:
  Not evaluated

  The blue poison dart frog (Dendrobates azureus), native to Suriname and Brazil, is known for its vibrant blue skin with black spots. Its toxic secretions deter predators, aiding its survival.
  `,
  //Ocean
  `Conservation Status:
  Least Concern

  The crab-eating frog (Fejervarya raja), is native to Southeast Asia. Remarkably, it can survive in saltwater environments, allowing it to inhabit coastal areas and mangroves.
  `,
  //Gray
  `Conservation Status:
  Least Concern

  The gray treefrog (Dryophytes versicolor), found in North America, exhibits remarkable color-changing abilities from gray to green. This arboreal amphibian's distinctive call and camouflage aid in predator evasion and mating.
  `,
  // Purple
  `Conservation Status:
  Near Threatened

  The purple frog (Nasikabatrachus sahyadrensis), endemic to India's Western Ghats, is notable for its bloated body and pointed snout. This fossorial species spends most of its life underground, emerging only to breed.
  `,
  // Red
  `Conservation Status:
  Least Concern

  The Strawberry poison-dart frog (Oophaga pumilio), found in Central America, displays bright red skin with varying patterns. This dendrobatid species produces potent toxins and is crucial for its ecological role.
  Bio`,
  // White
  `Conservation Status:
  Varied

  Albino frogs, characterized by their lack of pigment and distinctive white or yellow skin, suffer from genetic mutations affecting melanin production. These frogs are more sensitive to light and environmental conditions.
  `,
  // Dark Grey
  `Conservation Status:
  Vulnerable

  The black-banded rock frog (Melanobatrachus indicus), is an endemic species from India. Characterized by its dark coloration and distinctive banding, it inhabits rocky, forested environments and is part of the Dicroglossidae family.
  `,
  // Brown
  `Conservation Status:
  Near Threatened

  The coronated tree frog (Triprion spinosus), found in Central America, features distinctive spines and a pronounced crown-like structure on its head. It inhabits humid forests and displays unique, colorful patterns.
  `,
  // Golden
  `Conservation Status:
  ???

  The golden mythic frog, born from enchanted moonlight in ancient forests, glows with a celestial hue. Its shimmering skin is said to bring good fortune and wisdom to those who glimpse it.
  `,
  // Mysterious
  `Conservation Status:
  ???

  The enigmatic mysterious frog, cloaked in deep black scales, is said to be a relic of ancient magic. Legends tell of its creation by moonlit sorcery, guarding secrets of forgotten realms.
  `,
  // Rainbow
  `Conservation Status:
  ???

  The mythical rainbow frog, born from a cosmic rainbow that touched Earth, dazzles with its vibrant, shifting colors. Legends say it grants wishes to those pure of heart who encounter it.
  `,
]

export function getRarityColour(frogID : number) {
  switch (true) {
    // Common
    case (frogID === 3 || frogID === 4): return "white"
    // Uncommon
    case (frogID === 5): return "#478E6D"
    // Rare
    case (frogID === 6 || frogID === 7 || frogID === 8): return "blue"
    // Epic
    case (frogID === 10 || frogID === 11): return "purple"
    // Legendary
    case (frogID === 9): return "#FFE7A1"
    // Mythic
    case (frogID === 12 || frogID === 13 || frogID === 14) : return 'red'
    // Default
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

export const showAlertConfirm = (title : string, msg : string, Nbutton : string, Pbutton: string, Naction : () => any, Paction : () => any) =>
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
export async function getFriends(friends : string[]) {
  const friendArray : any[] = []
  for (let i = 0; i < friends.length; i++) {
    await firestore().collection('UserData').doc(friends[i]).get().then(documentSnapshot => {
      // if userdata does exist
      if (documentSnapshot.exists) {
        const friendUD = { uid: friends[i], 
          name : documentSnapshot.get("name"), 
          fuid : parseFUID(documentSnapshot.get("fuid")), 
          pfp : documentSnapshot.get("pfp"),
          mins : documentSnapshot.get("mins"),
          frogs: documentSnapshot.get("frogs"),
          achievements: documentSnapshot.get("achievements"),};
        friendArray.push(friendUD)
      }})
  }
  console.log('getfriends called and returned')
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
      claimed: achievements.includes(10),
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
      claimed: achievements.includes(15),
    },
  ];
  console.log('getachievements called and returned')
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
  console.log('getlb called and returned')
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
      return 'white';
  }
}