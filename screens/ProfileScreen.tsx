import * as React from 'react';
import {useRef, useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, ScrollView, StatusBar, TouchableOpacity, Image, Modal, Pressable, TextInput } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { getUD, updateUD } from './HomeScreen.tsx'
import { frogDirectories, defaultFrogIndex, dimensions, showAlert, showAlertAction, parseFUID, getAchievements, isUnlocked, getRarityColour, frogName, frogRarity } from './../screens/Scripts.tsx';

const SeparatorVertical = () => <View style={{marginVertical: '2%'}}/>;
const SeparatorHorizontal = () => <View style={{marginHorizontal: '5%'}}/>;
const SeparatorHorizontalSmall = () => <View style={{marginHorizontal: '1%'}}/>;

function ProfileScreen({navigation}: {navigation: any}) {
  const [usernameModalVisible, setUsernameModalVisible] = useState(false)
  const [pfpModalVisible, setPFPModalVisible] = useState(false)
  const [text, onChangeText] = React.useState('')
  const [displayImage, setDisplayImage] = useState(getUD('pfp'))
  const [outcomeModalVisible, setOutcomeModalVisible] = useState(false)
  const [achievementFrog, setAchievementFrog] = useState(0)
  const [achievementsList, setAchievementsList] = useState<any[]>()

  const loadAL = useCallback(() => {
    const newAL = getAchievements(getUD('mins'), getUD('frogs'), getUD('friends'), getUD('achievements'));
    setAchievementsList(newAL);
  }, []);

  // Load when the component mounts
  useEffect(() => {
    loadAL();
  }, [loadAL]);

  // Function for displaying achievement in list
  function AchievementItem({ achievement }: { achievement: { id: string; name: string; description: string; progress: string; claimed: boolean } }) {
    const isCompleted = isUnlocked(achievement.progress);
    const [claimed, setClaimed] = useState(achievement.claimed ? styles.claimButtonIncomplete : styles.claimButtonCompleted)
    return (
      <View style={isCompleted ? styles.achievementContainer : styles.achievementLockedContainer}>
        <View>
          <Text style={styles.achievementName}>{achievement.name}</Text>
          <Text style={styles.achievementDescription}>{achievement.description}</Text>
        </View>
        <View style={styles.statusContainer}>
          {isCompleted && (
            <Image
              source={require('./../assets/tick.png')}
              resizeMode='contain'
              style={styles.tickImage}
            />
          )}
        </View>
        <View style={styles.progressContainer}>
          <Text style={styles.progressText}>{achievement.progress}</Text>
        </View>
        { ['5','10','15'].includes(achievement.id) &&
        <TouchableOpacity 
          style={[
            styles.claimButton, 
            isCompleted ? (claimed) : styles.claimButtonIncomplete
          ]}
          onPress={() => {
            if (isCompleted && !achievement.claimed) {
              claim(+achievement.id)
              setClaimed(styles.claimButtonIncomplete);
            }
            else if (!isCompleted) {            
              showAlert("You haven't unlocked this yet!",'','OK')
            }
            else if (achievement.claimed) {
              showAlert("You have already claimed the prize!",'','OK')
          }}
        }>
          <Text style={styles.claimButtonText}>{(claimed == styles.claimButtonIncomplete) ? 'Claimed' : 'Claim'}</Text>
        </TouchableOpacity>}
      </View>
    );
  }

  //function for showing available frogs when changing pfp
  function frogDisplay(n : number) {
    if (n <= 8) {
      if (getUD('frogs')[n] != 0) {
        return frogDirectories[n + defaultFrogIndex].image
      }
      else {
        return frogDirectories[1].image
      }
    }
    if (n >= 9) {
      if (getUD('achievements').includes(((n-8)*5))) {
        return frogDirectories[n + defaultFrogIndex].image
      }
      else {
        return frogDirectories[1].image
      }
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

  // Function for claiming achievement
  function claim(num : number) {
    let UDachievement : any[] = getUD('achievements')
    UDachievement.push(num)
    updateUD('achievements', UDachievement)
    setAchievementFrog((num/5)+8+defaultFrogIndex)
    setOutcomeModalVisible(true)
    loadAL()
  }

  return (
    <View style={styles.background}>
      <View style={{flex: 1}}>
        {/* Top Banner */}
        <View style={styles.banner}>
          {/* Friendly UID */}
          <Text style={{fontSize: 20, margin: 10, color: 'white', fontWeight: '300', position: 'absolute', top: 0, left: 0}}>
            {/*turns friendlyUID into xxxx-xxxx*/}
            {parseFUID(getUD('fuid'))}
          </Text>
        </View>

        {/* Profile Picture Frame */}
        <View style={styles.pfpOuterFrame}>
          <View style={styles.pfpInnerFrame}>
            {/* Profile Picture Location */}
            <Image source={frogDirectories[displayImage].image} resizeMode='contain' style={styles.pfp}/>
            </View>
        </View>

        {/* Achievement Prize Modal */}
        <Modal
            animationType="slide"
            transparent={true}
            visible={outcomeModalVisible}
            onRequestClose={() => {
            setOutcomeModalVisible(!outcomeModalVisible);
        }}>
            <View style={styles.centeredView}>
                <View style={styles.outcomeView}>
                    <Text style={styles.modalTitleText}>You got a</Text>

                    {/* Frog Display */}
                    <View style={styles.outerCircle}>
                        <View style={styles.innerCicle}>
                            <Image source={frogDirectories[achievementFrog].image} style={styles.tank} resizeMode='contain'/>
                        </View>
                    </View>
                    <SeparatorVertical/>
                    <View>
                        {/* Frog Rarity Text */}
                        <Text style={{textAlign: 'center', fontSize: 22, fontWeight: '900', color: getRarityColour(achievementFrog)}}>
                            {frogRarity[achievementFrog]}
                        </Text>
                        {/* Frog Name Text */}
                        <Text style={{textAlign: 'center', fontSize: 18}}>
                            {frogName[achievementFrog]}! Check it out over at your frog pond!
                        </Text>
                    </View>
                    <SeparatorVertical/>
                    <Pressable
                        style={[styles.button, styles.buttonClose]}
                        onPress={() => setOutcomeModalVisible(!outcomeModalVisible)}>
                        <Text style={styles.textStyle}>Exit</Text>
                    </Pressable>
                </View>
            </View>
        </Modal>

        {/* Change Profile Picture Button */}
        <View style={{position: 'absolute', top: '20%', left : '69%'}}>
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
                      updatePFP(0);
                      setPFPModalVisible(!pfpModalVisible);
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
                          setPFPModalVisible(!pfpModalVisible);
                        } else {frogLockedAlert()}}}>
                        <Image source={frogDisplay(1)} resizeMode='contain' style={styles.pfpModal}/>
                  </Pressable>

                  <SeparatorHorizontal/>

                  {/* icon 2, row 1, col 3 */}
                  <Pressable
                      style={[styles.button, styles.buttonClose]}
                      onPress={() => {
                        if (getUD('frogs')[2] != 0) {
                          updatePFP(2)
                          setPFPModalVisible(!pfpModalVisible);
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
                      if (getUD('frogs')[3] != 0) {
                        updatePFP(3)
                        setPFPModalVisible(!pfpModalVisible);
                      } else {frogLockedAlert()}}}>
                      <Image source={frogDisplay(3)} resizeMode='contain' style={styles.pfpModal}/>
                  </Pressable>

                  <SeparatorHorizontal/>

                  {/* icon 4, row 2, col 2 */}
                  <Pressable
                      style={[styles.button, styles.buttonClose]}
                      onPress={() => {
                        if (getUD('frogs')[4] != 0) {
                          updatePFP(4)
                          setPFPModalVisible(!pfpModalVisible);
                        } else {frogLockedAlert()}}}>
                      <Image source={frogDisplay(4)} resizeMode='contain' style={styles.pfpModal}/>
                  </Pressable>

                  <SeparatorHorizontal/>

                  {/* icon 5, row 2, col 3 */}
                  <Pressable
                      style={[styles.button, styles.buttonClose]}
                      onPress={() => {
                        if (getUD('frogs')[5] != 0) {
                          updatePFP(5)
                          setPFPModalVisible(!pfpModalVisible);
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
                      if (getUD('frogs')[6] != 0) {
                        updatePFP(6)
                        setPFPModalVisible(!pfpModalVisible);
                      } else {frogLockedAlert()}}}>
                      <Image source={frogDisplay(6)} resizeMode='contain' style={styles.pfpModal}/>
                  </Pressable>

                  <SeparatorHorizontal/>

                  {/* icon 7, row 3, col 2 */}
                  <Pressable
                      style={[styles.button, styles.buttonClose]}
                      onPress={() => {
                        if (getUD('frogs')[7] != 0) {
                          updatePFP(7)
                          setPFPModalVisible(!pfpModalVisible);
                        } else {frogLockedAlert()}}}>
                      <Image source={frogDisplay(7)} resizeMode='contain' style={styles.pfpModal}/>
                  </Pressable>

                  <SeparatorHorizontal/>

                  {/* icon 8, row 3, col 3 */}
                  <Pressable
                      style={[styles.button, styles.buttonClose]}
                      onPress={() => {
                        if (getUD('frogs')[8] != 0) {
                          updatePFP(8)
                          setPFPModalVisible(!pfpModalVisible);
                        } else {frogLockedAlert()}}}>
                      <Image source={frogDisplay(7)} resizeMode='contain' style={styles.pfpModal}/>
                  </Pressable>
                </View>

                <SeparatorVertical/>

                <View style={{flexDirection: 'row'}}>
                  {/* icon 9, row 4, col 1 */}
                  <Pressable
                      style={[styles.button, styles.buttonClose]}
                      onPress={() => {
                      if (getUD('achievements').includes(5)) {
                        updatePFP(9)
                        setPFPModalVisible(!pfpModalVisible);
                      } else {frogLockedAlert()}}}>
                      <Image source={frogDisplay(9)} resizeMode='contain' style={styles.pfpModal}/>
                  </Pressable>

                  <SeparatorHorizontal/>

                  {/* icon 10, row 4, col 2 */}
                  <Pressable
                      style={[styles.button, styles.buttonClose]}
                      onPress={() => {
                        if (getUD('achievements').includes(10)) {
                          updatePFP(10)
                          setPFPModalVisible(!pfpModalVisible);
                        } else {frogLockedAlert()}}}>
                      <Image source={frogDisplay(10)} resizeMode='contain' style={styles.pfpModal}/>
                  </Pressable>

                  <SeparatorHorizontal/>

                  {/* icon 11, row 4, col 3 */}
                  <Pressable
                      style={[styles.button, styles.buttonClose]}
                      onPress={() => {
                        if (getUD('achievements').includes(15)) {
                          updatePFP(11)
                          setPFPModalVisible(!pfpModalVisible);
                        } else {frogLockedAlert()}}}>
                      <Image source={frogDisplay(11)} resizeMode='contain' style={styles.pfpModal}/>
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
            <Image source={require('./../assets/edit_image.png')} resizeMode='contain' style={{width: 50, height: 50}}/>
          </Pressable>
        </View>  

        <View style={{alignItems: 'center', alignSelf: 'center', justifyContent: 'center', position: 'absolute', top: dimensions()._height * 0.29}}>
          <View style={{flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap'}}>
              <SeparatorHorizontal/>
              {/* Username display */}
              <View>
                <Text style={{fontSize: 30, marginVertical: 10, color: 'white', fontWeight: '300'}}>
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
                      placeholderTextColor="#888"
                      />

                      <SeparatorVertical/>

                      <View style={{flexDirection: 'row'}}>
                        {/* Exit Modal Button */}
                        <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => {onChangeText(''); setUsernameModalVisible(!usernameModalVisible)}}>
                            <Text style={styles.textStyle}>Exit</Text>
                        </Pressable>

                        <SeparatorHorizontal/>

                        {/* Confirm Change Username Button */}
                        <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => {
                              if (text.length > 12) {
                                showAlert('Please enter name that is 12 characters or shorter','','OK')
                                onChangeText('')
                              }
                              else if (text == '') {
                                showAlert('Please enter a username','','OK')
                              }
                              else if (!/^[a-zA-Z0-9]+$/.test(text)) {
                                showAlert('Please enter alphanumeric characters without spaces.','','OK')
                                onChangeText('')
                              }
                              else {
                                updateUD('name', text);
                                setUsernameModalVisible(!usernameModalVisible)
                                onChangeText(''); 
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
                  <Image source={require('./../assets/edit_pencil.png')} resizeMode='contain' style={{width: 35, height: 35}}/>
                </Pressable>
              </View>
            </View>
          
          {/* Stats Container */}
          <View style={{flexDirection: 'row', alignItems: 'center', marginTop: -dimensions()._height * 0.02}}>
            <Image source={require('./../assets/clock.png')} resizeMode='contain' style={{width: 30, height: 30}}/>
            <SeparatorHorizontalSmall/>
            <Text style={{fontSize: 20, marginVertical: 10, color: 'white', fontWeight: '300'}}>
                  {Math.round(getUD('mins')/6)/10} hours
            </Text>
            <SeparatorHorizontal/>
            <Image source={require('./../assets/frogs/default_frog.png')} resizeMode='contain' style={{width: 30, height: 30}}/>
            <SeparatorHorizontalSmall/>
            <Text style={{fontSize: 20, marginVertical: 10, color: 'white', fontWeight: '300'}}>
                  {' ' + getUD('frogs').reduce((x: number, y: number) => x + y, 0)} frogs
            </Text>
          </View>

          {/* Achievements List */}
          <View style={[styles.scrollViewContainer, {height: dimensions()._height*0.5}]}>
          <FlatList
            data={achievementsList}
            renderItem={({ item }) => <AchievementItem achievement={item} />}
            keyExtractor={item => item.id}
            contentContainerStyle={{ flexGrow: 1}}/>
        </View>
      </View>
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
                onPress={() => navigation.replace('Leaderboard')}>
                <Image source={require('./../assets/trophy.png')} style={{height: '100%', width: '100%'}} resizeMode='contain'/>
            </TouchableOpacity>
            <TouchableOpacity style={{flex: 1, width: 40, height: 40, alignItems: 'center'}} 
                onPress={() => ''}>
                <Image source={require('./../assets/profile.png')} style={{height: '100%', width: '100%'}} resizeMode='contain'/>
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
    flex: 1,
    alignSelf: 'center',
  },
  text: {
    fontSize: 42,
  },
  achievementContainer: {
    width: dimensions()._width * 0.85,
    height: dimensions()._height * 0.08,
    backgroundColor: '#9AC99B',
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 10,
    paddingRight: 10,
    margin: 10,
    borderRadius: 8.5,
    flexDirection: 'row'
  },
  achievementLockedContainer: {
    width: dimensions()._width * 0.85,
    height: dimensions()._height * 0.08,
    backgroundColor: '#BEBBBB',
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 10,
    paddingRight: 10,
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
    backgroundColor: 'white',
    color: 'black',
  },
  pfpModal: {
    height: dimensions()._height * 0.05,
    width: dimensions()._height * 0.05
  },
  achievementName: {
    color : '#478E6D',
    fontSize: 19,
    fontWeight: 'bold',
  },
  achievementDescription: {
    color: 'black',
  },
  statusContainer: {
    position: 'absolute',
    right: 0,
    margin: 5,
    marginTop: 10,
  },
  tickImage: {
    position: 'absolute',
    right: 0,
    marginRight: 5,
    width: 30,
    height: 30,

  },
  progressContainer: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    marginBottom: 0,
    marginRight: 10,
  },
  progressText: {
    color: '#AB9D78',
    fontSize: 16,
    fontWeight: 'bold',
  },
  claimButton: {
    padding: 5,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 5,
  },
  claimButtonCompleted: {
    position: 'absolute',
    right: 60,
    top: 5,
    backgroundColor: 'green',
  },
  claimButtonIncomplete: {
    position: 'absolute',
    right: 60,
    top: 5,
    backgroundColor: 'grey',
  },
  claimButtonText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
  modalTitleText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white'
  },
  outcomeView: {
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
      height: dimensions()._height * 0.6
  },
  outerCircle: {
    width: dimensions()._height * 0.25,
    height: dimensions()._height * 0.25,
    borderRadius: dimensions()._borderRadius,
    backgroundColor: '#C8B88A',
    alignItems: 'center',
    justifyContent: 'center'
  },
  innerCicle: {
    width: dimensions()._height * 0.218,
    height: dimensions()._height * 0.218,
    borderRadius: dimensions()._borderRadius,
    backgroundColor: '#FFE7A1',
    alignItems: 'center',
    justifyContent: 'center'
  },
  tank: {
    width: dimensions()._height * 0.1,
    height: dimensions()._height * 0.1,
  },
});