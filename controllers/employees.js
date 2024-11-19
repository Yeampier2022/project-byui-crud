const mongodb = require("../database/database");
const ObjectId = require("mongodb").ObjectId;

const getEmployees = async (req, res) => {
  // swagger.tags = ["Employess"];
  const result = await mongodb
    .getDb()
    .client.db()
    .collection("employees")
    .find();
  result.toArray().then((employess) => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(employess);
  });
};

const getEmployeesId = async (req, res) => {
  // swagger.tags = ["Employess"];
  const id = new ObjectId(req.params.id);
  const result = await mongodb
    .getDb()
    .client.db()
    .collection("employees")
    .find({ _id: id });
  result.toArray().then((employees) => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(employees[0]);
  });
};

const createEmployees = async (req, res) => {
  // swagger.tags = ["Employess"];
  const employees = {
    name: req.body.name,
    lastname: req.body.lastname,
    age: req.body.age,
    email: req.body.email,
    deparment: req.body.deparment,
  };
  const result = await mongodb
    .getDb()
    .client.db()
    .collection("employees")
    .insertOne(employees);

  if (result.acknowledged) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(result.error || "An error occurred while creating the user.");
  }
};

const updateEmployees = async (req, res) => {
  // swagger.tags = ["Employess"];
  const id = new ObjectId(req.params.id);
  const employees = {
    name: req.body.name,
    lastname: req.body.lastname,
    age: req.body.age,
    email: req.body.email,
    deparment: req.body.deparment,
  };
  const result = await mongodb
    .getDb()
    .client.db()
    .collection("employees")
    .updateOne({ _id: id }, { $set: employees });

  if (result.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(result.error || "An error occurred while updating the user.");
  }
};

const deleteEmployees = async (req, res) => {
  // swagger.tags = ["Employess"];
  const id = new ObjectId(req.params.id);
  const result = await mongodb
    .getDb()
    .client.db()
    .collection("employees")
    .deleteOne({ _id: id });

  if (result.deletedCount > 0) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(result.error || "An error occurred while deleting the user.");
  }
};

module.exports = {
  getEmployees,
  getEmployeesId,
  createEmployees,
  updateEmployees,
  deleteEmployees,
};
