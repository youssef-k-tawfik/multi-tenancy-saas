import { createUser, getUsersByTenantID } from "../controllers/usersController";

const express = require("express");
const router = express.Router();

router.get("/", getUsersByTenantID);

router.post("/", createUser);

module.exports = router;
