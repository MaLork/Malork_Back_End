const admin = require('firebase-admin');
const db = admin.firestore();

module.exports = async (req,res)=>{
    try {
        const username = req.body.user;
        const uid = req.authId;
        const data = {username, pending:[]}
        const update = await db.collection("users").doc(uid).set(data);
        res.status(200).send("Add new user")
    } catch (err) {
        res.status(500).send("Error")
        console.log(err);
    }
}