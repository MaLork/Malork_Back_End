const express = require("express")
const router = express.Router()

const checkAuth = require("../helpers/checkAuth")

const putPending = require("./putPending")
const getPendingbyId = require("./getPendingbyId");

router.put("/:id",checkAuth, putPending)
router.get("/:id",checkAuth, getPendingbyId);

const app = express()
const cors = require("cors")
app.use(cors({origin: true}))
app.use(router)
module.exports = app