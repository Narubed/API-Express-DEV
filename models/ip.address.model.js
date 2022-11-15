const mongoose = require("mongoose");
const Joi = require("joi");

const IPAddressSchema = new mongoose.Schema({
  ip_address: { type: String, required: true },
  ip_note: { type: String, required: false, default: "" },
  ip_timestamp: { type: Date, required: false, default: Date.now() },
});

const IPAddress = mongoose.model("ipaddress", IPAddressSchema);

const validate = (data) => {
  const schema = Joi.object({
    ip_address: Joi.string().required(),
    ip_note: Joi.string().default(""),
    ip_timestamp: Joi.date().raw().default(Date.now()),
  });
  return schema.validate(data);
};

module.exports = { IPAddress, validate };
