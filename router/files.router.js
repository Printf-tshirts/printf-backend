const router = require("express").Router();
const authenticateToken = require("../middleware/authenticate");
const { singleUpload, multipleUpload } = require("../middleware/fileUpload");
const controller = require("./../controller/files.controller");

router.post(
  "/upload-single",
  authenticateToken,
  singleUpload,
  controller.uploadSingleFile,
);
router.post(
  "/upload-multiple",
  authenticateToken,
  multipleUpload,
  controller.uploadMultipleFiles,
);

module.exports = router;
