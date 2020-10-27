const express = require("express")
const router = express.Router()

const getCommentById = require("./getCommentById")

router.get("/:id", getCommentById)

const app = express()
const cors = require("cors")
app.use(cors({origin: true}))
app.use(router)
module.exports = app