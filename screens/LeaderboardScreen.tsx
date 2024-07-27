import * as React from 'react';
import {useRef, useState, useCallback, useEffect} from 'react';
import { Button, View, Text, StyleSheet, ImageBackground, FlatList, ScrollView, StatusBar, TouchableOpacity, Image, TextInput } from 'react-native';
import { frogDirectories, dimensions, showAlert, showAlertAction, parseFUID, getLB, getRankColor} from './../screens/Scripts.tsx';

const SeparatorHorizontalSmall = () => <View style={{marginHorizontal: '1%'}}/>;

function LeaderboardScreen({route, navigation}: {route: any, navigation: any}) {

    //LB State
    const [LB, setLB] = useState<any[]>([])

    const loadLB = useCallback(async () => {
          const newLB = await getLB();
          setLB(newLB);
    }, []);

    // Load when the component mounts
    useEffect(() => {
        loadLB();
        }, [loadLB]);

    //Medal array
    const medalArray = [require('./../assets/first_medal.png'),
        require('./../assets/second_medal.png'),
        require('./../assets/third_medal.png'),
        require('./../assets/frogs/dead_frog_thin.png'),
        require('./../assets/frogs/dead_frog_thin.png'),
    ]

    //User container
    const UserItem = ({ user } : { user: { rank: number; uid: string; name: string; pfp: number; hours: number }}) => {
        return(
            <View style={styles.friendContainer}>
        {[1,2,3].includes(user.rank) ? <View>
        <Image source={medalArray[user.rank - 1]} 
            style={{width: dimensions()._height * 0.06, height: dimensions()._height * 0.06,}}/>
        </View> : ''}
        <View>
            <View style={{flexDirection: 'row', alignItems: 'center',}}>
                <Image source={frogDirectories[user.pfp].image} style={{width: dimensions()._height * 0.05, height: dimensions()._height * 0.0375,}}/>
                <Text style={[styles.friendNameText, {color: getRankColor(user.rank), fontSize: user.name.length >= 10 ? 16 : 20,}]}>{user.name}</Text>
            </View>
        </View>
        
        <View style={{position: 'absolute', right: 20, top: dimensions()._height * 0.01, flexDirection: 'row', alignItems: 'center'}}>
            <Image source={require('./../assets/clock.png')} resizeMode='contain' style={{width: 30, height: 30}}/>
            <SeparatorHorizontalSmall/>
            <Text style={{fontSize: 20, marginVertical: 10, color: 'white', fontWeight: '300'}}>{user.hours >= 60000 ? Math.floor(user.hours/60000) + 'k' : Math.floor(user.hours/60)}</Text>
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
        </View>
        {/* Leaderboard List */}
        <View style={[styles.scrollViewContainer, {top: dimensions()._height * 0.20, height: dimensions()._height * 0.70, alignSelf: 'center', paddingRight: 0}]}>
        <FlatList
        data={LB}
        renderItem={({ item }) => <UserItem user={item} />}
        keyExtractor={(item) => item.rank}
        contentContainerStyle={{ flexGrow: 1}}
        extraData={LB}
        />
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
                onPress={() => navigation.replace('FrogPond')}>
                <Image source={require('./../assets/lily_pad2.png')} style={{height: '100%', width: '100%'}} resizeMode='contain'/>
            </TouchableOpacity>
            <TouchableOpacity style={{flex: 1, width: 40, height: 40, alignItems: 'center'}} 
                onPress={() => ''}>
                <Image source={require('./../assets/trophy.png')} style={{height: '100%', width: '100%'}} resizeMode='contain'/>
            </TouchableOpacity>
            <TouchableOpacity style={{flex: 1, width: 40, height: 40, alignItems: 'center'}} 
                onPress={() => navigation.replace('Profile')}>
                <Image source={require('./../assets/profile.png')} style={{height: '100%', width: '100%'}} resizeMode='contain'/>
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
        width: dimensions()._width * 0.9,
        height: dimensions()._height * 0.075,
        backgroundColor: '#9AC99B',
        padding: 10,
        margin: 10,
        borderRadius: 8.5,
        flexDirection: 'row',
        alignItems: 'center',
    },
    friendNameText: {
        fontWeight: 'bold',
        color: 'white',
        marginLeft: 10,
    },
    scrollViewContainer: {
        position: 'absolute',
        top: dimensions()._height * 0.15,
        alignSelf: 'center',
    },
    cross: {
        width: dimensions()._height * 0.03,
        height: dimensions()._height * 0.03,
        backgroundColor: '#9AC99B'
    },
});