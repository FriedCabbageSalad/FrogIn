import { Dimensions } from 'react-native';

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

export const defaultFrogIndex = 3;

const { height, width } = Dimensions.get('window')
export function dimensions() {

    var _borderRadius = Math.round((height + width) / 2),
        _height = Math.round(height),
        _width = Math.round(width)

    return { _borderRadius, _height, _width }
}

  function GachaNumberGenerator() {
    return Math.floor(Math.random() * 100);
}

// Green Frog 65%
// Blue Frog 30%
// Ocean Frog 5%
export function BaseGacha() {
    const roll = GachaNumberGenerator();
    console.log(roll);
    switch (true) {
        case (roll <= 5):
            console.log("ocean");
            return 3
            break;
        case (roll > 5 && roll <= 35):
            console.log("blue");
            return 2
            break;
        case (roll > 35):
            console.log("green");
            return 1
            break;
        default:
            console.log("defaulted");
            return 0
    }
}