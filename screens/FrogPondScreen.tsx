import * as React from 'react';
import {useRef, useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, Image, Pressable, BackHandler, Modal } from 'react-native';
import { frogDirectories, dimensions, defaultFrogIndex, GachaNumberGenerator, showAlert, showAlertAction, showAlertConfirm, frogName, frogRarity, getRarityColour, frogInfo } from './../screens/Scripts.tsx'
import { getUD, updateUD } from './../screens/HomeScreen.tsx'
import auth from '@react-native-firebase/auth';

const Separator = () => <View style={{marginVertical: '2%'}}/>;

const  motivationalMessages = [
    "Believe in yourself and you will be unstoppable.",
    "Challenges are what make life interesting. Overcoming them is what makes life meaningful.",
    "Success is not final, failure is not fatal: It is the courage to continue that counts.",
    "Don't watch the clock, do what it does: keep going.",
    "Difficult roads often lead to beautiful destinations.",
    "You didn't come this far to only come this far.",
    "Every day is a new beginning. Take a deep breath, smile, and start again.",
    "Click the icons at the bottom navigation bar to explore the app!",
]

const index = new Date().getDate() % 7

function FrogPondScreen({navigation}: {navigation: any}) {
  
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedFrog, setSelectedFrog] = useState(0);

    // Log Out Function
    function logOut() {
        auth()
        .signOut()
        .then(navigation.navigate('SignUp'))
        .catch(error => {
            console.log("error")
            showAlertAction('Something went wrong','Please restart the app.','OK',() => {BackHandler.exitApp();return () => {}})})
    return () => ('')}

    const [frogArray, setFrogArray] = useState(getUD('frogs'))
    const [achievementArray, setAchievementArray] = useState(getUD('achievements'))

    const loadFrogs = useCallback(() => {
        setFrogArray(getUD('frogs'))
        setAchievementArray(getUD('achievements'))
        console.log('loadfrogs called and returned')
    }, []);

    // Load when the component mounts
    useEffect(() => {
      loadFrogs();
      }, [loadFrogs]);

    return (
        <ImageBackground source={require('./../assets/frog_pond_background.png')} resizeMode='cover' style={styles.imageSizing}>
            <View style={{position: 'absolute', right: 0, borderRadius: 10, margin: 7, padding: 3, backgroundColor: '#516D67'}}>  
                <TouchableOpacity
                    onPress={() => {
                        // Logout Button
                        showAlertConfirm('Are you sure you want to sign out?', 'Your progress will be saved', 'No', 'Yes', () => ('') , logOut)}}>
                    <Image source={require('./../assets/log_out.png')} resizeMode='contain' style={{width: 20, height: 20}}/>
                </TouchableOpacity>
            </View>
            
            <View style={styles.messageBox}>
                <Text style={{fontSize: 13, fontWeight: 'bold', color: 'black'}}>Today's Message</Text>
                <Text style={{color: 'grey'}}>{motivationalMessages[(frogArray.reduce((x : number, y : number) => x + y, 0) == 0) ? 7 : index]}</Text>
            </View>

            {/* Frog Displays */}
            {/* Default */}
            <View style={{position: 'absolute', top: dimensions()._height * 0.4, left: dimensions()._width * 0.45}}>
                {(frogArray[0] != 0) ?                 
                    <Pressable
                        onPress={() => {setSelectedFrog(0); setModalVisible(true)}}>
                            <Image source={frogDirectories[defaultFrogIndex].image}/>
                    </Pressable> : <></>}
            </View>

            {/* Blue */}
            <View style={{position: 'absolute', top: dimensions()._height * 0.45, left: dimensions()._width * 0.6}}>
                {(frogArray[1] != 0) ?
                    <Pressable
                    onPress={() => {setSelectedFrog(1); setModalVisible(true)}}>
                        <Image source={frogDirectories[defaultFrogIndex + 1].image}/>
                    </Pressable> : <></>}
            </View>
            {/* Ocean */}
            <View style={{position: 'absolute', top: dimensions()._height * 0.35, left: dimensions()._width * 0.2}}>
                {(frogArray[2] != 0) ? 
                    <Pressable
                    onPress={() => {setSelectedFrog(2); setModalVisible(true)}}>
                        <Image source={frogDirectories[defaultFrogIndex + 2].image}/>
                    </Pressable> : <></>}
            </View>
            {/* Gray */}
            <View style={{position: 'absolute', top: dimensions()._height * 0.3, left: dimensions()._width * 0.4}}>
                {(frogArray[3] != 0) ? 
                    <Pressable
                    onPress={() => {setSelectedFrog(3); setModalVisible(true)}}>
                        <Image source={frogDirectories[defaultFrogIndex + 3].image}/>
                    </Pressable> : <></>}
            </View>
            {/* Purple */}
            <View style={{position: 'absolute', top: dimensions()._height * 0.35, left: dimensions()._width * 0.58}}>
                {(frogArray[4] != 0) ? 
                    <Pressable
                    onPress={() => {setSelectedFrog(4); setModalVisible(true)}}>
                        <Image source={frogDirectories[defaultFrogIndex + 4].image}/>
                    </Pressable> : <></>}
            </View>
            {/* Red */}
            <View style={{position: 'absolute', top: dimensions()._height * 0.42, left: dimensions()._width * 0.1}}>
                {(frogArray[5] != 0) ? 
                    <Pressable
                    onPress={() => {setSelectedFrog(5); setModalVisible(true)}}>
                        <Image source={frogDirectories[defaultFrogIndex + 5].image}/>
                    </Pressable> : <></>}
            </View>
            {/* White */}
            <View style={{position: 'absolute', top: dimensions()._height * 0.43, left: dimensions()._width * 0.3}}>
                {(frogArray[6] != 0) ? 
                    <Pressable
                    onPress={() => {setSelectedFrog(6); setModalVisible(true)}}>
                        <Image source={frogDirectories[defaultFrogIndex + 6].image}/>
                    </Pressable> : <></>}
            </View>
            {/* Dark Gray */}
            <View style={{position: 'absolute', top: dimensions()._height * 0.48, left: dimensions()._width * 0.28}}>
                {(frogArray[7] != 0) ? 
                    <Pressable
                    onPress={() => {setSelectedFrog(7); setModalVisible(true)}}>
                        <Image source={frogDirectories[defaultFrogIndex + 7].image}/>
                    </Pressable> : <></>}
            </View>
            {/* Brown */}
            <View style={{position: 'absolute', top: dimensions()._height * 0.49, left: dimensions()._width * 0.45}}>
                {(frogArray[8] != 0) ? 
                    <Pressable
                    onPress={() => {setSelectedFrog(8); setModalVisible(true)}}>
                        <Image source={frogDirectories[defaultFrogIndex + 8].image}/>
                    </Pressable> : <></>}
            </View>

            {/* Mythics */}
            {/* Golden */}
            <View style={{position: 'absolute', left: dimensions()._width * 0.05}}>
            <Image source={require('./../assets/cloud.png')} style={{top: dimensions()._height * 0.15 + 25, position: 'absolute', zIndex: 1}}/>
                {(achievementArray.includes(5)) ? 
                    <Pressable style={{top: dimensions()._height * 0.15, position: 'absolute', zIndex: 2}}
                    onPress={() => {setSelectedFrog(9); setModalVisible(true)}}>
                        <Image source={frogDirectories[defaultFrogIndex + 9].image}/>
                    </Pressable> : <></>}
            </View>
            {/* Mysterious */}
            <View style={{position: 'absolute', left: dimensions()._width * 0.25}}>
                <Image source={require('./../assets/cloud.png')} style={{top: dimensions()._height * 0.15 + 25, position: 'absolute', zIndex: 1}}/>
                {(achievementArray.includes(10)) ? 
                    <Pressable style={{top: dimensions()._height * 0.15, position: 'absolute', zIndex: 2}}
                    onPress={() => {setSelectedFrog(10); setModalVisible(true)}}>
                        <Image source={frogDirectories[defaultFrogIndex + 10].image}/>
                    </Pressable> : <></>}
            </View>
            {/* Rainbow */}
            <View style={{position: 'absolute', left: dimensions()._width * 0.15}}>
            <Image source={require('./../assets/cloud.png')} style={{top: dimensions()._height * 0.23 + 25, position: 'absolute', zIndex: 1}}/>
                {(achievementArray.includes(15)) ? 
                    <Pressable style={{top: dimensions()._height * 0.23, position: 'absolute', zIndex: 2}}
                    onPress={() => {setSelectedFrog(11); setModalVisible(true)}}>
                        <Image source={frogDirectories[defaultFrogIndex + 11].image}/>
                    </Pressable> : <></>}
            </View>

            {/* Navbar */}
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
                    onPress={() => navigation.replace('Lock')}>
                    <Image source={require('./../assets/lock.png')} style={{height: '100%', width: '100%'}} resizeMode='contain'/>
                </TouchableOpacity>
                <TouchableOpacity style={{flex: 1, width: 40, height: 40, alignItems: 'center'}} 
                    onPress={() => ''}>
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
            </View>

            {/* Frog Modal */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                setModalVisible(!modalVisible);
            }}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalTitleText}>{frogName[defaultFrogIndex + selectedFrog]}</Text>
                            <Image source={frogDirectories[defaultFrogIndex + selectedFrog].image}/>
                            {/* Frog Rarity Text */}
                            <Text style={{textAlign: 'center', fontSize: 22, fontWeight: '900', color: getRarityColour(selectedFrog + defaultFrogIndex)}}>
                                {frogRarity[selectedFrog + defaultFrogIndex]}
                            </Text>
                            <Separator/>
                            <Text style={styles.modalText}>
                                {frogInfo[selectedFrog]}
                            </Text>

                            <Pressable
                                style={[styles.button, styles.buttonClose]}
                                onPress={() => setModalVisible(!modalVisible)}>
                                <Text style={styles.textStyle}>Exit</Text>
                            </Pressable>
                    </View>
                </View>
            </Modal>
        </ImageBackground>
    );
}

export default FrogPondScreen;

const styles = StyleSheet.create({
    imageSizing: {
        width: '100%',
        height: '100%'
    },
    logoutButton: {
        position: 'absolute',
        right: 0,
        borderRadius: 10,
        margin: 7,
        padding: 3,
        backgroundColor: '#516D67'
    },
    messageBox: {
        position: 'absolute',
        left: 0,
        borderRadius: 10,
        backgroundColor: '#FFE7A1',
        width: dimensions()._width - 50,
        height: dimensions()._height * 0.12,
        margin: 10,
        padding: 5,
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        width: dimensions()._width * 0.8,
        height: dimensions()._height * 0.7,
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
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
        fontSize: 18
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    buttonClose: {
        backgroundColor: '#C8B88A',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalTitleText: {
        marginBottom: 15,
        textAlign: 'center',
        fontSize: 28,
        fontWeight: 'bold',
        color: 'white'
    },
 });