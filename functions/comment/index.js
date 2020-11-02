const express = require("express")
const router = express.Router()
const checkAuth = require("../helpers/checkAuth")

const getCommentById = require("./getCommentById")
const putComment = require("./putComment");
const postComment = require("./postComment");

router.get("/:id", getCommentById)
router.put("/pick/:id",checkAuth, putComment);
router.post("/:id", checkAuth, postComment);

const app = express()
const cors = require("cors")
app.use(cors({origin: true}))
app.use(router)
module.exports = app