const express = require("express")
const router = express.Router()

const postPending = require("./postPending")
const getPending = require("./getPendings")

router.post("/", postPending)
router.get("/", getPending)

const app = express()
const cors = require("cors")
app.use(cors({origin: true}))
app.use(router)
module.exports = app