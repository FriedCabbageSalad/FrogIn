import * as React from 'react';
import {useRef, useState, useEffect} from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, Image, Pressable, BackHandler, Modal } from 'react-native';
import { frogDirectories, dimensions, defaultFrogIndex, GachaNumberGenerator, showAlert, showAlertAction, showAlertConfirm} from './../screens/Scripts.tsx'
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
    "Every day is a new beginning. Take a deep breath, smile, and start again."
]

function FrogPondScreen({navigation}: {navigation: any}) {
    const index = GachaNumberGenerator() % 8
    const [modal0Visible, setModal0Visible] = useState(false);
    const [modal1Visible, setModal1Visible] = useState(false);
    const [modal2Visible, setModal2Visible] = useState(false);
    const [modal3Visible, setModal3Visible] = useState(false);
    const [modal4Visible, setModal4Visible] = useState(false);
    const [modal5Visible, setModal5Visible] = useState(false);
    const [modal6Visible, setModal6Visible] = useState(false);
    const [modal7Visible, setModal7Visible] = useState(false);
    const [modal8Visible, setModal8Visible] = useState(false);
    // Log Out Function
    function logOut() {
        auth()
        .signOut()
        .then(navigation.navigate('SignUp'))
        .catch(error => {
            console.log("error")
            showAlertAction('Something went wrong','Please restart the app.','OK',() => {BackHandler.exitApp();return () => {}})})
    return () => ('')}

    const frogArray = getUD('frogs')

    return (
        <ImageBackground source={require('./../assets/frog_pond_background.png')} resizeMode='cover' style={styles.imageSizing}>
            <View style={{position: 'absolute', right: 0, borderRadius: 10, margin: 7, padding: 3, backgroundColor: '#516D67'}}>  
                <TouchableOpacity
                    onPress={() => {
                        // Logout Button
                        showAlertConfirm('Are you sure you want to sign out?', 'Your progress will be saved', 'No', 'Yes', () => () => ('') , logOut)}}>
                    <Image source={require('./../assets/log_out.png')} resizeMode='contain' style={{width: 20, height: 20}}/>
                </TouchableOpacity>
            </View>
            
            <View style={styles.messageBox}>
                <Text style={{fontSize: 13, fontWeight: 'bold'}}>Today's Motivational Message</Text>
                <Text>{motivationalMessages[index]}</Text>
            </View>
            {/* Frog Displays */}

            {/* Default */}
            <View style={{position: 'absolute', top: dimensions()._height * 0.4, left: dimensions()._width * 0.45}}>
                {(frogArray[0] != 0) ?                 
                    <Pressable
                        onPress={() => setModal0Visible(true)}>
                            <Image source={frogDirectories[defaultFrogIndex].image}/>
                    </Pressable> : <></>}
            </View>

            {/* Blue */}
            <View style={{position: 'absolute', top: dimensions()._height * 0.45, left: dimensions()._width * 0.6}}>
                {(frogArray[1] != 0) ?
                    <Pressable
                    onPress={() => setModal1Visible(true)}>
                        <Image source={frogDirectories[defaultFrogIndex + 1].image}/>
                    </Pressable> : <></>}
            </View>
            {/* Ocean */}
            <View style={{position: 'absolute', top: dimensions()._height * 0.35, left: dimensions()._width * 0.2}}>
                {(frogArray[2] != 0) ? 
                    <Pressable
                    onPress={() => setModal2Visible(true)}>
                        <Image source={frogDirectories[defaultFrogIndex + 2].image}/>
                    </Pressable> : <></>}
            </View>
            {/* Gray */}
            <View style={{position: 'absolute', top: dimensions()._height * 0.3, left: dimensions()._width * 0.4}}>
                {(frogArray[3] != 0) ? 
                    <Pressable
                    onPress={() => setModal3Visible(true)}>
                        <Image source={frogDirectories[defaultFrogIndex + 3].image}/>
                    </Pressable> : <></>}
            </View>
            {/* Purple */}
            <View style={{position: 'absolute', top: dimensions()._height * 0.35, left: dimensions()._width * 0.58}}>
                {(frogArray[4] != 0) ? 
                    <Pressable
                    onPress={() => setModal4Visible(true)}>
                        <Image source={frogDirectories[defaultFrogIndex + 4].image}/>
                    </Pressable> : <></>}
            </View>
            {/* Red */}
            <View style={{position: 'absolute', top: dimensions()._height * 0.42, left: dimensions()._width * 0.1}}>
                {(frogArray[5] != 0) ? 
                    <Pressable
                    onPress={() => setModal5Visible(true)}>
                        <Image source={frogDirectories[defaultFrogIndex + 5].image}/>
                    </Pressable> : <></>}
            </View>
            {/* White */}
            <View style={{position: 'absolute', top: dimensions()._height * 0.43, left: dimensions()._width * 0.3}}>
                {(frogArray[6] != 0) ? 
                    <Pressable
                    onPress={() => setModal6Visible(true)}>
                        <Image source={frogDirectories[defaultFrogIndex + 6].image}/>
                    </Pressable> : <></>}
            </View>
            {/* Dark Gray */}
            <View style={{position: 'absolute', top: dimensions()._height * 0.48, left: dimensions()._width * 0.28}}>
                {(frogArray[7] != 0) ? 
                    <Pressable
                    onPress={() => setModal7Visible(true)}>
                        <Image source={frogDirectories[defaultFrogIndex + 7].image}/>
                    </Pressable> : <></>}
            </View>
            {/* Brown */}
            <View style={{position: 'absolute', top: dimensions()._height * 0.49, left: dimensions()._width * 0.45}}>
                {(frogArray[8] != 0) ? 
                    <Pressable
                    onPress={() => setModal8Visible(true)}>
                        <Image source={frogDirectories[defaultFrogIndex + 8].image}/>
                    </Pressable> : <></>}
            </View>

            {/* Navbar */}
            <View style={{position: 'absolute', top: dimensions()._height * 0.915, justifyContent: 'center', alignItems: 'center', backgroundColor: '#516D67', width: dimensions()._width, height: dimensions()._height * 0.2, flexDirection: 'row'}}>
                <TouchableOpacity style={{position: 'absolute', top: 0, left: dimensions()._width * 0.8 + 20, width: 40, height: 40,}} 
                    onPress={() => navigation.navigate('Profile')}>
                    <Image source={require('./../assets/profile.png')} style={{height: '100%', width: '100%'}} resizeMode='contain'/>
                </TouchableOpacity>
                <TouchableOpacity style={{position: 'absolute', top: 0, left: dimensions()._width * 0.6 + 20, width: 40, height: 40,}} 
                    onPress={() => navigation.navigate('Leaderboard')}>
                    <Image source={require('./../assets/trophy.png')} style={{height: '100%', width: '100%'}} resizeMode='contain'/>
                </TouchableOpacity>
                <TouchableOpacity style={{position: 'absolute', top: dimensions()._height * 0.002, left: dimensions()._width * 0.5 - 20, width: 40, height: 40,}} 
                    onPress={() => navigation.navigate('FrogPond')}>
                    <Image source={require('./../assets/lily_pad2.png')} style={{height: '100%', width: '100%'}} resizeMode='contain'/>
                </TouchableOpacity>
                <TouchableOpacity style={{position: 'absolute', top: 0, right: dimensions()._width * 0.6 + 20, width: 40, height: 40,}} 
                    onPress={() => navigation.navigate('Lock')}>
                    <Image source={require('./../assets/lock.png')} style={{height: '100%', width: '100%'}} resizeMode='contain'/>
                </TouchableOpacity>
                
                <TouchableOpacity style={{position: 'absolute', top: 0, right: dimensions()._width * 0.8 + 20, width: 40, height: 40,}} 
                    onPress={() => navigation.navigate('FriendsList')}>
                    <Image source={require('./../assets/friends_list_alex.png')} style={{height: '100%', width: '100%'}} resizeMode='contain'/>
                </TouchableOpacity>
            </View> 

            {/* Default Frog Modal */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={modal0Visible}
                onRequestClose={() => {
                setModal0Visible(!modal0Visible);
            }}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Image/>
                        <Text style={styles.modalTitleText}>Green Frog</Text>
                            <Image source={frogDirectories[defaultFrogIndex].image}/>
                            
                            <Separator/>

                            <Text style={styles.modalText}>
                                placeholder
                            </Text>

                            <Pressable
                                style={[styles.button, styles.buttonClose]}
                                onPress={() => setModal0Visible(!modal0Visible)}>
                                <Text style={styles.textStyle}>Exit</Text>
                            </Pressable>
                    </View>
                </View>
            </Modal>

            {/* Blue Frog Modal */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={modal1Visible}
                onRequestClose={() => {
                setModal1Visible(!modal1Visible);
            }}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Image/>
                        <Text style={styles.modalTitleText}>Blue Frog</Text>
                            <Image source={frogDirectories[defaultFrogIndex + 1].image}/>
                            
                            <Separator/>

                            <Text style={styles.modalText}>
                                placeholder
                            </Text>

                            <Pressable
                                style={[styles.button, styles.buttonClose]}
                                onPress={() => setModal1Visible(!modal1Visible)}>
                                <Text style={styles.textStyle}>Exit</Text>
                            </Pressable>
                    </View>
                </View>
            </Modal>

            {/* Ocean Frog Modal */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={modal2Visible}
                onRequestClose={() => {
                setModal2Visible(!modal2Visible);
            }}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Image/>
                        <Text style={styles.modalTitleText}>Ocean Frog</Text>
                            <Image source={frogDirectories[defaultFrogIndex + 2].image}/>
                            
                            <Separator/>

                            <Text style={styles.modalText}>
                                placeholder
                            </Text>

                            <Pressable
                                style={[styles.button, styles.buttonClose]}
                                onPress={() => setModal2Visible(!modal2Visible)}>
                                <Text style={styles.textStyle}>Exit</Text>
                            </Pressable>
                    </View>
                </View>
            </Modal>

            {/* Gray Frog Modal */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={modal3Visible}
                onRequestClose={() => {
                setModal3Visible(!modal3Visible);
            }}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Image/>
                        <Text style={styles.modalTitleText}>Gray Frog</Text>
                            <Image source={frogDirectories[defaultFrogIndex + 3].image}/>
                            
                            <Separator/>

                            <Text style={styles.modalText}>
                                placeholder
                            </Text>

                            <Pressable
                                style={[styles.button, styles.buttonClose]}
                                onPress={() => setModal3Visible(!modal3Visible)}>
                                <Text style={styles.textStyle}>Exit</Text>
                            </Pressable>
                    </View>
                </View>
            </Modal>

            {/* Purple Frog Modal */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={modal4Visible}
                onRequestClose={() => {
                setModal4Visible(!modal4Visible);
            }}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Image/>
                        <Text style={styles.modalTitleText}>Purple Frog</Text>
                            <Image source={frogDirectories[defaultFrogIndex + 4].image}/>
                            
                            <Separator/>

                            <Text style={styles.modalText}>
                                placeholder
                            </Text>

                            <Pressable
                                style={[styles.button, styles.buttonClose]}
                                onPress={() => setModal4Visible(!modal4Visible)}>
                                <Text style={styles.textStyle}>Exit</Text>
                            </Pressable>
                    </View>
                </View>
            </Modal>

            {/* Red Frog Modal */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={modal5Visible}
                onRequestClose={() => {
                setModal5Visible(!modal5Visible);
            }}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Image/>
                        <Text style={styles.modalTitleText}>Red Frog</Text>
                            <Image source={frogDirectories[defaultFrogIndex + 5].image}/>
                            
                            <Separator/>

                            <Text style={styles.modalText}>
                                placeholder
                            </Text>

                            <Pressable
                                style={[styles.button, styles.buttonClose]}
                                onPress={() => setModal5Visible(!modal5Visible)}>
                                <Text style={styles.textStyle}>Exit</Text>
                            </Pressable>
                    </View>
                </View>
            </Modal>

            {/* White Frog Modal */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={modal6Visible}
                onRequestClose={() => {
                setModal6Visible(!modal6Visible);
            }}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Image/>
                        <Text style={styles.modalTitleText}>White Frog</Text>
                            <Image source={frogDirectories[defaultFrogIndex + 6].image}/>
                            
                            <Separator/>

                            <Text style={styles.modalText}>
                                placeholder
                            </Text>

                            <Pressable
                                style={[styles.button, styles.buttonClose]}
                                onPress={() => setModal6Visible(!modal6Visible)}>
                                <Text style={styles.textStyle}>Exit</Text>
                            </Pressable>
                    </View>
                </View>
            </Modal>

            {/* Dark Gray Frog Modal */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={modal7Visible}
                onRequestClose={() => {
                setModal7Visible(!modal7Visible);
            }}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Image/>
                        <Text style={styles.modalTitleText}>Dark Gray Frog</Text>
                            <Image source={frogDirectories[defaultFrogIndex + 7].image}/>
                            
                            <Separator/>

                            <Text style={styles.modalText}>
                                placeholder
                            </Text>

                            <Pressable
                                style={[styles.button, styles.buttonClose]}
                                onPress={() => setModal7Visible(!modal7Visible)}>
                                <Text style={styles.textStyle}>Exit</Text>
                            </Pressable>
                    </View>
                </View>
            </Modal>

            {/* Brown Frog Modal */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={modal8Visible}
                onRequestClose={() => {
                setModal8Visible(!modal8Visible);
            }}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Image/>
                        <Text style={styles.modalTitleText}>Brown Frog</Text>
                            <Image source={frogDirectories[defaultFrogIndex + 8].image}/>
                            
                            <Separator/>

                            <Text style={styles.modalText}>
                                placeholder
                            </Text>

                            <Pressable
                                style={[styles.button, styles.buttonClose]}
                                onPress={() => setModal8Visible(!modal8Visible)}>
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