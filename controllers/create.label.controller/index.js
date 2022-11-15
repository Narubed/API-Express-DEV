const axios = require("axios");
const { Partners } = require("../../models/partners.model");

exports.create = async (req, res) => {
  try {
    const dataPOST = {
      api_key: `${process.env.SHIPPOP_API_KEY}`,
      purchase_id: req.body.purchase_id,
      tracking_code: req.body.tracking_code,
      size: req.body.size ? req.body.size : "sticker4x6",
      logo: req.body.logo
        ? req.body.logo
        : "https://nbadigitalservice.com/static/media/logonba-worlds.c6e24cda.png",
      type: req.body.type ? req.body.type : "html",
      options: req.body.options ? req.body.options : "",
    };
    let json = {};
    json = await axios.post(
      `${process.env.SHIPPOP_WEB_BACKEND}/label/`,
      dataPOST
    );

    res.status(200).send(json.data);
  } catch (error) {
    res.status(500).send({ message: "มีบางอย่างผิดพลาด", status: false });
  }
};
