const express = require("express")
const router = express.Router()

const getCommentById = require("./getCommentById")
const putComment = require("./putComment");
const postComment = require("./postComment");

router.get("/:id", getCommentById)
router.put("/pick/:id", putComment);
router.post("/:id", postComment);

const app = express()
const cors = require("cors")
app.use(cors({origin: true}))
app.use(router)
module.exports = app