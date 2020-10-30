const admin = require('firebase-admin');
const db = admin.firestore();

module.exports = async (req,res) => {
    try {
        const stat = await db.collection("stats").doc("now").get(); 
        const postTol = stat.data().post;
        const page = req.body.page;
        let snapshot;
        if (page > 1 && page !== null){
            if (postTol - (page-1)*10<1){
                return res.status(400).send("Out of index");
            }
            const lastSeen = await db.collection('post').doc((postTol - (page-1)*10).toString()).get();
            snapshot = await db.collection('post').orderBy("approvedTime","desc").startAfter(lastSeen).limit(10).get();
        }else{
            snapshot = await db.collection('post').orderBy("approvedTime","desc").limit(10).get();
        }
        data = []
        snapshot.forEach((doc) => {
            let temp = doc.data();
            const {user} = temp;
            const time = temp.time.toDate();
            const approvedTime = temp.approvedTime.toDate();
            const havePickedAnswer = temp.pick!==0;
            const content = temp.content.slice(0,150);
            const topic = temp.topic.slice(0,95);
            data.push({
                topic,
                user,
                time,
                havePickedAnswer,
                content,
                approvedTime,
                id: doc.id,
            })
          })
        return res.send(data)
    } catch (err) {
        console.log(err)
        return res.status(500).send("error")
    }
}