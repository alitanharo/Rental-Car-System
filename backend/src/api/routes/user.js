const express = require("express");
const authController = require("../../controllers/authController");

const router = express.Router();

router.post("/signup", authController.register);
router.post("/signin", authController.login);
router.post("/logout", authController.logout);
router.get("/:id", authController.getUser);
router.post("/token", authController.decodeToken);

module.exports = router;
