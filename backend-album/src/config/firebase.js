const firebase = require('firebase/app');
const { getStorage } = require("firebase/storage")
const { getAuth } = require('firebase/auth')

const firebaseConfig = {
  apiKey: process.env.FB_APIKEY,
  authDomain: process.env.FB_DOMAIN,
  projectId: process.env.FB_PROJECTID,
  storageBucket: process.env.FB_STORAGEBUCKET,
  messagingSenderId: process.env.FB_SENDERID,
  appId: process.env.FB_APPID
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const storage = getStorage(firebaseApp);
const auth = getAuth(firebaseApp)

module.exports = { firebaseApp, storage, auth}