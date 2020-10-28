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
            data.push({
                topic,
                user,
                status
            })
            
        });
        return res.send(data)
    } catch (err) {
        res.status(500).send("Error")
        console.log(err);
    }
}