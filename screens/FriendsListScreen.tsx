import * as React from 'react';
import {useRef, useState} from 'react';
import { Button, View, Text, StyleSheet, ImageBackground, FlatList, ScrollView, SafeAreaView, StatusBar, TouchableOpacity, Image, TextInput } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { frogDirectories, dimensions, showAlert, showAlertConfirm, parseFUID, getFriends } from './../screens/Scripts.tsx';
import { getUD, updateUD } from './../screens/HomeScreen.tsx'

function FriendsListScreen({route, navigation}: {route: any, navigation: any}) {

    //function to add friend
    function addFriend(uid : string) {
        const newFriendList = getUD('friends')
        newFriendList.push(uid)
        updateUD('friends', newFriendList)
        setFriendsList(newFriendList)
        return () => {};
    }

    //function to remove friend
    function removeFriend(uid: string) {
        const newFriendList = getUD('friends')
        updateUD('friends', newFriendList.filter((x : string) => x != uid))
        setFriendsList(newFriendList.filter((x : string) => x != uid))
        return () => {};
    }

    
    // Friend container
    const FriendItem = ({ friend } : { friend: { uid: string, name: string; fuid: string; pfp: number } }) => {
        return (
        <View style={styles.friendContainer}>
            <View>
            <View style={{ flexDirection: 'row' }}>
                <Image source={frogDirectories[(friend.pfp)].image} style={{ width: dimensions()._height * 0.05, height: dimensions()._height * 0.0375 }} />
                <Text style={styles.friendNameText}>{friend.name}</Text>
            </View>
            <Text style={styles.userIdText}>{friend.fuid}</Text>
            </View>
            <View style={{ position: 'absolute', right: 20, top: dimensions()._height * 0.025 }}>
            <TouchableOpacity onPress={() => showAlertConfirm('Are you sure you want to remove','','No','Yes',() => () => {} , () => removeFriend(friend.uid) )}>
                <Image source={require('./../assets/green_cross.png')} style={styles.cross} resizeMode="cover" />
            </TouchableOpacity>
            </View>
        </View>
        );
    };

    //Set friends as state for editing
    const [friendsList, setFriendsList] = useState(getUD('friends'))

    //Field for inputting friend code
    const [text, onChangeText] = useState('');

  return (
    // Background Image
    <View style={styles.background}>
        <View style={{flex: 1, alignItems: 'center'}}>
            {/* Title and Friend Count */}
            <View style={{flexDirection: 'row', margin: dimensions()._height * 0.03,}}>
                <TextInput
                    style={styles.input}
                    onChangeText={onChangeText}
                    value={text}
                    placeholder="Add Friend User ID"
                />

                {/* Add Friend Button */}
                <TouchableOpacity onPress={() => {
                    onChangeText("")
                    if (text.length != 8 || !/^\d+$/.test(text)) {showAlert('Please input a 8 digit friend ID','','OK')}
                    else if (+text == getUD('fuid')) {showAlert('That is your own ID!','You silly!','OK')}
                    else{
                        firestore().collection('UserData').where('fuid', '==', +text).get().then((querySnapshot) => {
                            if (querySnapshot.empty) { //if doesnt exist
                                showAlert('No such user exists.','','OK')
                            }
                            else { //if exists, get username from docs
                                const friendUID : string = querySnapshot.docs[0].get('uid')
                                const friendName= querySnapshot.docs[0].get('name')
                                if (getUD('friends').includes(friendUID)) {showAlert('You are already friends with this person','','OK')}
                                else {showAlertConfirm('Do you want to add ' + friendName + ' as friend?', '', 'No', 'Yes', () => () => {}, () => addFriend(friendUID))}
                            }
                })}
                }}>
                    <Image source={require('./../assets/right_arrow.png')} style={styles.confirmButton} resizeMode='cover'/>
                </TouchableOpacity>
            </View>
            <Text style={styles.title}>Friend's List</Text>
            <Text style={styles.friendTotal}>{getUD('friends').length} friends</Text>

            {/* Friend List */}
            <View style={[styles.scrollViewContainer, {top: dimensions()._height * 0.16, height: dimensions()._height * 0.76}]}>
            <FlatList
            data={getFriends(friendsList)}
            renderItem={({ item }) => <FriendItem friend={item} />}
            keyExtractor={(item) => item.uid}
            contentContainerStyle={{ flexGrow: 1}}
            extraData={friendsList}/>
            </View>
        </View>




                        {/*
                        <View style={styles.friendContainer}>
                    <View>
                        <View style={{flexDirection: 'row'}}>
                            <Image source={pfpDirectory} style={{width: dimensions()._height * 0.05, height: dimensions()._height * 0.0375}}/>
                            <Text style={styles.friendNameText}>John Smith</Text>
                        </View>   
                
                        <Text style={styles.userIdText}>0009-1232</Text>
                    </View>
                    
                    <View style={{position: 'absolute', right: 20, top: dimensions()._height * 0.025}}>
                        <TouchableOpacity onPress={() => ''}>
                            <Image source={require('./../assets/green_cross.png')} style={styles.cross} resizeMode='cover'/>
                        </TouchableOpacity>
                    </View>
                </View> */}


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
    </View>
  );
}
export default FriendsListScreen;

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
        justifyContent: 'center',
        position: 'absolute',
        top: dimensions()._height * 0.1

    },
    friendTotal: {
        fontSize: 20,
        fontWeight: '400',
        color: '#FFE7A1',
        position: 'absolute',
        top: dimensions()._height * 0.175,
    },
    friendContainer: {
        width: dimensions()._width * 0.8,
        height: dimensions()._height * 0.075,
        backgroundColor: '#9AC99B',
        padding: 10,
        margin: 10,
        borderRadius: 8.5,
        flexDirection: 'row'
    },
    scrollViewContainer: {
        position: 'absolute',
        top: dimensions()._height * 0.2,
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
    confirmButton: {
        width: 40,
        height: 40,
        backgroundColor: '#478E6D'
    },
    input: {
        width: '75%',
        height: 40,
        borderWidth: 0,
        padding: 10,
        borderRadius: 8.5,
        backgroundColor: 'white'
    },
});