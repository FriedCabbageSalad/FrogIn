import * as React from 'react';
import {useRef, useState} from 'react';
import {
    View,
    Text,
    StyleSheet,
    ImageBackground,
    TouchableOpacity,
    Image,
} from 'react-native';
import { frogDirectories, dimensions} from './../screens/Scripts.tsx'
import { getUD, updateUD } from './../screens/HomeScreen.tsx'
import auth from '@react-native-firebase/auth';

function FrogPondScreen({route, navigation}: {route: any, navigation: any}) {
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
            {/* Frog */}
            <View style={{position: 'absolute', top: dimensions()._height * 0.4, left: dimensions()._width * 0.45}}>
                <Image source={frogDirectories[3].image}/>
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
 });