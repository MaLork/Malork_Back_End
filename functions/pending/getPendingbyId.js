const admin = require('firebase-admin');
const db = admin.firestore();

module.exports = async (req,res)=>{
    try{
        const ID = req.params.id;
        //console.log(ID)
        const docRef = await db.collection("pending").doc(ID).get()
        if (docRef.exists) {
            const temp = docRef.data();
            const {user,time,topic,content} = temp;
            const timeConv = time.toDate();
            return res.json({
                user,
                timeConv,
                topic,
                content
            });
            
        } else {
            // doc.data() will be undefined in this case
            return res.status(404).send("No Post");
        }
    } catch (err) {
        console.log(err)
        return res.status(500).send("error")
    }
}
