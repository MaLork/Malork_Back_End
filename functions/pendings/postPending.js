const admin = require('firebase-admin');
const db = admin.firestore();

module.exports = async (req,res) => {
    try {
        let data = req.body;
        const docRef = db.collection("stats").doc("now");
        const doc = await docRef.get();
        const penId = doc.data().pending;
        data = {...data, status: "pending",time: admin.firestore.Timestamp.now()};
        const update = await db.collection("pending").doc((penId).toString()).set({data})
        const upId = await docRef.set({pending: penId+1},{merge: true});
        res.status(200).send("Add pending post")
    } catch (err) {
        res.status(500).send("Error")
        console.log(err);
    }
}