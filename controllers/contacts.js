const { getDatabase } = require("../data/database");
const { ObjectId } = require("mongodb");

// Get all contacts
const getAll = async (req, res) => {
  try {
    const db = getDatabase();
    const contacts = await db.collection("contacts").find().toArray();
    res.status(200).json(contacts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get single contact
const getSingle = async (req, res) => {
  try {
    const db = getDatabase();
    const contactId = new ObjectId(req.params.id);
    const contact = await db.collection("contacts").findOne({ _id: contactId });
    if (!contact) return res.status(404).json({ error: "Not found" });
    res.status(200).json(contact);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create new contact
const createContact = async (req, res) => {
  try {
    const db = getDatabase();
    const { firstName, lastName, email, favoriteColor, birthday } = req.body;

    if (!firstName || !lastName || !email)
      return res.status(400).json({ error: "Missing required fields" });

    const result = await db.collection("contacts").insertOne({
      firstName,
      lastName,
      email,
      favoriteColor,
      birthday,
    });

    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update contact
const updateContact = async (req, res) => {
  try {
    const db = getDatabase();
    const contactId = new ObjectId(req.params.id);
    const { firstName, lastName, email, favoriteColor, birthday } = req.body;

    if (!firstName || !lastName || !email)
      return res.status(400).json({ error: "Missing required fields" });

    const result = await db
      .collection("contacts")
      .updateOne({ _id: contactId }, { $set: { firstName, lastName, email, favoriteColor, birthday } });

    if (result.matchedCount === 0) return res.status(404).json({ error: "Not found" });

    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete contact
const deleteContact = async (req, res) => {
  try {
    const db = getDatabase();
    const contactId = new ObjectId(req.params.id);
    const result = await db.collection("contacts").deleteOne({ _id: contactId });
    if (result.deletedCount === 0) return res.status(404).json({ error: "Not found" });
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getAll,
  getSingle,
  createContact,
  updateContact,
  deleteContact,
};