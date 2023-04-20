const getDataUri = require("../utils/dataUri");
const cloudinary = require("cloudinary").v2;
const File = require("../models/files.model");

const uploadSingleFile = async (req, res) => {
  try {
    if (req.file == undefined) {
      return res.status(400).json({ message: "Please upload a file" });
    }
    const dataUri = getDataUri(req.file);
    const result = await cloudinary.uploader.upload(dataUri.content);
    const file = new File({
      name: req.file.originalname,
      public_id: result.public_id,
      src: result.secure_url,
      altText: req.body?.altText,
    });
    await file.save();
    res.status(200).json({
      message: "Uploaded the file successfully",
      file,
    });
  } catch (error) {
    res.status(500).json({
      message: `Could not upload the file: ${req.file.originalname}. ${error}`,
    });
  }
};

const uploadMultipleFiles = async (req, res) => {
  try {
    if (req.files == undefined) {
      return res.status(400).json({ message: "Please upload a file" });
    }
    const files = [];
    for (const file of req.files) {
      console.log(file);
      const dataUri = getDataUri(file);
      const result = await cloudinary.uploader.upload(dataUri.content);
      const fileInDB = new File({
        name: file.originalname,
        public_id: result.public_id,
        src: result.secure_url,
        altText: req.body?.altText + " - " + file.originalname,
      });
      await fileInDB.save();
      files.push(fileInDB);
    }
    res.status(200).json({
      message: "Uploaded the files successfully",
      files,
    });
  } catch (error) {
    res.status(500).json({
      message: `Could not upload the files. Error: ${error}`,
    });
  }
};
module.exports = {
  uploadSingleFile,
  uploadMultipleFiles,
};
