const axios = require("axios");
const { Partners } = require("../../models/partners.model");
const { Courier } = require("../../models/courier.model");
const { Purchase } = require("../../models/purchase.model");
const { CodExpress } = require("../../models/cod.express.model");

exports.postBook = async (req, res) => {
  try {
    const id = req.decoded._id;

    let partner = await Partners.findOne({ _id: id, partner_status: true });
    if (!partner) {
      res.status(404).send({
        status: false,
        message: "Partner not found",
      });
    } else {
      let status_cod = false;
      req.body.data.map((item) => {
        if (item.cod_amount) {
          status_cod = true;
        }
      });

      if (status_cod) {
        if (!req.body.email) {
          res.status(404).send({ data: "กรุณาลงทะเบียนอีเมลก่อนส่ง cod", status: false });
        } else {
          const resultCod = await CodExpress.findOne({
            cod_email: req.body.email,
            cod_status: true,
          });
          if (!resultCod) {
            res.status(404).send({ data: "กรุณาตรวจสอบ email อีกครั้งหรือติดต่อบริษัท", status: false });
          } else {
            await bookingShippop(req, res);
          }
        }
      } else {
        await bookingShippop(req, res);
      }
    }
  } catch (error) {
    res.status(500).send({ message: "มีบางอย่างผิดพลาด", status: false });
  }
};

const bookingShippop = async (req, res) => {
  const id = req.decoded._id;
  const apiKey = process.env.SHIPPOP_API_KEY;
  const email = process.env.EMAIL_BOOKING;
  const bookingData = { ...req.body, email };
  let partner = await Partners.findOne({ _id: id, partner_status: true });

  const json = await axios.post(`${process.env.SHIPPOP_WEB_BACKEND}/booking/`, {
    ...bookingData,
    api_key: apiKey,
  });
  if (json.data.status) {
    const purchase = json.data;
    const dataPurchase = {
      partner_id: id,
      purchase_id: purchase.purchase_id,
      total_price:
        (parseFloat(purchase.total_price) * (100 + partner.partner_percent)) /
        100,
    };
    await new Purchase({
      ...dataPurchase,
    }).save();
    const newDetail = [];
    for (const key of Object.keys(json.data.data)) {
      const newCourier = json.data.data[key];
      const newData = { ...bookingData.data[key].parcel };
      await new Courier({
        ...newCourier,
        price:
          (parseFloat(newCourier.price) * (100 + partner.partner_percent)) /
          100,
        partner_id: id,
        purchase_id: purchase.purchase_id,
        parcel: newData,
      }).save();
      const dataResponse = {
        ...newCourier,
        price:
          (parseFloat(newCourier.price) * (100 + partner.partner_percent)) /
          100,
        purchase_id: purchase.purchase_id,
        parcel: newData,
        status: true,
      };
      newDetail.push(dataResponse);
    }

    const newResponse = {
      purchase_id: purchase.purchase_id,
      total_price:
        (parseFloat(purchase.total_price) * (100 + partner.partner_percent)) /
        100,
      status: true,
      data: newDetail,
    };

    res.status(200).send({ data: newResponse });
  } else {
    res.status(200).send({ data: json.data });
  }
};
