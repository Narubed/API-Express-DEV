const axios = require("axios");
require("dotenv").config();

exports.findPurchase = async (req, res) => {
  try {
    const apiKey = process.env.SHIPPOP_API_KEY;
    const json = await axios.post(
      `${process.env.SHIPPOP_WEB_BACKEND}/tracking_purchase/`,
      { ...req.body, api_key: apiKey }
    );
    res.status(200).send({ status: true, data: json.data });
  } catch (error) {
    res.status(500).send({ message: "มีบางอย่างผิดพลาด", status: false });
  }
};

exports.findTracking = async (req, res) => {
  try {
    const json = await axios.post(
      `${process.env.SHIPPOP_WEB_BACKEND}/tracking/`,
      { ...req.body }
    );
    res.status(200).send({ status: true, data: json.data });
  } catch (error) {
    res.status(500).send({ message: "มีบางอย่างผิดพลาด", status: false });
  }
};
