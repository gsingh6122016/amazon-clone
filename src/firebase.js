import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyB2lP4eyqC2y0vSQf6UaQMdH82J5zOug0I",
    authDomain: "clone-a6f75.firebaseapp.com",
    databaseURL: "https://clone-a6f75.firebaseio.com",
    projectId: "clone-a6f75",
    storageBucket: "clone-a6f75.appspot.com",
    messagingSenderId: "521642046882",
    appId: "1:521642046882:web:93f17641ae9f6094e4eefb",
    measurementId: "G-CKBD3WYGL5"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);

  const db = firebaseApp.firestore();
  const auth = firebase.auth();

  export {db, auth};