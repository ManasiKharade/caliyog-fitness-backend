const express = require("express");
const {
  addContact,
  getContacts,
  markContactReplied,
  deleteContact,
} = require("../controllers/contactController");

const router = express.Router();

router.post("/", addContact);
router.get("/", getContacts);
router.put("/:id/reply", markContactReplied);
router.delete("/:id", deleteContact);

module.exports = router;