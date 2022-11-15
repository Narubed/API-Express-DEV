const axios = require("axios");
require("dotenv").config();
const { Courier } = require("../../models/courier.model");
const { Partners } = require("../../models/partners.model");
exports.update = async (req, res) => {
  try {
    const tracking_code = req.body.tracking_code;
    const order_status = req.body.order_status;
    if (
      req.body &&
      order_status === "shipping" &&
      req.body.data &&
      req.body.data.datetime &&
      req.body.data.datetime.length !== 0
    ) {
      let result = null;
      if (
        req.body.data.width &&
        req.body.data.height &&
        req.body.data.length &&
        req.body.data.price
      ) {
        const findPartnerId = await Courier.findOne({
          tracking_code: tracking_code,
        });
        const findPartner = await Partners.findOne({
          _id: findPartnerId.partner_id,
        });

        result = await Courier.findOneAndUpdate(
          {
            tracking_code: tracking_code,
          },
          {
            $set: {
              courier_status: order_status,
              datetime_shipping: req.body.data.datetime,
              price:
                (parseFloat(req.body.data.price) *
                  (findPartner.partner_percent + 100)) /
                100,
              parcel: {
                weight: req.body.data.weight,
                width: req.body.data.width,
                length: req.body.data.length,
                height: req.body.data.height,
              },
            },
          }
        );

        await Partners.findOne({ _id: result.partner_id }).then(
          async (json) => {
            if (json.partner_webhook)
              await axios.post(`${json.partner_webhook}`, {
                courier_status: order_status,
                datetime_shipping: req.body.data.datetime,
                price:
                  (parseFloat(req.body.data.price) *
                    (findPartner.partner_percent + 100)) /
                  100,
                parcel: {
                  weight: req.body.data.weight,
                  width: req.body.data.width,
                  length: req.body.data.length,
                  height: req.body.data.height,
                },
              });
          }
        );
      } else {
        result = await Courier.findOneAndUpdate(
          {
            tracking_code: tracking_code,
          },
          {
            $set: {
              courier_status: order_status,
              datetime_shipping: req.body.data.datetime,
            },
          }
        );

        await Partners.findOne({ _id: result.partner_id }).then(
          async (json) => {
            if (json.partner_webhook)
              await axios.post(`${json.partner_webhook}`, {
                tracking_code: tracking_code,
                order_status: order_status,
                datetime: req.body.data.datetime,
              });
          }
        );
      }
    } else {
      const result = await Courier.findOneAndUpdate(
        {
          tracking_code: tracking_code,
        },
        {
          $set: {
            courier_status: order_status,
          },
        }
      );

      await Partners.findOne({ _id: result.partner_id }).then(async (json) => {
        if (json.partner_webhook)
          await axios.post(`${json.partner_webhook}`, {
            tracking_code: tracking_code,
            order_status: order_status,
          });
      });
    }
    res.status(200).send({ status: true });
  } catch (error) {
    res.status(500).send({ message: "มีบางอย่างผิดพลาด", status: false });
  }
};
