const express = require("express");
const router = express.Router();

const employees = require("../controllers/employees.js");
const { saveEmployee } = require("../middleware/validate.js");

router.get("/", employees.getEmployees);
router.get("/:id", employees.getEmployeesId);
router.post("/", saveEmployee, employees.createEmployees);
router.put("/:id", saveEmployee, employees.updateEmployees);
router.delete("/:id", employees.deleteEmployees);

module.exports = router;
