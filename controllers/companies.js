const { getDatabase } = require("../data/database");
const { ObjectId } = require("mongodb");

// Get all companies
const getAll = async (req, res) => {
  try {
    const db = getDatabase();
    const companies = await db.collection("companies").find().toArray();
    res.status(200).json(companies);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get single company
const getSingle = async (req, res) => {
  try {
    const db = getDatabase();
    const companyId = new ObjectId(req.params.id);
    const company = await db.collection("companies").findOne({ _id: companyId });
    if (!company) return res.status(404).json({ error: "Not found" });
    res.status(200).json(company);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create company
const createCompany = async (req, res) => {
  try {
    const db = getDatabase();
    const { name, industry, email, phone, address, city, state } = req.body;

    if (!name || !industry || !email)
      return res.status(400).json({ error: "Missing required fields" });

    const result = await db.collection("companies").insertOne({
      name, industry, email, phone, address, city, state,
    });

    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update company
const updateCompany = async (req, res) => {
  try {
    const db = getDatabase();
    const companyId = new ObjectId(req.params.id);
    const { name, industry, email, phone, address, city, state } = req.body;

    if (!name || !industry || !email)
      return res.status(400).json({ error: "Missing required fields" });

    const result = await db.collection("companies").updateOne(
      { _id: companyId },
      { $set: { name, industry, email, phone, address, city, state } }
    );

    if (result.matchedCount === 0) return res.status(404).json({ error: "Not found" });

    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete company
const deleteCompany = async (req, res) => {
  try {
    const db = getDatabase();
    const companyId = new ObjectId(req.params.id);
    const result = await db.collection("companies").deleteOne({ _id: companyId });
    if (result.deletedCount === 0) return res.status(404).json({ error: "Not found" });
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getAll,
  getSingle,
  createCompany,
  updateCompany,
  deleteCompany,
};