import * as React from 'react';
import {useRef, useState} from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, StatusBar, TouchableOpacity, Image, Modal, Pressable, TextInput } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { getUD, updateUD } from './HomeScreen.tsx'
import { frogDirectories, defaultFrogIndex, dimensions, showAlert, showAlertAction } from './../screens/Scripts.tsx';

const SeparatorVertical = () => <View style={{marginVertical: '2%'}}/>;
const SeparatorVerticalSmall = () => <View style={{marginVertical: '0.5%'}}/>;
const SeparatorHorizontal = () => <View style={{marginHorizontal: '5%'}}/>;

function ProfileScreen({navigation}: {navigation: any}) {
  const [usernameModalVisible, setUsernameModalVisible] = useState(false);
  const [pfpModalVisible, setPFPModalVisible] = useState(false);
  const [text, onChangeText] = React.useState('');
  const [displayImage, setDisplayImage] = useState(getUD('pfp'));

  //function for showing available frogs when changing pfp
  function frogDisplay(n : number) {
    if (getUD('frogs')[n] != 0) {
      return frogDirectories[n + defaultFrogIndex].image
    }
    else {
      return frogDirectories[1].image
    }
  }

  //function when pfp changed
  function updatePFP(n : number) {
    setDisplayImage(defaultFrogIndex + n);
    updateUD('pfp', n + defaultFrogIndex)
  }

  //function for showing alert when clicking locked pfp
  function frogLockedAlert() {
    showAlert('Frog not unlocked yet!','Grow more frogs to unlock this frog.','OK')
  }

  return (
    <View style={styles.background}>
      <View style={{flex: 1}}>
        {/* Top Banner */}
        <View style={styles.banner}>
          {/* Friendly UID */}
          <Text style={{fontSize: 20, margin: 10, color: 'white', fontWeight: '300', position: 'absolute', top: 0, left: 0}}>
            {/*turns friendlyUID into xxxx-xxxx*/}
            {("00000000" + getUD('fuid').toString()).slice(-8).replace(/(\d{4})(\d{4})/, "$1-$2")}
          </Text>
        </View>

        {/* Profile Picture Frame */}
        <View style={styles.pfpOuterFrame}>
          <View style={styles.pfpInnerFrame}>
            {/* Profile Picture Location */}
            <Image source={frogDirectories[displayImage].image} resizeMode='contain' style={styles.pfp}/>
            </View>
        </View>

        {/* Username */}
        <View style={{alignItems: 'center', alignSelf: 'center', justifyContent: 'center', position: 'absolute', top: dimensions()._height * 0.29, flexDirection: 'row'}}>
        
        {/* Change Profile Picture Button */}
        <View>
            <Modal
              animationType="slide"
              transparent={true}
              visible={pfpModalVisible}
              onRequestClose={() => {
              setPFPModalVisible(!pfpModalVisible);
            }}>
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  
                  <View style={{flexDirection: 'row'}}>
                    {/* icon 0, row 1, col 1 */}
                    <Pressable
                        style={[styles.button, styles.buttonClose]}
                        onPress={() => {
                        setPFPModalVisible(!pfpModalVisible);
                        updatePFP(0);
                        }}>
                        <Image source={frogDirectories[defaultFrogIndex].image} resizeMode='contain' style={styles.pfpModal}/>
                    </Pressable>

                    <SeparatorHorizontal/>

                    {/* icon 1, row 1, col 2 */}
                    <Pressable
                        style={[styles.button, styles.buttonClose]}
                        onPress={() => {
                          setPFPModalVisible(!pfpModalVisible);
                          if (getUD('frogs')[1] != 0) {
                            updatePFP(1)
                          } else {frogLockedAlert()}}}>
                          <Image source={frogDisplay(1)} resizeMode='contain' style={styles.pfpModal}/>
                    </Pressable>

                    <SeparatorHorizontal/>

                    {/* icon 2, row 1, col 3 */}
                    <Pressable
                        style={[styles.button, styles.buttonClose]}
                        onPress={() => {
                          setPFPModalVisible(!pfpModalVisible);
                          if (getUD('frogs')[2] != 0) {
                            updatePFP(2)
                          } else {frogLockedAlert()}}}>
                        <Image source={frogDisplay(2)} resizeMode='contain' style={styles.pfpModal}/>
                    </Pressable>

                  </View>

                  <SeparatorVertical/>

                  <View style={{flexDirection: 'row'}}>
                    {/* icon 3, row 2, col 1 */}
                    <Pressable
                        style={[styles.button, styles.buttonClose]}
                        onPress={() => {
                        setPFPModalVisible(!pfpModalVisible);
                        if (getUD('frogs')[3] != 0) {
                          updatePFP(3)
                        } else {frogLockedAlert()}}}>
                        <Image source={frogDisplay(3)} resizeMode='contain' style={styles.pfpModal}/>
                    </Pressable>

                    <SeparatorHorizontal/>

                    {/* icon 4, row 2, col 2 */}
                    <Pressable
                        style={[styles.button, styles.buttonClose]}
                        onPress={() => {
                          setPFPModalVisible(!pfpModalVisible);
                          if (getUD('frogs')[4] != 0) {
                            updatePFP(4)
                          } else {frogLockedAlert()}}}>
                        <Image source={frogDisplay(4)} resizeMode='contain' style={styles.pfpModal}/>
                    </Pressable>

                    <SeparatorHorizontal/>

                    {/* icon 5, row 2, col 3 */}
                    <Pressable
                        style={[styles.button, styles.buttonClose]}
                        onPress={() => {
                          setPFPModalVisible(!pfpModalVisible);
                          if (getUD('frogs')[5] != 0) {
                            updatePFP(5)
                          } else {frogLockedAlert()}}}>
                        <Image source={frogDisplay(5)} resizeMode='contain' style={styles.pfpModal}/>
                    </Pressable>

                  </View>

                  <SeparatorVertical/>

                  <View style={{flexDirection: 'row'}}>
                    {/* icon 6, row 3, col 1 */}
                    <Pressable
                        style={[styles.button, styles.buttonClose]}
                        onPress={() => {
                        setPFPModalVisible(!pfpModalVisible);
                        if (getUD('frogs')[6] != 0) {
                          updatePFP(6)
                        } else {frogLockedAlert()}}}>
                        <Image source={frogDisplay(6)} resizeMode='contain' style={styles.pfpModal}/>
                    </Pressable>

                    <SeparatorHorizontal/>

                    {/* icon 7, row 3, col 2 */}
                    <Pressable
                        style={[styles.button, styles.buttonClose]}
                        onPress={() => {
                          setPFPModalVisible(!pfpModalVisible);
                          if (getUD('frogs')[7] != 0) {
                            updatePFP(7)
                          } else {frogLockedAlert()}}}>
                        <Image source={frogDisplay(7)} resizeMode='contain' style={styles.pfpModal}/>
                    </Pressable>

                    <SeparatorHorizontal/>

                    {/* icon 8, row 3, col 3 */}
                    <Pressable
                        style={[styles.button, styles.buttonClose]}
                        onPress={() => {
                          setPFPModalVisible(!pfpModalVisible);
                          if (getUD('frogs')[8] != 0) {
                            updatePFP(8)
                          } else {frogLockedAlert()}}}>
                        <Image source={frogDisplay(7)} resizeMode='contain' style={styles.pfpModal}/>
                    </Pressable>

                  </View>

                  <SeparatorVertical/>

                  <View style={{flexDirection: 'row'}}>
                    {/* Exit Modal Button */}
                    <Pressable
                        style={[styles.button, styles.buttonClose]}
                        onPress={() => setPFPModalVisible(!pfpModalVisible)}>
                        <Text style={styles.textStyle}>Exit</Text>
                    </Pressable>

                  </View>
                </View>
              </View>
            </Modal>

            <Pressable
              onPress={() => setPFPModalVisible(true)}>
              <Image source={require('./../assets/edit_image.png')} resizeMode='contain' style={{width: 30, height: 30}}/>
            </Pressable>
          </View>  

          {/* Username display */}
          <View>
            <Text style={{fontSize: 20, marginVertical: 10, color: 'white', fontWeight: '300'}}>
              {getUD('name')}
            </Text>
          </View>
        
          {/* Change Username Button */}
          <View>
            <Modal
              animationType="slide"
              transparent={true}
              visible={usernameModalVisible}
              onRequestClose={() => {
              setUsernameModalVisible(!usernameModalVisible);
            }}>
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  
                  {/* Input Box */}
                  <TextInput
                  style={styles.input}
                  onChangeText={onChangeText}
                  value={text}
                  placeholder="New Username"
                  />

                  <SeparatorVertical/>

                  <View style={{flexDirection: 'row'}}>
                    {/* Exit Modal Button */}
                    <Pressable
                        style={[styles.button, styles.buttonClose]}
                        onPress={() => setUsernameModalVisible(!usernameModalVisible)}>
                        <Text style={styles.textStyle}>Exit</Text>
                    </Pressable>

                    <SeparatorHorizontal/>

                    {/* Confirm Change Username Button */}
                    <Pressable
                        style={[styles.button, styles.buttonClose]}
                        onPress={() => {
                          if (text != "") {
                            updateUD('name', text);
                            setUsernameModalVisible(!usernameModalVisible)
                          }
                          else {
                            showAlert('Please enter a username','','OK')
                          }
                        }}>
                        <Text style={styles.textStyle}>Change Username</Text>
                    </Pressable>
                  </View>
                </View>
              </View>
            </Modal>

            <Pressable
              onPress={() => setUsernameModalVisible(true)}>
              <Image source={require('./../assets/edit_pencil.png')} resizeMode='contain' style={{width: 30, height: 30}}/>
            </Pressable>

          </View>
        </View>

      </View>
      
      {/* Achievements */}
      <SafeAreaView style={styles.scrollViewContainer}>
        <ScrollView style={{marginTop: 20}}>

          <View style={styles.achievementContainer}>
            <View>
              {/* Achievement Name */}
              <Text style={{color: '#478E6D', fontSize: 19, fontWeight: 'bold'}}>Focus Time 1</Text>
              {/* Achievement Description */}
              <Text style={{color: 'black'}}>Focus for 4 hours total</Text>
            </View>

            <View style={{position: 'absolute', right: 0, margin: 5, marginTop: 10}}>
              {/* Locked/Unlocked? */}
              <Image source={require('./../assets/tick.png')} resizeMode='contain' style={{position: 'absolute', right: 0, marginRight: 5, width: 30, height: 30}}/>
            </View>

            <View style={{position: 'absolute', right: 0, bottom: 0, margin: 10}}>
              {/* Progress */}
              <Text style={{color: '#AB9D78', fontSize: 16, fontWeight: 'bold'}}>4/4</Text>
            </View>
          </View>


          <View style={styles.achievementLockedContainer}>
            <View>
              {/* Achievement Name */}
              <Text style={{color: '#478E6D', fontSize: 19, fontWeight: 'bold'}}>Focus Time 2</Text>
              {/* Achievement Description */}
              <Text style={{color: 'black'}}>Focus for 10 hours total</Text>
            </View>

            <View style={{position: 'absolute', right: 0, margin: 5, marginTop: 10}}>
              {/* Locked/Unlocked? */}
              <Image source={require('./../assets/green_cross.png')} resizeMode='contain' style={{position: 'absolute', right: 0, marginRight: 5, width: 30, height: 30}}/>
            </View>

            <View style={{position: 'absolute', right: 0, bottom: 0, margin: 10}}>
              {/* Progress */}
              <Text style={{color: '#AB9D78', fontSize: 16, fontWeight: 'bold'}}>4/10</Text>
            </View>
          </View>

        </ScrollView>
      </SafeAreaView>

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
    height: dimensions()._height * 0.08,
    backgroundColor: '#9AC99B',
    padding: 10,
    margin: 10,
    borderRadius: 8.5,
  },
  achievementLockedContainer: {
    width: dimensions()._width * 0.8,
    height: dimensions()._height * 0.08,
    backgroundColor: '#BEBBBB',
    padding: 10,
    margin: 10,
    borderRadius: 8.5,
    flexDirection: 'row'
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
  },
  input: {
    width: dimensions()._width * 0.5,
    height: 40,
    margin: 6,
    borderWidth: 0,
    padding: 10,
    borderRadius: 8.5,
    backgroundColor: 'white'
  },
  pfpModal: {
    height: dimensions()._height * 0.05,
    width: dimensions()._height * 0.05
  }
});