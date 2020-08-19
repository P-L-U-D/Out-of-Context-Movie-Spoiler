import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyDHGxU6CsX_wSKhz928RUSBS8zVsXlzSHA",
    authDomain: "out-of-context-movie-spoiler.firebaseapp.com",
    databaseURL: "https://out-of-context-movie-spoiler.firebaseio.com",
    projectId: "out-of-context-movie-spoiler",
    storageBucket: "out-of-context-movie-spoiler.appspot.com",
    messagingSenderId: "639841748908",
    appId: "1:639841748908:web:aa131c98baa8dc1d4a1c09"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export default firebase;