import * as React from 'react';
import {useRef, useState, useCallback, useEffect} from 'react';
import { Button, View, Text, StyleSheet, ImageBackground, FlatList, ScrollView, SafeAreaView, StatusBar, TouchableOpacity, Image, TextInput } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { frogDirectories, dimensions, showAlert, showAlertAction, parseFUID, getLB, getRankColor} from './../screens/Scripts.tsx';

const SeparatorHorizontalSmall = () => <View style={{marginHorizontal: '1%'}}/>;

function LeaderboardScreen({route, navigation}: {route: any, navigation: any}) {

    //LB State
    const [LB, setLB] = useState<any[]>()
    async function iniLB() {
        const retLB = await getLB();
        setLB(retLB)
    }
    iniLB()

    const loadLB = useCallback(async () => {
          // Replace this with your actual data fetching logic
          const newLB = await getLB();
          setLB(newLB);
      }, []);

    // Load achievements when the component mounts
    useEffect(() => {
        loadLB();
        }, [loadLB]);
    
    //User container
    const UserItem = ({ user } : { user: { rank: number; uid: string; name: string; pfp: number; hours: number } }) => {
        return(
            <View style={styles.friendContainer}>
        <View>
            <View style={{flexDirection: 'row'}}>
                <Image source={frogDirectories[user.pfp].image} style={{width: dimensions()._height * 0.05, height: dimensions()._height * 0.0375}}/>
                <Text style={[styles.friendNameText, {color: getRankColor(user.rank)}]}>{user.name}</Text>
            </View>   
        </View>
        
        <View style={{position: 'absolute', right: 20, top: dimensions()._height * 0.01, flexDirection: 'row', alignItems: 'center'}}>
            <Image source={require('./../assets/clock.png')} resizeMode='contain' style={{width: 30, height: 30}}/>
            <SeparatorHorizontalSmall/>
            <Text style={{fontSize: 20, marginVertical: 10, color: 'white', fontWeight: '300'}}>{Math.floor(user.hours/60)}</Text>
        </View>
    </View>
    )}

    const [text, onChangeText] = React.useState('');

  return (
    // Background Image
    <View style={styles.background}>
        <View style={{ alignItems: 'center', alignSelf: 'center', position: 'absolute', top: dimensions()._height * 0.05}}>
            <View style={{flexDirection: 'row', alignItems: 'center',}}>
                <Image source={require('./../assets/trophy_full.png')} style={{width: dimensions()._height * 0.06, height: dimensions()._height * 0.06}}/>
                <SeparatorHorizontalSmall/>
                <Text style={styles.title}>Leaderboard</Text>
            </View>
            
            <Text style={styles.friendTotal}>Top 5 Hours Focused</Text>
        
        {/* Medals */}
        </View>
            <Image source={require('./../assets/first_medal.png')} 
            style={{width: dimensions()._height * 0.06, height: dimensions()._height * 0.06, position: 'absolute', top: dimensions()._height * 0.162}}/>
            <Image source={require('./../assets/second_medal.png')} 
            style={{width: dimensions()._height * 0.06, height: dimensions()._height * 0.06, position: 'absolute', top: dimensions()._height * 0.262}}/>
            <Image source={require('./../assets/third_medal.png')} 
            style={{width: dimensions()._height * 0.06, height: dimensions()._height * 0.06, position: 'absolute', top: dimensions()._height * 0.362}}/>
        <View>

        </View>

            {/* Leaderboard List */}
            <View style={[styles.scrollViewContainer, {top: dimensions()._height * 0.12, height: dimensions()._height * 0.76}]}>
            <FlatList
            data={LB}
            renderItem={({ item }) => <UserItem user={item} />}
            keyExtractor={(item) => item.rank}
            contentContainerStyle={{ flexGrow: 1}}
            extraData={LB}
            />
            </View>
        
{/* 
            {/* User Object 
            <View style={styles.friendContainer}>
        <View>
            <View style={{flexDirection: 'row'}}>
                <Image source={pfpDirectory} style={{width: dimensions()._height * 0.05, height: dimensions()._height * 0.0375}}/>
                <Text style={styles.friendNameText}>John Smith</Text>
            </View>   

            <Text style={styles.userIdText}>0009-1232</Text>
        </View>
        
        <View style={{position: 'absolute', right: 20, top: dimensions()._height * 0.01, flexDirection: 'row', alignItems: 'center'}}>
            <Image source={require('./../assets/clock.png')} resizeMode='contain' style={{width: 30, height: 30}}/>
            <SeparatorHorizontalSmall/>
            <Text style={{fontSize: 20, marginVertical: 10, color: 'white', fontWeight: '300'}}>
                300h
            </Text>
        </View>
    </View>
     */}

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
    </View>
  );
}
export default LeaderboardScreen;

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: "#478E6D",
    },
    title: {
        fontSize: 36,
        fontWeight: 'bold',
        color: 'white',
        alignSelf: 'center',
    },
    friendTotal: {
        fontSize: 20,
        fontWeight: '400',
        color: '#FFE7A1',
    },
    friendContainer: {
        width: dimensions()._width * 0.72,
        height: dimensions()._height * 0.075,
        backgroundColor: '#9AC99B',
        padding: 10,
        margin: 10,
        borderRadius: 8.5,
        flexDirection: 'row'
    },
    scrollViewContainer: {
        position: 'absolute',
        top: dimensions()._height * 0.15,
        paddingTop: StatusBar.currentHeight,
        alignSelf: 'center',
    },
    friendNameText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'left',
        marginHorizontal: 5,
    },
    userIdText: {
        fontSize: 14,
        fontWeight: '400',
        color: '#FFE7A1',
        marginLeft: 5
    },
    cross: {
        width: dimensions()._height * 0.03,
        height: dimensions()._height * 0.03,
        backgroundColor: '#9AC99B'
    },
});