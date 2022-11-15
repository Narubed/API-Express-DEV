const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Joi = require("joi");

const CourierSchema = new mongoose.Schema({
  partner_id: { type: String, required: false, default: "" },
  purchase_id: { type: Number, required: false, default: 0 },
  price: { type: Number, required: false, default: 0 },
  discount: { type: Number, required: false, default: 0 },
  weight: { type: Number, required: false, default: 0 },
  from: {
    address: { type: String, required: false, default: "" },
    district: { type: String, required: false, default: "" },
    city: { type: String, required: false, default: "" },
    province: { type: String, required: false, default: "" },
    postcode: { type: String, required: false, default: "" },
    country: { type: String, required: false, default: "" },
    name: { type: String, required: false, default: "" },
    email: { type: String, required: false, default: "" },
    tel: { type: String, required: false, default: "" },
  },
  to: {
    address: { type: String, required: false, default: "" },
    district: { type: String, required: false, default: "" },
    city: { type: String, required: false, default: "" },
    province: { type: String, required: false, default: "" },
    postcode: { type: String, required: false, default: "" },
    country: { type: String, required: false, default: "" },
    name: { type: String, required: false, default: "" },
    email: { type: String, required: false, default: "" },
    tel: { type: String, required: false, default: "" },
  },
  courier_code: { type: String, required: false, default: "" },
  tracking_code: { type: String, required: false, default: "" },
  courier_status: { type: String, required: false, default: "wait" },
  datetime_shipping: { type: String, required: false, default: "" },
  datetime_order: { type: String, required: false, default: "" },
  parcel: {
    name: { type: String, required: false, default: "" },
    weight: { type: String, required: false, default: "" },
    width: { type: String, required: false, default: "" },
    length: { type: String, required: false, default: "" },
    height: { type: String, required: false, default: "" },
  },
  courier_tracking_code: { type: String, required: false, default: "" },
  courier_cutarourd: { type: String, required: false, default: "" },
});

CourierSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    { _id: this._id, name: this.partner_name, level: "partner" },
    process.env.JWTPRIVATEKEY
  );
  return token;
};

const Courier = mongoose.model("courier", CourierSchema);

const validate = (data) => {
  const schema = Joi.object({
    partner_id: Joi.string().default(""),
    purchase_id: Joi.number().default(0),
    price: Joi.number().default(0),
    discount: Joi.number().default(0),
    weight: Joi.number().default(0),
    from: Joi.object({
      address: Joi.string().default(""),
      district: Joi.string().default(""),
      city: Joi.string().default(""),
      province: Joi.string().default(""),
      postcode: Joi.string().default(""),
      country: Joi.string().default(""),
      name: Joi.string().default(""),
      email: Joi.string().default(""),
      phone: Joi.string().default(""),
    }),
    to: Joi.object({
      address: Joi.string().default(""),
      district: Joi.string().default(""),
      city: Joi.string().default(""),
      province: Joi.string().default(""),
      postcode: Joi.string().default(""),
      country: Joi.string().default(""),
      name: Joi.string().default(""),
      email: Joi.string().default(""),
      phone: Joi.string().default(""),
    }),
    courier_code: Joi.string().default(""),
    tracking_code: Joi.string().default(""),
    courier_status: Joi.string().default("wait"),
    datetime_shipping: Joi.string().default(""),
    datetime_order: Joi.string().default(""),
    parcel: Joi.object({
      weight: Joi.number().default(0),
      width: Joi.number().default(0),
      length: Joi.number().default(0),
      height: Joi.number().default(0),
    }),
    courier_tracking_code: Joi.string().default(""),
    courier_cutarourd: Joi.string().default(""),
  });
  return schema.validate(data);
};

module.exports = { Courier, validate };
