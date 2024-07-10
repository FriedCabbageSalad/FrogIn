import * as React from 'react';
import {useRef, useState} from 'react';
import {
    View,
    Text,
    StyleSheet,
    ImageBackground,
    Dimensions,
    TouchableOpacity,
    Image
} from 'react-native';

const { height, width } = Dimensions.get('window')

function dimensions() {

    var _height = Math.round(height),
        _width = Math.round(width)
  
    return { _height, _width }
  }

function FrogPondScreen({navigation}: {navigation: any}) {
    return (
        <ImageBackground source={require('./../assets/frog_pond_background.png')} resizeMode='cover' style={styles.imageSizing}>

            <View style={styles.navbar}>
                {/* button to profile */}
                <TouchableOpacity style={{position: 'absolute', top: 0, right: dimensions()._width * 0.25 - 40, width: 40, height: 40,}} 
                    onPress={() => navigation.navigate('FriendsList')}>
                    <Image source={require('./../assets/profile.png')} style={{height: '100%', width: '100%'}} resizeMode='contain'/>
                </TouchableOpacity>

                <TouchableOpacity style={{position: 'absolute', top: 0, width: 40, height: 40,}} 
                    onPress={() => navigation.navigate('Lock')}>
                    <Image source={require('./../assets/lock.png')} style={{height: '100%', width: '100%'}} resizeMode='contain'/>
                </TouchableOpacity>
                
                <TouchableOpacity style={{position: 'absolute', top: 0, right: dimensions()._width * 0.75, width: 40, height: 40,}} 
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
    navbar: {
        position: 'absolute',
        top: dimensions()._height * 0.85,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#516D67',
        width: dimensions()._width,
        height: dimensions()._height * 0.2,
        flexDirection: 'row'
    },
 });