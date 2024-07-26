import React, { useRef, useState, useEffect, SetStateAction } from 'react';
import { AppState, View, Text, Image, TouchableOpacity, StyleSheet, Alert, Modal, Pressable } from 'react-native';
import { TimerPicker } from "react-native-timer-picker";
import CountDownTimer from "react-native-countdown-timer-hooks";
import { frogDirectories, frogGacha, defaultFrogIndex, timeCat, dimensions, showAlert, frogName, frogRarity, getRarityColour } from './../screens/Scripts.tsx';
import { getUD, updateUD } from './../screens/HomeScreen.tsx'

const Separator = () => <View style={{marginVertical: '2%'}}/>;

var newDuration = {
    hours: 0,
    minutes: 0,
    seconds: 0
};
var totalDuration = 0;

//set to 900 for interstellar mode
var timeWarp = 900;

const oddsText = (sec : number) => {
    var defaultOddsText = 'Select a time to see the odds of getting certain frogs!'
    if (sec == 0) {
        return <Text style={styles.modalText}>{defaultOddsText}</Text>  
    }
    switch (timeCat(sec)) {
        case 0: return <Text style={styles.modalText}>Green Frog: 65%{"\n"} Blue Frog: 30%{"\n"} Ocean Frog: 5%</Text>

        case 1: return <Text style={styles.modalText}>Green Frog: 30%{"\n"} Blue Frog: 20%{"\n"} Ocean Frog: 20%{"\n"}
                                                        Grey Frog: 10%{"\n"} Purple Frog: 10%{"\n"} Red Frog: 10%</Text>

        case 2: return <Text style={styles.modalText}>Green Frog: 20%{"\n"} Blue Frog: 10%{"\n"} Ocean Frog: 10%{"\n"}
                                                        Grey Frog: 15%{"\n"} Purple Frog: 15%{"\n"} Red Frog: 15%{"\n"}
                                                        White Frog: 5%{"\n"} Dark Grey Frog: 5%{"\n"} Brown Frog: 5%</Text>

        case 3: return <Text style={styles.modalText}>Ocean Frog: 10%{"\n"} 
                                                        Grey Frog: 20%{"\n"} Purple Frog: 20%{"\n"} Red Frog: 20%{"\n"} 
                                                        White Frog: 10%{"\n"} Dark Grey Frog: 10%{"\n"} Brown Frog: 10%</Text>

        default: return <Text style={styles.modalText}>{defaultOddsText}</Text>
    }
}

