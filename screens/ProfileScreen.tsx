import * as React from 'react';
import {
  Button,
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Image
} from 'react-native';

const { height, width } = Dimensions.get('window')
const pfpDirectories = [
  {image: require('./../assets/frogs/default_frog.png')},
  {image: require('./../assets/frogs/blue_frog.png')}
]
function dimensions() {

  var _borderRadius = Math.round((height + width) / 2),
      _height = Math.round(height),
      _width = Math.round(width)

  return { _borderRadius, _height, _width }
}

function ProfileScreen({ navigation}: {navigation: any}) {
  const pfpDirectory = pfpDirectories[1].image;
  return (
    <View style={styles.background}>
      <View style={{flex: 1}}>
        {/* Top Banner */}
        <View style={styles.banner}>
          {/* Name */}
          <Text style={{fontSize: 20, margin: 10, color: 'white', fontWeight: '300', position: 'absolute', top: 0, left: 0}}>
            0000-0000
          </Text>

          {/* Friends List Button */}
          <TouchableOpacity style={styles.friendsListButton} 
            onPress={() => navigation.navigate('FriendsList')}>
            <Image source={require('./../assets/friends_list_alex.png')} style={styles.friendsListIcon} resizeMode='contain'/>
          </TouchableOpacity>
        </View>

        {/* Profile Picture Frame */}
        <View style={styles.pfpOuterFrame}>
          <View style={styles.pfpInnerFrame}>
            {/* Profile Picture Location */}
            <Image source={pfpDirectory} resizeMode='contain' style={styles.pfp}/>
            </View>
        </View>

        <View style={{alignItems: 'center', alignSelf: 'center', justifyContent: 'center', position: 'absolute', top: dimensions()._height * 0.29, flexDirection: 'row'}}>
          <View>
            <Text style={{fontSize: 20, marginVertical: 10, color: 'white', fontWeight: '300'}}>
                John Smith
            </Text>
          </View>
        
          <TouchableOpacity>
              <Image source={require('./../assets/edit_pencil.png')} resizeMode='contain' style={{width: 30, height: 30}}/>
          </TouchableOpacity>
        </View>
      </View>
      
      {/* Achievements */}
      <SafeAreaView style={styles.scrollViewContainer}>
        <ScrollView style={{marginTop: 20}}>
          <View style={styles.achievementContainer}></View>
          <View style={styles.achievementContainer}></View>
          <View style={styles.achievementContainer}></View>
          <View style={styles.achievementContainer}></View>
          <View style={styles.achievementContainer}></View>
          <View style={styles.achievementContainer}></View>
          <View style={styles.achievementContainer}></View>
        </ScrollView>
    </SafeAreaView>
    </View>
  );
}
export default ProfileScreen;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: "#34AA95",
  },
  banner: {
    position: 'absolute',
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#478E6D',
    width: dimensions()._width,
    height: dimensions()._height * 0.2
  },
  pfp: {
    height: dimensions()._height * 0.1,
    width: dimensions()._height * 0.1
  },
  pfpInnerFrame: {
    width: dimensions()._height * 0.175,
    height: dimensions()._height * 0.175,
    borderRadius: dimensions()._borderRadius,
    backgroundColor: '#FFE7A1',
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center'
  },
  pfpOuterFrame: {
    position: 'absolute',
    top: dimensions()._height * 0.1,
    width: dimensions()._height * 0.2,
    height: dimensions()._height * 0.2,
    borderRadius: dimensions()._borderRadius,
    backgroundColor: '#C8B88A',
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center'
  },
  scrollViewContainer: {
    flex: 2,
    paddingTop: StatusBar.currentHeight,
    alignSelf: 'center',
  },
  text: {
    fontSize: 42,
  },
  achievementContainer: {
    width: dimensions()._width * 0.8,
    height: dimensions()._height * 0.075,
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 10,
    margin: 10,
    borderRadius: 8.5,
  },
  friendsListIcon: {
    height: '100%',
    width: '100%',
  },
  friendsListButton: {
    margin: 5,
    position: 'absolute',
    top: 0,
    right: 0,
    borderRadius: 8.5,
    width: 40,
    height: 40,
  }
});