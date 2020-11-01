const express = require("express")
const router = express.Router()

const checkAuth = require("../helpers/checkAuth")

const postPending = require("./postPending")
const getPending = require("./getPendings")
const getPendingAdmin = require("./getPendingAdmin")

router.post("/",checkAuth, postPending);
router.get("/",checkAuth, getPending);
router.get("/admin",checkAuth, getPendingAdmin);

const app = express()
const cors = require("cors")
app.use(cors({origin: true}))
app.use(router)
module.exports = app