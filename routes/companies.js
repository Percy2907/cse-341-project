const express = require("express");
const router = express.Router();
const companiesController = require("../controllers/companies");

router.get("/", companiesController.getAll);
router.get("/:id", companiesController.getSingle);
router.post("/", companiesController.createCompany);
router.put("/:id", companiesController.updateCompany);
router.delete("/:id", companiesController.deleteCompany);

module.exports = router;