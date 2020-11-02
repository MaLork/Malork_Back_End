const admin = require('firebase-admin');
const db = admin.firestore();

module.exports = async (req,res)=>{
    try{
        const uid = req.authId
        const ID = req.params.id;
        let commentID = req.body.commentId;
        const docRef = db.collection("post").doc((ID).toString());
        const doc = await docRef.get();
        const temp = doc.data();
        if (doc.exists) {
            if(temp.uid==uid){
                if(temp.nowCom> commentID) {
                    const upd = await docRef.set({pick: commentID},{merge: true});
                    return res.send("Success")
                }else{
                    console.log("No such comment!");
                    res.status(400).send("No such comment!");
                }
            }else{
                res.status(401).send({
                    error: "Unauthorized",
                })
            }
        } else {
            console.log("No such document!");
            res.status(404).send("No such document!");
            return 0;
        }
    } catch (err) {
        console.log(err)
        return res.status(500).send("error")
    }
}
