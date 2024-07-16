import * as React from 'react';
import {useRef, useState} from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, Image } from 'react-native';
import { frogDirectories, dimensions, defaultFrogIndex, GachaNumberGenerator} from './../screens/Scripts.tsx'
import { getUD, updateUD } from './../screens/HomeScreen.tsx'
import auth from '@react-native-firebase/auth';

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
    return (
        <ImageBackground source={require('./../assets/frog_pond_background.png')} resizeMode='cover' style={styles.imageSizing}>
            <View style={{position: 'absolute', right: 0, borderRadius: 10, margin: 7, padding: 3, backgroundColor: '#516D67'}}>  
                <TouchableOpacity
                    onPress={() => auth()
                        .signOut()
                        .catch(error => {console.log("error")})
                        }>
                    <Image source={require('./../assets/log_out.png')} resizeMode='contain' style={{width: 20, height: 20}}/>
                </TouchableOpacity>
            </View>
            
            <View style={styles.messageBox}>
                <Text style={{fontSize: 13, fontWeight: 'bold'}}>Motivational Message</Text>
                <Text>{motivationalMessages[index]}</Text>
            </View>
            {/* Frog Displays */}
            {/* If Else Statement for frogs, basically if he has the frog, then whatever is below, else empty view */}
            {/* arr[index] != 0 ? (the view) : <View></View> */}
            {/* Default */}
            <View style={{position: 'absolute', top: dimensions()._height * 0.4, left: dimensions()._width * 0.45}}>
                <Image source={frogDirectories[defaultFrogIndex].image}/>
            </View>
            {/* Blue */}
            <View style={{position: 'absolute', top: dimensions()._height * 0.45, left: dimensions()._width * 0.6}}>
                <Image source={frogDirectories[defaultFrogIndex + 1].image}/>
            </View>
            {/* Ocean */}
            <View style={{position: 'absolute', top: dimensions()._height * 0.35, left: dimensions()._width * 0.2}}>
                <Image source={frogDirectories[defaultFrogIndex + 2].image}/>
            </View>
            {/* Gray */}
            <View style={{position: 'absolute', top: dimensions()._height * 0.3, left: dimensions()._width * 0.4}}>
                <Image source={frogDirectories[defaultFrogIndex + 3].image}/>
            </View>
            {/* Purple */}
            <View style={{position: 'absolute', top: dimensions()._height * 0.35, left: dimensions()._width * 0.58}}>
                <Image source={frogDirectories[defaultFrogIndex + 4].image}/>
            </View>
            {/* Red */}
            <View style={{position: 'absolute', top: dimensions()._height * 0.42, left: dimensions()._width * 0.1}}>
                <Image source={frogDirectories[defaultFrogIndex + 5].image}/>
            </View>
            {/* White */}
            <View style={{position: 'absolute', top: dimensions()._height * 0.43, left: dimensions()._width * 0.3}}>
                <Image source={frogDirectories[defaultFrogIndex + 6].image}/>
            </View>
            {/* Dark Gray */}
            <View style={{position: 'absolute', top: dimensions()._height * 0.48, left: dimensions()._width * 0.28}}>
                <Image source={frogDirectories[defaultFrogIndex + 7].image}/>
            </View>
            {/* Brown */}
            <View style={{position: 'absolute', top: dimensions()._height * 0.49, left: dimensions()._width * 0.45}}>
                <Image source={frogDirectories[defaultFrogIndex + 8].image}/>
            </View>

            {/* Navbar */}
            <View style={{position: 'absolute', top: dimensions()._height * 0.915, justifyContent: 'center', alignItems: 'center', backgroundColor: '#516D67', width: dimensions()._width, height: dimensions()._height * 0.2, flexDirection: 'row'}}>
                
                <TouchableOpacity style={{position: 'absolute', top: 0, right: dimensions()._width * 0.2 - 40, width: 40, height: 40,}} 
                    onPress={() => navigation.navigate('Profile')}>
                    <Image source={require('./../assets/profile.png')} style={{height: '100%', width: '100%'}} resizeMode='contain'/>
                </TouchableOpacity>

                <TouchableOpacity style={{position: 'absolute', top: dimensions()._height * 0.002, left: dimensions()._width * 0.575, width: 40, height: 40,}} 
                    onPress={() => navigation.navigate('FrogPond')}>
                    <Image source={require('./../assets/lily_pad2.png')} style={{height: '100%', width: '100%'}} resizeMode='contain'/>
                </TouchableOpacity>

                <TouchableOpacity style={{position: 'absolute', top: 0, right: dimensions()._width * 0.575, width: 40, height: 40,}} 
                    onPress={() => navigation.navigate('Lock')}>
                    <Image source={require('./../assets/lock.png')} style={{height: '100%', width: '100%'}} resizeMode='contain'/>
                </TouchableOpacity>
                
                <TouchableOpacity style={{position: 'absolute', top: 0, right: dimensions()._width * 0.8, width: 40, height: 40,}} 
                    onPress={() => navigation.navigate('FriendsList')}>
                    <Image source={require('./../assets/friends_list_alex.png')} style={{height: '100%', width: '100%'}} resizeMode='contain'/>
                </TouchableOpacity>
            </View>            
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
    }
 });