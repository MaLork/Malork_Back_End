const express = require("express")
const router = express.Router()

const putPending = require("./putPending")

router.put("/:id", putPending)

const app = express()
const cors = require("cors")
app.use(cors({origin: true}))
app.use(router)
module.exports = app