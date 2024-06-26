const fs = require("fs").promises;

const deleteImage = async (userImagePath) => {
  try {
    await fs.access(userImagePath);
    await fs.unlink(userImagePath);
    console.log("Image deleted successfully");
  } catch (err) {
    console.error("Image does not exist");
  }
};

module.exports = { deleteImage };
