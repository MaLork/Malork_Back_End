const functions = require('firebase-functions');
const firebase = require("firebase-admin");
firebase.initializeApp({
    storageBucket: "malork-kantoer.appspot.com",
})

const post = require("./post")
const posts = require("./posts")

exports.post = functions.region("asia-east2").https.onRequest(post)
exports.posts = functions.region("asia-east2").https.onRequest(posts)