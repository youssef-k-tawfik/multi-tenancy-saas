import { createTenant, getAllTenants } from "../controllers/tenantsController";

const express = require("express");
const router = express.Router();

router.get("/", getAllTenants);

router.post("/", createTenant);

module.exports = router;
