const admin = require('firebase-admin');
const db = admin.firestore();

module.exports = async (req,res) => {
    try {
        const snapshot = await db.collection('post').get();
        data = []
        snapshot.forEach((doc) => {
            console.log(doc.id, '=>', doc.data());
            let temp = doc.data();
            const {topic, user} = temp;
            const time = temp.time.toDate();
            const havePickedAnswer = temp.pick!==0;
            data.push({
                data: {
                    topic,
                    user,
                    time,
                    havePickedAnswer
                },
                id: doc.id,
            })
          })
        return res.send(data)
    } catch (err) {
        console.log(err)
        return res.status(500).send("error")
    }
}

