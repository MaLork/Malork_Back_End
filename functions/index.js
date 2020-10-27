const functions = require('firebase-functions');
const firebase = require("firebase-admin");
firebase.initializeApp({
    storageBucket: "malork-kantoer.appspot.com",
})

const post = require("./post")
const posts = require("./posts")
const pendings = require("./pendings")

exports.post = functions.region("asia-east2").https.onRequest(post)
exports.posts = functions.region("asia-east2").https.onRequest(posts)
exports.pendings = functions.region("asia-east2").https.onRequest(pendings)