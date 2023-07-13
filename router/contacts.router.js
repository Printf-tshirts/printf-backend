const router = require("express").Router();
const controller = require("./../controller/contacts.controller");

router.post("/add-contact", controller.addContact);
router.get("/get-all-contacts", controller.getContacts);

module.exports = router;
