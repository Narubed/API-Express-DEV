const axios = require("axios");
require("dotenv").config();
const { Courier } = require("../../models/courier.model");

exports.cancel = async (req, res) => {
  try {
    const tracking_code = req.body.tracking_code;
    const dataCancel = {
      api_key: process.env.SHIPPOP_API_KEY,
      tracking_code: tracking_code,
    };
    const json = await axios.post(
      `${process.env.SHIPPOP_WEB_BACKEND}/cancel/`,
      dataCancel
    );
    if (json.data.status) {
      await Courier.findOneAndUpdate(
        {
          tracking_code: tracking_code,
        },
        {
          $set: {
            courier_status: "cancel",
          },
        }
      );
    } else {
      res.status(200).send({ data: json.data });
    }
  } catch (error) {
    res.status(500).send({ message: "มีบางอย่างผิดพลาด", status: false });
  }
};
