import * as React from 'react';
import { 
    Button,
    View,
    Text,
    StyleSheet,
    Dimensions,
    ImageBackground,
    ScrollView,
    SafeAreaView,
    StatusBar,
    TouchableOpacity,
    Image,
    TextInput
} from 'react-native';

const { height, width } = Dimensions.get('window')

function dimensions() {
    var _borderRadius = Math.round((height + width) / 2),
        _height = Math.round(height),
        _width = Math.round(width)
    return { _borderRadius, _height, _width }
}

const pfpDirectories = [
    {image: require('./../assets/frogs/default_frog.png')},
    {image: require('./../assets/frogs/blue_frog.png')}
  ]

const pfpDirectory = pfpDirectories[1].image;

function FriendsListScreen({navigation}: {navigation: any}) {
    const [text, onChangeText] = React.useState('');
  return (
    // Background Image
    <View style={styles.background}>
        <View style={{ alignItems: 'center'}}>
            {/* Title and Friend Count */}
            <View style={{flexDirection: 'row', margin: dimensions()._height * 0.03,}}>
                <TextInput
                    style={styles.input}
                    onChangeText={onChangeText}
                    value={text}
                    placeholder="Add Friend User ID"
                />

                <TouchableOpacity onPress={() => ''}>
                    <Image source={require('./../assets/right_arrow.png')} style={styles.confirmButton} resizeMode='cover'/>
                </TouchableOpacity>
            </View>
            <Text style={styles.title}>Friend's List</Text>
            <Text style={styles.friendTotal}>5 friends</Text>
        </View>

        {/* Friend List */}
        <SafeAreaView style={styles.scrollViewContainer}>
            <ScrollView>

                {/* Friend Object */}
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
                </View>

            </ScrollView>
        </SafeAreaView>

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