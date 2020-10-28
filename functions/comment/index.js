const express = require("express")
const router = express.Router()

const getCommentById = require("./getCommentById")
const putComment = require("./putComment");

router.get("/:id", getCommentById)
router.put("/pick/:id", putComment);

const app = express()
const cors = require("cors")
app.use(cors({origin: true}))
app.use(router)
module.exports = app