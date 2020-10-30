const admin = require('firebase-admin');
const db = admin.firestore();

module.exports = async (req,res) => {
    try {
        data = [];
        //let data = req.body;
        const docRef = db.collection("pending");
        const snapshot = await docRef.get();
        snapshot.forEach(doc => {
            const temp = doc.data();
            const {topic,user,status} = temp;
            const time = temp.time.toDate();
            const content = temp.content.slice(0,50);
            tempdata = {
                topic,
                user,
                status,
                time,
                content,
                id: doc.id
            };
            if(temp.postId) {
                tempdata.postId = temp.postId;
            }
            data.push(tempdata)
        });
        return res.send(data)
    } catch (err) {
        res.status(500).send("Error")
        console.log(err);
    }
}