function LockScreen({route, navigation}: {route: any, navigation: any}) {

    // Stuff on screen
    const [timerEnd, setTimerEnd] = useState(false);
    const [buttonVisible, setButtonVisible] = useState(true);
    const [pickerVisible, setShowPicker] = useState(true);
    const [oddsModalVisible, setOddsModalVisible] = useState(false);
    const [tutorialModalVisible, setTutorialModalVisible] = useState(false);
    const [outcomeModalVisible, setOutcomeModalVisible] = useState(false);
    const [displayImage, setDisplayImage] = useState(0);
    const [showOddsButton, setShowOddsButton] = useState(true);
    const timer = useRef();

    // Locked State
    const [lockedState, setLockedState] = useState(false)

    //App State
    const appState = useRef(AppState.currentState)
    const [appStateVisible, setAppStateVisible] = useState(appState.current)

    // Logic for detecting and handling app leaving
    useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
        // app state change
        appState.current = nextAppState;
        setAppStateVisible(appState.current);
        console.log('AppState', appState.current, 'LockedState', lockedState, 'Display', displayImage);
        // trigger if app is bg during lock state
        if (appState.current == 'background' && lockedState) {
            console.log('exit detected')
            setDisplayImage(2)
            setButtonVisible(true);
            setShowPicker(true);
            setShowOddsButton(true);
        }
        // if frog ded, show explain alert
        if (appState.current == 'active' && displayImage == 2 && lockedState) {
            showAlert('Your Frog has perished!', 'Avoid leaving the app to keep your frog alive!', 'OK')
            setLockedState(false);
        }});
    return () => {
        subscription.remove();
    };}, [lockedState, appState, displayImage]); 
    
    return (
        <View style={styles.background}>

            {/* Tutorial Modal */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={tutorialModalVisible}            
                onRequestClose={() => {
                setTutorialModalVisible(!tutorialModalVisible);
            }}>
                <View style={styles.centeredView}>
                    <View style={{...styles.modalView, ...styles.tutorialView}}>
                        <Text style={styles.modalTitleText}>Tutorial</Text>
                        <Text style={styles.modalText}>
                            Welcome to the Lock Screen!
                            Here you can set the amount of time you would like to focus.
                        </Text>
                        <Text style={styles.modalText}>
                            Try your best to make it all way without leaving the app to receive a frog!
                            The more time you focus for, the better your odds of receiving rarer frogs.
                        </Text>
                        <Text style={styles.modalText}>
                            Be warned, leaving the app while the timer is ticking will have disastrous
                            consequences for your amphibian pal.
                        </Text>
                        <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => setTutorialModalVisible(!tutorialModalVisible)}>
                            <Text style={styles.textStyle}>Exit</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
            {/* Open Tutorial Modal Button */}
            <View style={{position: 'absolute', right: 0, backgroundColor: '#C8B88A', borderRadius: 20, margin: 7}}>  
                <Pressable
                    onPress={() => setTutorialModalVisible(true)}>
                    <Image source={require('./../assets/question_mark.png')} resizeMode='contain' style={{width: 25, height: 25}}/>
                </Pressable>
            </View>


            {/* Outcome Modal */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={outcomeModalVisible}
                onRequestClose={() => {
                setOutcomeModalVisible(!outcomeModalVisible);
            }}>
                <View style={styles.centeredView}>
                    <View style={styles.outcomeView}>
                        <Text style={styles.modalTitleText}>You got a</Text>

                        {/* Frog Display */}
                        <View style={styles.outerCircle}>
                            <View style={styles.innerCicle}>
                                <Image source={frogDirectories[displayImage].image} style={styles.tank} resizeMode='contain'/>
                            </View>
                        </View>

                        <Separator/>

                        <View>
                            {/* Frog Rarity Text */}
                            <Text style={{textAlign: 'center', fontSize: 22, fontWeight: '900', color: getRarityColour(displayImage)}}>
                                {frogRarity[displayImage]}
                            </Text>
                            
                            {/* Frog Name Text */}
                            <Text style={{textAlign: 'center', fontSize: 18}}>
                                {frogName[displayImage]}! Check it out over at your frog pond!
                            </Text>
                        </View>

                        <Separator/>

                        <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => setOutcomeModalVisible(!outcomeModalVisible)}>
                            <Text style={styles.textStyle}>Exit</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>

            {/* Container for rest */}
            <View style={{position: 'absolute', top: dimensions()._height * 0.1, alignItems: 'center', alignSelf: 'center', justifyContent: 'center' }}>
                {/* Circle and Image */}
                <View style={styles.outerCircle}>
                    <View style={styles.innerCicle}>
                        <Image source={frogDirectories[displayImage].image} style={styles.tank} resizeMode='contain'/>
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
                                    setLockedState(true);
                                    setButtonVisible(false);
                                    setShowPicker(false);
                                    setDisplayImage(0);
                                    setShowOddsButton(false);
                                }
                                else {showAlert('Select a time before pressing start','','OK')}
                            }
                        } style={styles.buttonStart}>
                            <Text style={{color: 'white', fontSize: 18}}>Start</Text>
                        </TouchableOpacity>
                    </View>
                ) : null}
                
                {/* Countdown Timer */}
                {!pickerVisible ? (
                    <View style={{alignItems: 'center', justifyContent: 'center', marginTop: '4%'}}>
                        <CountDownTimer
                            ref={timer}
                            timestamp={totalDuration}
                            containerStyle={styles.countdown}
                            textStyle={styles.countdownText}
                            timerCallback={() => {
                                //timer ended, frog grown
                                setLockedState(false);
                                setButtonVisible(true);
                                setShowPicker(true);
                                setOutcomeModalVisible(true);
                                setShowOddsButton(true);
                                var newFrog = frogGacha(totalDuration*timeWarp);
                                setDisplayImage(newFrog);
                                var frogArray = getUD('frogs');
                                frogArray[newFrog - defaultFrogIndex] = frogArray[newFrog - defaultFrogIndex] + 1;
                                updateUD('frogs', frogArray);
                                updateUD('mins', getUD('mins') + Math.round(totalDuration*timeWarp/60));
                            }}/>
                    </View>
                ) : null}
                
                {/* Cancel Button */}
                {!pickerVisible ? (
                    <View style={{alignItems: 'center', justifyContent: 'center', marginTop: '4%'}}>
                        <TouchableOpacity 
                            onPress={() => {
                                setLockedState(false);
                                setButtonVisible(true);
                                setShowPicker(true);
                                setShowOddsButton(true);
                            }
                        } style={styles.buttonCancel}>
                            <Text style={{color: 'white', fontSize: 18}}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                ) : null}

                {/* Odds Screen */}
                <View style={styles.centeredView}>
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={oddsModalVisible}
                        onRequestClose={() => {
                            setOddsModalVisible(!oddsModalVisible);
                        }}>
                        <View style={styles.centeredView}>
                            <View style={styles.modalView}>
                            <Text style={styles.modalText}>Odds for{"\n"}{newDuration.hours} hours, {newDuration.minutes} minutes, {newDuration.seconds} seconds</Text>
                            {oddsText((newDuration.hours * 3600 + newDuration.minutes * 60 + newDuration.seconds)*timeWarp)}
                            <Pressable
                                style={[styles.button, styles.buttonClose]}
                                onPress={() => setOddsModalVisible(!oddsModalVisible)}>
                                <Text style={styles.textStyle}>Exit</Text>
                            </Pressable>
                            </View>
                        </View>
                    </Modal>

                    {/* Show Odds Button*/}
                    {showOddsButton &&
                    <Pressable
                        style={[styles.button, styles.buttonOpen]}
                        onPress={() => setOddsModalVisible(true)}>
                        <Text style={styles.textStyle}>Show Odds</Text>
                    </Pressable>}
                </View>
            </View>

        {/* Navbar */}
        {showOddsButton &&
        <View style={{
            position: 'absolute', 
            bottom: 0, 
            justifyContent: 'center', 
            alignItems: 'center', 
            backgroundColor: '#516D67', 
            width: dimensions()._width, 
            height: dimensions()._height * 0.06, 
            flexDirection: 'row'
        }}>
            <TouchableOpacity style={{flex: 1, width: 40, height: 40, alignItems: 'center'}} 
                onPress={() => navigation.replace('FriendsList')}>
                <Image source={require('./../assets/friends_list_alex.png')} style={{height: '100%', width: '100%'}} resizeMode='contain'/>
            </TouchableOpacity>
            <TouchableOpacity style={{flex: 1, width: 40, height: 40, alignItems: 'center'}} 
                onPress={() => ''}>
                <Image source={require('./../assets/lock.png')} style={{height: '100%', width: '100%'}} resizeMode='contain'/>
            </TouchableOpacity>
            <TouchableOpacity style={{flex: 1, width: 40, height: 40, alignItems: 'center'}} 
                onPress={() => navigation.replace('FrogPond')}>
                <Image source={require('./../assets/lily_pad2.png')} style={{height: '100%', width: '100%'}} resizeMode='contain'/>
            </TouchableOpacity>
            <TouchableOpacity style={{flex: 1, width: 40, height: 40, alignItems: 'center'}} 
                onPress={() => navigation.replace('Leaderboard')}>
                <Image source={require('./../assets/trophy.png')} style={{height: '100%', width: '100%'}} resizeMode='contain'/>
            </TouchableOpacity>
            <TouchableOpacity style={{flex: 1, width: 40, height: 40, alignItems: 'center'}} 
                onPress={() => navigation.replace('Profile')}>
                <Image source={require('./../assets/profile.png')} style={{height: '100%', width: '100%'}} resizeMode='contain'/>
            </TouchableOpacity>
        </View>}
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
        width: dimensions()._height * 0.1,
        height: dimensions()._height * 0.1,
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
    tutorialView: {
        position: 'absolute',
        top: 0,
        maxHeight: dimensions()._height * 0.8,
    },
    outcomeView: {
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
        height: dimensions()._height * 0.6
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
        fontSize: 18
    },
    modalTitleText: {
        marginBottom: 15,
        textAlign: 'center',
        fontSize: 28,
        fontWeight: 'bold',
        color: 'white'
    },
});