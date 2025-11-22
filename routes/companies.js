const express = require("express");
const router = express.Router();
const companiesController = require("../controllers/companies");
const {isAuthenticated} = require("../middleware/authenticate")

router.get("/", companiesController.getAll);
router.get("/:id", companiesController.getSingle);
router.post("/", isAuthenticated, companiesController.createCompany);
router.put("/:id", isAuthenticated, companiesController.updateCompany);
router.delete("/:id", isAuthenticated, companiesController.deleteCompany);

module.exports = router;
