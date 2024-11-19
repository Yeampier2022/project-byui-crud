const express = require("express");
const router = express.Router();

const employees = require("../controllers/employees.js");

router.get("/", employees.getEmployees);
router.get("/:id", employees.getEmployeesId);
router.post("/", employees.createEmployees);
router.put("/:id", employees.updateEmployees);
router.delete("/:id", employees.deleteEmployees);

module.exports = router;