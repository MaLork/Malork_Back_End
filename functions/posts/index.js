const express = require("express")
const router = express.Router()

const getTest = require("./getAllPosts")

router.get("/posts", getTest)

const app = express()
const cors = require("cors")
app.use(cors({origin: true}))
app.use(router)
module.exports = app