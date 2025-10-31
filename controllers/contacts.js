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

module.exports = {
  getAll,
  getSingle,
};
