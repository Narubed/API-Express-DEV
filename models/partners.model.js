const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Joi = require("joi");

const PartnersSchema = new mongoose.Schema({
  partner_name: { type: String, required: true },
  partner_percent: { type: Number, required: true },
  partner_status: { type: Boolean, required: false, default: false },
  partner_webhook: { type: String, required: false, default: "" },
  partner_service_charge: { type: Number, required: false, default: 0 },
});

PartnersSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    { _id: this._id, name: this.partner_name, level: "partner" },
    process.env.JWTPRIVATEKEY
  );
  return token;
};

const Partners = mongoose.model("partners", PartnersSchema);

const validate = (data) => {
  const schema = Joi.object({
    partner_name: Joi.string(),
    partner_percent: Joi.number(),
    partner_status: Joi.boolean().default(false),
    partner_webhook: Joi.string().default(""),
    partner_service_charge: Joi.number().default(0),
  });
  return schema.validate(data);
};

module.exports = { Partners, validate };
