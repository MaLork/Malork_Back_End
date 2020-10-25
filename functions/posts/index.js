const express = require("express")
const router = express.Router()

const getAllPosts = require("./getAllPosts")

router.get("/", getAllPosts)

const app = express()
const cors = require("cors")
app.use(cors({origin: true}))
app.use(router)
module.exports = app