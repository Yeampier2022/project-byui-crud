const express = require("express");
const router = express.Router();

const { isAuthenticated } = require("../middleware/authenticate.js");

const employees = require("../controllers/employees.js");
const { saveEmployee } = require("../middleware/validate.js");

router.get("/", employees.getEmployees);
router.get("/:id", employees.getEmployeesId);
router.post("/", saveEmployee, employees.createEmployees);
router.put("/:id", saveEmployee, employees.updateEmployees);
router.delete("/:id", isAuthenticated, employees.deleteEmployees);

module.exports = router;
