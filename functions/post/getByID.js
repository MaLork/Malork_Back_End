const admin = require('firebase-admin');
const db = admin.firestore();
const router = express.Router();

router.get("/post/:id",(req,res)=>{
    try{
        const ID = req.params.id;
        //console.log(ID)
        db.collection("samples").doc(ID).get().then((doc)=>{
            // console.log(doc.data());
            // res.json(doc.data());
            if (doc.exists) {
                //console.log("Document data:", doc.data());
                return res.json(doc.data())
            } else {
                // doc.data() will be undefined in this case
                throw console.log("No such document!");
            }
        }).catch(function(error) {
            throw console.log("Error getting document:", error);
        });
    } catch (err) {
        return res.status(500).send("error")
    }
})

module.exports = router;