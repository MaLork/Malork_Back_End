const admin = require('firebase-admin');
const db = admin.firestore();

module.exports = async (req,res)=>{
    try{
        const ID = req.params.id;
        //console.log(ID)
        const docRef = await db.collection("pending").doc(ID).get()
        const uid = req.authId;
        const userDoc = await db.collection("users").doc(uid).get();
        if (docRef.exists) {
            if(userDoc.data().admin || userDoc.data().uid === uid){
                const temp = docRef.data();
                const {user,time,topic,content} = temp;
                const timeConv = time.toDate();
                return res.json({
                    user,
                    timeConv,
                    topic,
                    content
                });
            }else{
                res.status(401).send({
                    error: "Unauthorized",
                })
            }
        } else {
            // doc.data() will be undefined in this case
            return res.status(404).send("No Post");
        }
    } catch (err) {
        console.log(err)
        return res.status(500).send("error")
    }
}
