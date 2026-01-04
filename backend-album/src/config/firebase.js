const { getAuth } = require('firebase/auth')
const { initializeApp } = require('firebase/app')

const firebaseConfig = {
  apiKey: process.env.FB_APIKEY,
  authDomain: process.env.FB_DOMAIN,
  projectId: process.env.FB_PROJECTID,
  messagingSenderId: process.env.FB_SENDERID,
  appId: process.env.FB_APPID
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app)

module.exports = { auth }