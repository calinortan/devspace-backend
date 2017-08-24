import Firebase from 'firebase';

const config = {
  apiKey: 'AIzaSyBafYYp8eSpb5Yq5c1jbu0sAVMCexmsFeQ',
  authDomain: 'devspace-notifications.firebaseapp.com',
  databaseURL: 'https://devspace-notifications.firebaseio.com',
  projectId: 'devspace-notifications',
  storageBucket: 'devspace-notifications.appspot.com',
  messagingSenderId: '424089601215'
};
Firebase.initializeApp(config);

export default Firebase.database();