import React, {useState} from 'react';

import { 
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';

import { TimerPicker } from "react-native-timer-picker";

const { height, width } = Dimensions.get('window')
var newDuration = {
    hours: 0,
    minutes: 0,
    seconds: 0
};

function dimensions() {

    var _borderRadius = Math.round((height + width) / 2),
        _height = Math.round(height),
        _width = Math.round(width)

    return { _borderRadius, _height, _width }
}

function LockScreen({ navigation}: {navigation: any}) {

    const [showPicker, setShowPicker] = useState(false);
    const [alarmString, setAlarmString] = useState<
            string | null
        >(null);
    
    return (
        <View style={styles.background}>
            {/* Container for rest */}
            <View style={{ flex: 12, alignItems: 'center', justifyContent: 'center' }}>
                
                <View style={styles.outerCircle}>
                    <View style={styles.innerCicle}>
                        <Image source={require('./../assets/tank_with_egg.png')} style={styles.tank} resizeMode='stretch'/>
                    </View>
                </View>

                <View style={styles.timerView}>
                    <TimerPicker
                        onDurationChange={(currDuration) =>
                            newDuration = currDuration
                        }
                        padWithNItems={1}
                        hourLabel=":"
                        minuteLabel=""
                        secondLabel=""
                        hideSeconds
                        clickSoundAsset={require('./../assets/select_click.mp3')}
                        styles={{
                            theme: "dark",
                            backgroundColor: "#478E6D",
                            pickerItem: {
                                fontSize: 34,
                            },
                            pickerLabel: {
                                fontSize: 32,
                                marginTop: 0,
                            },
                            pickerContainer: {
                                marginRight: 6,
                            },
                            pickerItemContainer: {
                                width: 100
                            },
                            pickerLabelContainer: {
                                right: -20,
                                top: 0,
                                bottom: 6,
                                width: 40,
                                alignItems: "center",
                            },
                        }}
                    />
                </View>

                <View style={{alignItems: 'center', justifyContent: 'center', marginTop: '4%'}}>
                    <TouchableOpacity 
                        onPress={() => {

                        }
                    } style={styles.button}>
                        <Text style={{color: 'white', fontSize: 18}}>Start</Text>
                    </TouchableOpacity>
                </View>

            </View>

            {/* Space reserved for navbar */}
            <View style={styles.navbar}>

            </View>
        </View>
    );
}
export default LockScreen;

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: "#478E6D",
    },
    navbar: {
        flex: 1,
        backgroundColor: "#516D67",
    },
    outerCircle: {
        width: dimensions()._height * 0.25,
        height: dimensions()._height * 0.25,
        borderRadius: dimensions()._borderRadius,
        backgroundColor: '#C8B88A',
        alignItems: 'center',
        justifyContent: 'center'
    },
    innerCicle: {
        width: dimensions()._height * 0.218,
        height: dimensions()._height * 0.218,
        borderRadius: dimensions()._borderRadius,
        backgroundColor: '#AEA085',
        alignItems: 'center',
        justifyContent: 'center'
    },
    button: {
        width: '75%',
        alignItems: 'center',
        backgroundColor: '#4E66E3',
        padding: 10,
        paddingHorizontal: '10%',
        borderRadius: 8.5,
    },
    tank: {
        width: dimensions()._height * 0.06,
        height: dimensions()._height * 0.06,
    },
    timerView: {
        backgroundColor: "#478E6D",
        alignItems: "center",
        justifyContent: "center",
        opacity: 1
    }
});