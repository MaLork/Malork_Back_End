const admin = require('firebase-admin');
const db = admin.firestore();

module.exports = async (req,res) => {
    try {
        let temp = req.body;
        const ID = req.params.id;
        const uid = req.authId;
        const docRef = db.collection("post").doc(ID);
        const doc = await docRef.get();
        if(doc.exists) {
            const userDoc = await db.collection("users").doc(uid).get();
            const user = userDoc.data().username;
            const content = temp.content;
            let data = {user, content};
            const commentId = doc.data().nowCom;
            data.time= admin.firestore.Timestamp.now()
            const update = await db.collection("post").doc(ID).collection("comment").doc((commentId).toString()).set(data)
            const upId = await docRef.set({nowCom: commentId+1},{merge: true});
            res.status(200).send("Add new comment")
        }else{
            res.result(404).send("Post Not Found")
        }
        
    } catch (err) {
        res.status(500).send("Error")
        console.log(err);
    }
}