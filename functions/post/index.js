const express = require("express")
const router = express.Router()

const getTest = require("./getTest")
const getByID = require("./getByID")

router.get("/test", getTest)
router.get("/:id", getByID)

const app = express()
const cors = require("cors")
app.use(cors({origin: true}))
app.use(router)
module.exports = app