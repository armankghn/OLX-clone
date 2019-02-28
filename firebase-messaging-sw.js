importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-messaging.js');

 // Initialize Firebase
 var config = {
    apiKey: "AIzaSyCZcY4AfR_26chx8i87IsjIe0Jnz9NbqhU",
    authDomain: "olxtask.firebaseapp.com",
    databaseURL: "https://olxtask.firebaseio.com",
    projectId: "olxtask",
    storageBucket: "olxtask.appspot.com",
    messagingSenderId: "762677721199"
  };
  firebase.initializeApp(config);

const messaging = firebase.messaging();



