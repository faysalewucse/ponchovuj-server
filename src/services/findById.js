const createHttpError = require("http-errors");
const mongoose = require("mongoose");

const findById = async (Model, id, options = {}) => {
  try {
    const id = req.query.id;

    const result = await Model.find(id, options);

    if (!result) {
      throw createHttpError(404, `No ${Model.modelName} found!`);
    }

    return result;
  } catch (error) {
    if (error instanceof mongoose.Error) {
      throw createHttpError(400, `Invalid ${Model.modelName} id!`);
    }
    throw error;
  }
};

module.exports = {
  findById,
};
