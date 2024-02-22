import { initializeApp } from 'firebase/app';

const initializeFirebaseApp = () => {
  initializeApp({
    apiKey: "AIzaSyBhdCJ2U0u9ZBWmCqPX1nuENNdiMaBbwbg",
    authDomain: "react-native-contact-c572e.firebaseapp.com",
    databaseURL: "https://react-native-contact-c572e-default-rtdb.firebaseio.com",
    projectId: "react-native-contact-c572e",
    storageBucket: "react-native-contact-c572e.appspot.com",
    messagingSenderId: "402627763000",
    appId: "1:402627763000:web:39ae9796a6e7ae519bbfcd"
  });
};

export default initializeFirebaseApp;
