const mongoose = require("mongoose");
const Joi = require("joi");

const CodExpressSchema = new mongoose.Schema({
  cod_email: { type: String, required: true },
  cod_name: { type: String, required: true },
  cod_bookbank: { type: String, required: true },
  cod_bookbank_number: { type: String, required: true },
  cod_status: { type: Boolean, required: false, default: false },
});

const CodExpress = mongoose.model("cod-express", CodExpressSchema);

const validate = (data) => {
  const schema = Joi.object({
    cod_email: Joi.string(),
    cod_name: Joi.string(),
    cod_bookbank: Joi.string(),
    cod_bookbank_number: Joi.string(),
    cod_status: Joi.boolean().default(false),
  });
  return schema.validate(data);
};

module.exports = { CodExpress, validate };
