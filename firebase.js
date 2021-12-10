const firebase = require('firebase/app')
require('firebase/firestore')
const { apiKey, authDomain, projectId, storageBucket, messageSenderID, appID } = require('./config') 

const firebaseConfig = {
    apiKey: apiKey,
    authDomain: authDomain,
    projectId: projectId,
    storageBucket: storageBucket,
    messagingSenderId: messageSenderID,
    appId: appID
};

firebase.initializeApp(firebaseConfig)
let db = firebase.firestore()
module.exports = db;