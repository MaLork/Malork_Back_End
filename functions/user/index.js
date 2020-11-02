const express = require("express")
const router = express.Router()

const checkAuth = require("../helpers/checkAuth")

const signup = require("./signup")
const signin = require("./signin")

router.post("/signup",checkAuth, signup);
router.get("/signin",checkAuth, signin);

const app = express()
const cors = require("cors")
app.use(cors({origin: true}))
app.use(router)
module.exports = app