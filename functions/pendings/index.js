const express = require("express")
const router = express.Router()

const postPending = require("./postPending")

router.post("/", postPending)

const app = express()
const cors = require("cors")
app.use(cors({origin: true}))
app.use(router)
module.exports = app