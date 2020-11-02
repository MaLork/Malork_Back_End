const functions = require('firebase-functions');
const firebase = require("firebase-admin");
firebase.initializeApp({
    storageBucket: "malork-kantoer.appspot.com",
})

const post = require("./post");
const posts = require("./posts");
const pending = require("./pending");
const pendings = require("./pendings");
const comment = require("./comment");
const user = require("./user");

exports.post = functions.region("asia-east2").https.onRequest(post);
exports.posts = functions.region("asia-east2").https.onRequest(posts);
exports.pending = functions.region("asia-east2").https.onRequest(pending);
exports.pendings = functions.region("asia-east2").https.onRequest(pendings);
exports.comment = functions.region("asia-east2").https.onRequest(comment);
exports.user = functions.region("asia-east2").https.onRequest(user);