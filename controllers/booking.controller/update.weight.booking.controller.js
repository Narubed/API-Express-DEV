const axios = require("axios");
require("dotenv").config();
const { Courier } = require("../../models/courier.model");

exports.update = async (req, res) => {
  try {
    console.log(req.body);
    const dataUpdate = { ...req.body, api_key: process.env.SHIPPOP_API_KEY };

    // console.log(dataUpdate);

    const json = await axios.post(
      `${process.env.SHIPPOP_WEB_BACKEND}/update/`,
      dataUpdate
    );
    console.log(json.data);

    res.status(200).send({ data: json.data });
  } catch (error) {
    res.status(500).send({ message: "มีบางอย่างผิดพลาด", status: false });
  }
};
