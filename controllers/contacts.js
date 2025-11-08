const { getDatabase } = require("../data/database");
const { ObjectId } = require("mongodb");

//Get all contacts
const getAll = async (req, res) => {
  const db = getDatabase();
  const result = await db.collection("contacts").find();
  result.toArray().then((contacts) => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(contacts);
  });
};

//Get one single contact
const getSingle = async (req, res) => {
  const db = getDatabase();
  const contactId = new ObjectId(req.params.id);
  const result = await db.collection("contacts").findOne({ _id: contactId });
  if (result) {
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(result);
  }
};

// create a New Contact

const createContact = async (req, res) =>{
  const db = getDatabase ();
  const newContact = { 
    firstName: req.body.firstName,
    LastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday,
  };
  const result = await db.collection("contacts").insertOne(newContact);
  if (result.acknowledged) {
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(result)

  }
};

// Update a contact
const updateContact = async (req, res) =>{
  const db = getDatabase ();
  const contactId = new ObjectId(req.params.id);
  const updateContact = {
    firstName: req.body.firstName,
    LastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday,
  };
  const result = await db
  .collection("contacts")
  .updatedOne({ _id: contactId }, { $set: updateContact});
  if (result.modifiedCount > 0) {
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(result);
  }
};

// Delete a contact
const deleteContact = async (req, res) =>{
  const db = getDatabase ();
  const contactId = new ObjectId(req.params.id);

  const result = await db
  .collection("contacts")
  .deleteOne({ _id: contactId });
  if (result.deletedCount > 0) {
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(result);
  }
};

module.exports = {
  getAll,
  getSingle,
  createContact,
  updateContact,
  deleteContact,
};
