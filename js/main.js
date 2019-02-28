
 
 /* ========================
  Variables
======================== */
const FIREBASE_AUTH = firebase.auth();
const FIREBASE_MESSAGING = firebase.messaging();
const FIREBASE_DATABASE = firebase.database();

const subscribeButton = document.getElementById('subscribe');
const unsubscribeButton = document.getElementById('unsubscribe');

/* ========================
  Event Listeners
======================== */

FIREBASE_AUTH.onAuthStateChanged(handleAuthStateChanged);

/* ========================
  Functions
======================== */

function handleAuthStateChanged(user) {
  if (user) {
    // User is signed in
    checkSubscription();
   console.log('hello', user)
  } else {
    // User is not signed in
    console.log("user is not signed in");
    
  }
}
function subscribeToNotifications() {
  FIREBASE_MESSAGING.requestPermission()
    .then(() => handleTokenRefresh())
    .then(() => checkSubscription())
    .catch((err) => {
      console.log("error getting permission :(");
    });
}
function handleTokenRefresh() {
  return FIREBASE_MESSAGING.getToken().then((token) => {
    FIREBASE_DATABASE.ref('/tokens').push({
      token: token,
      uid: FIREBASE_AUTH.currentUser.uid
    });
  });
}

function unsubscribeFromNotifications() {
  FIREBASE_MESSAGING.getToken()
    .then((token) => FIREBASE_MESSAGING.deleteToken(token))
    .then(() => FIREBASE_DATABASE.ref('/tokens').orderByChild("uid").equalTo(FIREBASE_AUTH.currentUser.uid).once('value'))
    .then((snapshot) => {
      const key = Object.keys(snapshot.val())[0];
      return FIREBASE_DATABASE.ref('/tokens').child(key).remove();
    })
    .then(() => checkSubscription())
    .catch((err) => {
      console.log("error deleting token :(");
    });
}

function checkSubscription() {
  FIREBASE_DATABASE.ref('/tokens').orderByChild("uid").equalTo(FIREBASE_AUTH.currentUser.uid).once('value').then((snapshot) => {
    if ( snapshot.val() ) {
       subscribeButton.setAttribute("hidden", "true");
       unsubscribeButton.removeAttribute("hidden");
    } else {
       unsubscribeButton.setAttribute("hidden", "true");
       subscribeButton.removeAttribute("hidden");
    }
  });
}