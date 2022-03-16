import * as firebase from 'firebase';
import '@firebase/auth';
import '@firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDcdYiAl0P6_LZNxoxTgD1fPTyE6EpEfsg",
    authDomain: "bonapp-7cc65.firebaseapp.com",
    databaseURL: "https://bonapp-7cc65-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "bonapp-7cc65",
    storageBucket: "bonapp-7cc65.appspot.com",
    messagingSenderId: "198916352344",
    appId: "1:198916352344:web:c08718687f9d0af4df9d2d",
    measurementId: "G-G6MJH49PMZ"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export { firebase };