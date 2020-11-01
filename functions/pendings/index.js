const express = require("express")
const router = express.Router()

const checkAuth = require("../helpers/checkAuth")

const postPending = require("./postPending")
const getPending = require("./getPendings")

router.post("/",checkAuth, postPending)
router.get("/",checkAuth, getPending)

const app = express()
const cors = require("cors")
app.use(cors({origin: true}))
app.use(router)
module.exports = app