const Contact = require("../models/contacts.model");

const getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.status(200).json({ contacts });
  } catch (error) {
    res.status(500).json({ error });
  }
};

const addContact = async (req, res) => {
  try {
    const contact = await Contact.create(req.body);
    res.status(200).json({
      message: "Query received! we'll get back to you very soon",
      contact,
    });
  } catch (error) {
    res.status(500).json({ error });
  }
};

module.exports = {
  getContacts,
  addContact,
};
