const axios = require("axios");
require("dotenv").config();
const { Courier } = require("../../models/courier.model");
const { Purchase } = require("../../models/purchase.model");

exports.confirm = async (req, res) => {
  try {
    const purchase_id = req.body.purchase_id;
    const dataComfirn = {
      api_key: process.env.SHIPPOP_API_KEY,
      purchase_id: purchase_id,
    };

    const json = await axios.post(
      `${process.env.SHIPPOP_WEB_BACKEND}/confirm/`,
      dataComfirn
    );

    if (json.data.status) {
      const purchaseJson = await axios.post(
        `${process.env.SHIPPOP_WEB_BACKEND}/tracking_purchase/`,
        dataComfirn
      );
      await Purchase.findOneAndUpdate(
        { purchase_id: purchase_id },
        { $set: { purchase_status: purchaseJson.data.purchase_status } }
      );
      for (const key of Object.keys(purchaseJson.data.data)) {
        await Courier.findOneAndUpdate(
          {
            tracking_code: purchaseJson.data.data[key].tracking_code,
          },
          {
            $set: {
              datetime_order: purchaseJson.data.data[key].datetime_order,
              courier_status: purchaseJson.data.data[key].status,
            },
          }
        );
      }
      res.status(200).send({
        data: json.data,
      });
    } else {
      res.status(200).send({ data: json.data });
    }
  } catch (err) {
    res.status(500).send({ message: "มีบางอย่างผิดพลาด", status: false });
  }
};
