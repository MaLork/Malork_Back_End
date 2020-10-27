const admin = require('firebase-admin');
const db = admin.firestore();

module.exports = async (req,res)=>{
    try{
        const ID = req.params.id;
        //console.log(ID)
        const docRef = await db.collection("post").doc(ID).get()
        if (docRef.exists) {
            const pickedId = docRef.data().pick;
            const snapshot = await db.collection("post").doc(ID).collection("comment").get()
            let comments = [];
            let pickedComment = null;
            snapshot.forEach(doc => {
                let temp = doc.data();
                const {content, user} = temp;
                const time = temp.time.toDate();
                comments.push({content, user, time, commentId: doc.id})
                if (doc.id == pickedId) {
                    pickedComment = {content, user, time, commentId: doc.id}
                }
            })
            return res.send({pickedComment,comments})
        } else {
            // doc.data() will be undefined in this case
            return res.status(404).send("No Post");
        }
    } catch (err) {
        console.log(err)
        return res.status(500).send("error")
    }
}
