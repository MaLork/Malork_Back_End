const admin = require('firebase-admin');
const db = admin.firestore();

module.exports = (req,res)=>{
    try{
        const ID = req.params.id;
        //console.log(ID)
        db.collection("post").doc(ID).get().then((doc)=>{
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
        }).catch(function(error) {
            throw console.log("Error getting document:", error);
        });
    } catch (err) {
        return res.status(500).send("error")
    }
}
