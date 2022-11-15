const { CutAround, validate } = require("../../models/cut.around.model");

const dayjs = require("dayjs");

exports.create = async (req, res) => {
  try {
    CutAround.find().then((value) => {
      console.log(value);
      if (!value) {
        res.status(404);
      } else {
        console.log("ค่าที่รีเทอนกลับมา =>>>>>>> ", value);
        const findDate = value.filter(
          (item) =>
            dayjs(item.cut_timestamp[0].timestamp).format("MM/YYYY") ===
            dayjs(req.body.date).format("MM/YYYY")
        );
        if (findDate.length === 0) {
          res.send({
            status: true,
            tax: `CA${dayjs(req.body.date).format(
              "YYYYMM"
            )}00001`,
          });
        } else if (findDate.length < 9) {
          res.send({
            status: true,
            tax: `CA${dayjs(req.body.date).format(
              "YYYYMM"
            )}0000${findDate.length + 1}`,
          });
        } else if (findDate.length < 99) {
          res.send({
            status: true,
            tax: `CA${dayjs(req.body.date).format("YYYYMM")}000${
              findDate.length + 1
            }`,
          });
        } else if (findDate.length < 999) {
          res.send({
            status: true,
            tax: `CA${dayjs(req.body.date).format("YYYYMM")}00${
              findDate.length + 1
            }`,
          });
        } else if (findDate.length < 9999) {
          res.send({
            status: true,
            tax: `CA${dayjs(req.body.date).format("YYYYMM")}0${
              findDate.length + 1
            }`,
          });
        } else if (findDate.length < 99999) {
          res.send({
            status: true,
            tax: `CA${dayjs(req.body.date).format("YYYYMM")}${
              findDate.length + 1
            }`,
          });
        }
      }
    });
  } catch (error) {
    res.status(500).send({
      message: "มีบางอย่างผิดพลาด",
      status: false,
    });
  }
};
