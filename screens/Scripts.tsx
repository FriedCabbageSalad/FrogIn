export const frogDirectories = [
    {image: require('./../assets/tank_with_egg.png')},
    {image: require('./../assets/frogs/default_frog.png')},
    {image: require('./../assets/frogs/blue_frog.png')},
    {image: require('./../assets/frogs/ocean_frog.png')},
    {image: require('./../assets/frogs/gray_frog.png')},
    {image: require('./../assets/frogs/purple_frog.png')},
    {image: require('./../assets/frogs/red_frog.png')},
  ]

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