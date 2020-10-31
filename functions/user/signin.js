const admin = require('firebase-admin');
const db = admin.firestore();

module.exports = async (req,res)=>{
    try {
        const uid = req.authId;
        const userDoc = await db.collection("users").doc(uid).get();
        const temp = userDoc.data()
        const user = temp.username;
        let data = {user}
        if(temp.admin){
            data.admin = temp.admin;
        }
        res.status(200).send(data)
    } catch (err) {
        res.status(500).send("Error")
        console.log(err);
    }
}