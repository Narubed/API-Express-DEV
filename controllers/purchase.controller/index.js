const bcrypt = require("bcrypt");
const multer = require("multer");
const fs = require("fs");
const { Courier } = require("../../models/courier.model");
const { Purchase } = require("../../models/purchase.model");

exports.findAll = async (req, res) => {
  try {
    console.log("const id = req.params.id;");
    Purchase.aggregate([
      {
        $lookup: {
          from: "couriers",
          localField: "purchase_id",
          foreignField: "purchase_id",
          as: "all",
        },
      },
    ])
      .then((data) => {
        if (!data)
          res
            .status(404)
            .send({ message: "ไม่สามารถหารายงานนี้ได้", status: false });
        else res.send({ data, status: true });
      })
      .catch((err) => {
        res.status(500).send({
          message: "มีบางอย่างผิดพลาด",
          status: false,
        });
      });
    // Courier.findOne({ tracking_code: id })
    //   .then((data) => {
    //     if (!data)
    // res.status(404).send({ message: "ไม่สามารถหารายงานนี้ได้", status: false });
    //     else res.send({ data, status: true });
    //   })
    //   .catch((err) => {
    //     res.status(500).send({
    //       message: "มีบางอย่างผิดพลาด",
    //       status: false,
    //     });
    //   });
  } catch (error) {
    res.status(500).send({
      message: "มีบางอย่างผิดพลาด",
      status: false,
    });
  }
};
