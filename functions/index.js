const functions = require('firebase-functions');


const post = require("./post")

exports.post = functions.region("asia-east2").https.onRequest(post)