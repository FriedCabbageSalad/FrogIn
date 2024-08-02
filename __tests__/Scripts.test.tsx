import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { 
  getUD, 
  updateUD, 
  getFriends, 
  frogGacha, 
  parseFUID, 
  getAchievements, 
  getLB 
} from './Scripts';

// Mock Firebase and Google Sign-In
jest.mock('@react-native-firebase/auth', () => ({
  GoogleAuthProvider: {
    credential: jest.fn()
  },
  signInWithCredential: jest.fn(),
  signInWithEmailAndPassword: jest.fn(),
  createUserWithEmailAndPassword: jest.fn(),
}));

jest.mock('@react-native-firebase/firestore', () => ({
  collection: jest.fn().mockReturnThis(),
  doc: jest.fn().mockReturnThis(),
  get: jest.fn(),
  set: jest.fn(),
  update: jest.fn(),
}));

jest.mock('@react-native-google-signin/google-signin', () => ({
  GoogleSignin: {
    hasPlayServices: jest.fn(),
    signIn: jest.fn(),
  },
}));

describe('Authentication and User Data Tests', () => {
  test('Email/Password Sign Up', async () => {
    const email = 'test@example.com';
    const password = 'password123';
    
    await auth().createUserWithEmailAndPassword(email, password);
    console.log('Email/Password Sign Up test passed');
  });

  test('Email/Password Login', async () => {
    const email = 'test@example.com';
    const password = 'password123';
    
    await auth().signInWithEmailAndPassword(email, password);
    console.log('Email/Password Login test passed');
  });

  test('Google Sign In', async () => {
    await GoogleSignin.hasPlayServices();
    const { idToken } = await GoogleSignin.signIn();
    const credential = auth.GoogleAuthProvider.credential(idToken);
    await auth().signInWithCredential(credential);
    console.log('Google Sign In test passed');
  });

  test('Generate User Data', async () => {
    const mockUserData = {
      uid: 'testUID',
      email: 'test@example.com',
      name: 'Test User',
      fuid: 12345,
      pfp: 3,
      mins: 0,
      frogs: [0,0,0,0,0,0,0,0,0],
      achievements: [],
      friends: []
    };

    await firestore().collection('UserData').doc('testUID').set(mockUserData);
    console.log('Generate User Data test passed');
  });
});

describe('Script Function Tests', () => {
  test('getFriends', async () => {
    const mockFriends = ['friend1UID', 'friend2UID'];
    const mockFriendData = [
      { uid: 'friend1UID', name: 'Friend 1', fuid: 1111, pfp: 4, mins: 60, frogs: [1,0,0,0,0,0,0,0,0], achievements: [] },
      { uid: 'friend2UID', name: 'Friend 2', fuid: 2222, pfp: 5, mins: 120, frogs: [2,1,0,0,0,0,0,0,0], achievements: [] }
    ];

    firestore().collection('UserData').doc = jest.fn().mockReturnValue({
      get: jest.fn().mockResolvedValue({
        exists: true,
        get: (field) => mockFriendData.find(f => f.uid === 'friend1UID')[field]
      })
    });

    const result = await getFriends(mockFriends);
    console.log('getFriends test result:', result);
  });

  test('frogGacha', () => {
    const result30mins = frogGacha(1800);
    const result2hours = frogGacha(7200);
    console.log('frogGacha 30 mins result:', result30mins);
    console.log('frogGacha 2 hours result:', result2hours);
  });

  test('parseFUID', () => {
    const result = parseFUID(12345);
    console.log('parseFUID test result:', result);
  });

  test('getAchievements', () => {
    const mins = 180;
    const frogs = [2, 1, 1, 0, 0, 0, 0, 0, 0];
    const friends = [{ uid: 'friend1' }, { uid: 'friend2' }];
    const achievements = [1, 2];

    const result = getAchievements(mins, frogs, friends, achievements);
    console.log('getAchievements test result:', result);
  });

  test('getLB', async () => {
    const mockLeaderboardData = [
      { uid: 'user1', name: 'User 1', pfp: 3, mins: 300 },
      { uid: 'user2', name: 'User 2', pfp: 4, mins: 240 },
      { uid: 'user3', name: 'User 3', pfp: 5, mins: 180 },
    ];

    firestore().collection('UserData').where = jest.fn().mockReturnValue({
      get: jest.fn().mockResolvedValue({
        forEach: (callback) => mockLeaderboardData.forEach(callback),
      }),
    });

    const result = await getLB();
    console.log('getLB test result:', result);
  });
});