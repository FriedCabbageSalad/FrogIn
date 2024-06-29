import React, {useRef, useState} from 'react';

import { 
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Alert,
  Modal,
  Pressable
} from 'react-native';

import { TimerPicker } from "react-native-timer-picker";
import CountDownTimer from "react-native-countdown-timer-hooks";
import { BaseGacha } from './../FrogGacha.tsx'


const Separator = () => <View style={{marginVertical: '2%'}}/>;

const { height, width } = Dimensions.get('window')
var newDuration = {
    hours: 0,
    minutes: 0,
    seconds: 0
};
var totalDuration = 0;

const frogDirectories = [
    {image: require('./../assets/tank_with_egg.png')},
    {image: require('./../assets/frogs/default_frog.png')},
    {image: require('./../assets/frogs/blue_frog.png')},
    {image: require('./../assets/frogs/ocean_frog.png')},
  ]

function dimensions() {

    var _borderRadius = Math.round((height + width) / 2),
        _height = Math.round(height),
        _width = Math.round(width)

    return { _borderRadius, _height, _width }
}

function LockScreen({navigation}: {navigation: any}) {

    const [timerEnd, setTimerEnd] = useState(false);
    const [buttonVisible, setButtonVisible] = useState(true);
    const [pickerVisible, setShowPicker] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);
    const [displayImage, setDisplayImage] = useState(0);
    const timer = useRef();    
    
    return (
        <View style={styles.background}>
            {/* Container for rest */}
            <View style={{position: 'absolute', top: dimensions()._height * 0.1, alignItems: 'center', alignSelf: 'center', justifyContent: 'center' }}>
                
                {/* Circle and Image */}
                <View style={styles.outerCircle}>
                    <View style={styles.innerCicle}>
                        <Image source={frogDirectories[displayImage].image} style={styles.tank} resizeMode='stretch'/>
                    </View>
                </View>

                {/* Timer Picker */}
                {pickerVisible ? (
                    <View style={styles.timerView}>
                        <TimerPicker
                            onDurationChange={(currDuration) =>
                                newDuration = currDuration
                            }
                            padWithNItems={1}
                            hourLabel=":"
                            minuteLabel=":"
                            secondLabel=""
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
                ) : null}

                {/* Start Button */}
                {pickerVisible ? (
                    <View style={{alignItems: 'center', justifyContent: 'center', marginTop: '4%'}}>
                        <TouchableOpacity 
                            onPress={() => {
                                if ((newDuration.hours !== 0) || (newDuration.minutes !== 0) || (newDuration.seconds !== 0)) {
                                    totalDuration = newDuration.hours * 3600 + newDuration.minutes * 60 + newDuration.seconds;
                                    setButtonVisible(false);
                                    setShowPicker(false);
                                    setDisplayImage(0);
                                }
                            }
                        } style={styles.buttonStart}>
                            <Text style={{color: 'white', fontSize: 18}}>Start</Text>
                        </TouchableOpacity>
                    </View>
                ) : null}
                
                {/* Countdown Timer TODO add callback when timer ends*/}
                {!pickerVisible ? (
                    <View style={{alignItems: 'center', justifyContent: 'center', marginTop: '4%'}}>
                        <CountDownTimer
                            ref={timer}
                            timestamp={totalDuration}
                            containerStyle={styles.countdown}
                            textStyle={styles.countdownText}
                            timerCallback={() => {
                                setButtonVisible(true);
                                setShowPicker(true);
                                setDisplayImage(BaseGacha());
                            }}/>
                    </View>
                ) : null}
                
                {/* Cancel Button */}
                {!pickerVisible ? (
                    <View style={{alignItems: 'center', justifyContent: 'center', marginTop: '4%'}}>
                        <TouchableOpacity 
                            onPress={() => {
                                setButtonVisible(true);
                                setShowPicker(true);
                            }
                        } style={styles.buttonCancel}>
                            <Text style={{color: 'white', fontSize: 18}}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                ) : null}

                <View style={styles.centeredView}>
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={modalVisible}
                        onRequestClose={() => {
                            Alert.alert('Modal has been closed.');
                            setModalVisible(!modalVisible);
                        }}>
                        <View style={styles.centeredView}>
                            <View style={styles.modalView}>
                            <Text style={styles.modalText}>Green Frog 65%</Text>
                            <Text style={styles.modalText}>Blue Frog 30%</Text>
                            <Text style={styles.modalText}>Ocean Frog 5%</Text>
                            <Pressable
                                style={[styles.button, styles.buttonClose]}
                                onPress={() => setModalVisible(!modalVisible)}>
                                <Text style={styles.textStyle}>Exit</Text>
                            </Pressable>
                            </View>
                        </View>
                    </Modal>
                    <Pressable
                        style={[styles.button, styles.buttonOpen]}
                        onPress={() => setModalVisible(true)}>
                        <Text style={styles.textStyle}>Show Odds</Text>
                    </Pressable>
                </View>
            </View>

            {/* Space reserved for navbar */}
            <View style={styles.navbar}></View>
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
        position: 'absolute',
        top: dimensions()._height * 0.85,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        backgroundColor: '#516D67',
        width: dimensions()._width,
        height: dimensions()._height * 0.2
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
        backgroundColor: '#FFE7A1',
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonStart: {
        width: '75%',
        alignItems: 'center',
        backgroundColor: '#4E66E3',
        padding: 10,
        paddingHorizontal: '10%',
        borderRadius: 8.5,
    },
    buttonCancel: {
        width: '75%',
        alignItems: 'center',
        backgroundColor: 'red',
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
    },
    countdown: {
        height: 56,
        width: 'auto',
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 35,
        backgroundColor: "#478E6D",
    },
    countdownText: {
        fontSize: 34,
        color: "#FFFFFF",
        fontWeight: "500",
        letterSpacing: 1,
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
      },
      modalView: {
        margin: 20,
        backgroundColor: '#9AC99B',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
      },
      button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
      },
      buttonOpen: {
        backgroundColor: '#C8B88A',
      },
      buttonClose: {
        backgroundColor: '#C8B88A',
      },
      textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
      },
      modalText: {
        marginBottom: 15,
        textAlign: 'center',
      },
});