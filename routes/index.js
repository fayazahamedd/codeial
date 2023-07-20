const express = require("express");

const router = express.Router();
const homeController = require("../controllers/home_contoller");

console.log('Loaded routes')

router.get("/", homeController.play)

module.exports = router;