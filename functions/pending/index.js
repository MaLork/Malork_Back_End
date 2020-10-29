
const express = require("express")
const router = express.Router()

const putPending = require("./putPending")
const getPendingbyId = require("./getPendingbyId");

router.put("/:id", putPending)
router.get("/:id",getPendingbyId);

const app = express()
const cors = require("cors")
app.use(cors({origin: true}))
app.use(router)
module.exports = app