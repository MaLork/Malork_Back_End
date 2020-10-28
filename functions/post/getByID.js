const admin = require('firebase-admin');
const db = admin.firestore();

module.exports = async (req,res)=>{
    try{
        const ID = req.params.id;
        //console.log(ID)
        const doc = await db.collection("post").doc(ID).get()
            // console.log(doc.data());
            // res.json(doc.data());
        if (doc.exists) {
                //console.log("Document data:", doc.data());
            const temp = doc.data();
            const {content, topic, user} = temp;
            const time = temp.time.toDate();
            return res.json({
                data: {
                    topic,
                    user,
                    time,
                    content
                },
                id: doc.id,
            })
        } else {
            // doc.data() will be undefined in this case
            res.status(404).send("No such document!");
            throw console.log("No such document!");
        }
    } catch (err) {
        return res.status(500).send("error")
    }
}
