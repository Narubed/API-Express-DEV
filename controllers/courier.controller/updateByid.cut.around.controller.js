const { Courier, validate } = require("../../models/courier.model");

exports.update = async (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).send({
        message: "ส่งข้อมูลผิดพลาด",
      });
    }
    const { courier_id, tax } = req.body;
    console.log(courier_id);
    await courier_id.map(async (item) => {
      await Courier.findByIdAndUpdate(
        {
          _id: item,
        },

        { courier_cutarourd: tax },
        { useFindAndModify: false }
      );
    });

    // Courier.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    //   .then((data) => {
    //     console.log(data);
    //     if (!data) {
    //       res.status(404).send({
    //         message: `ไม่สามารถเเก้ไขข้อมูลนี้ได้`,
    //         status: false,
    //       });
    //     } else
    res.send({
      message: "แก้ไขข้อมูลนี้เรียบร้อยเเล้ว",
      status: true,
    });
    //   })
    //   .catch((err) => {
    //     res.status(500).send({
    //       message: "มีบ่างอย่างผิดพลาด",
    //       status: false,
    //     });
    //   });
  } catch (error) {
    res.status(500).send({ message: "มีบางอย่างผิดพลาด", status: false });
  }
};
