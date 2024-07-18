import { Dimensions, Alert } from 'react-native';

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