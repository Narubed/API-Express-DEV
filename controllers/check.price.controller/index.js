const axios = require("axios");
const { Partners } = require("../../models/partners.model");

exports.getPrice = async (req, res) => {
  try {
    const id = req.decoded._id;
    const apiKey = process.env.SHIPPOP_API_KEY;
    const json = await axios.post(
      `${process.env.SHIPPOP_WEB_BACKEND}/pricelist/`,
      { ...req.body, api_key: apiKey }
    );
    const newJson = json.data.data[0];
    // for (const key of Object.keys(json.data.data)) {
    //   console.log(key, json.data.data[key]);
    // }
    const partners = await Partners.findOne({ _id: id });
    if (!partners) {
      return res.status(404).json({
        message: "Partner not found",
      });
    }
    const newArray = [];
    for (const key of Object.keys(newJson)) {
      newArray.push({
        key: key,
        ...newJson[key],
        price:
          (parseFloat(newJson[key].price) * (partners.partner_percent + 100)) /
          100,
      });
    }

    res.status(200).send({ data: newArray });
  } catch (error) {
    res.status(500).send({ message: "มีบางอย่างผิดพลาด", status: false });
  }
};
