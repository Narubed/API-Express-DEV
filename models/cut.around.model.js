const mongoose = require("mongoose");
const Joi = require("joi");

const CutAroundSchema = new mongoose.Schema({
  cut_id: { type: String, required: true },
  cut_parners_id: { type: String, required: true },
  cut_status: { type: String, required: false, default: "ตัดรอบการชำระแล้ว" },
  cut_total: { type: Number, required: false, default: 0 },
  cut_timestamp: { type: Array, required: false, default: [] },
});

const CutAround = mongoose.model("cut-around", CutAroundSchema);

const validate = (data) => {
  const schema = Joi.object({
    cut_id: Joi.string().required(),
    cut_parners_id: Joi.string().required(),
    cut_status: Joi.string().default("ตัดรอบการชำระแล้ว"),
    cut_total: Joi.number().default(0),
    cut_timestamp: Joi.array().default([]),
  });
  return schema.validate(data);
};

module.exports = { CutAround, validate };
