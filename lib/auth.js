require("dotenv").config();
const jwt = require("jsonwebtoken");
const { IPAddress } = require("../models/ip.address.model");

module.exports = checkToken = async (req, res, next) => {
  let token = req.headers["auth-token"];
  let ipAddress = req.headers["x-real-ip"] || req.headers["x-forwarded-for"];
  if (token) {
    token = token.replace(/^Bearer\s+/, "");
    jwt.verify(token, process.env.JWTPRIVATEKEY, async (err, decoded) => {
      if (err) {
        return res.status(408).json({
          success: false,
          message: "หมดเวลาใช้งานแล้ว",
          logout: true,
          description: "Request Timeout",
        });
      }
      const result = await IPAddress.find();
      const findIPAddress = result.find(
        (item) => item.ip_address === ipAddress
      );
      // if (!findIPAddress) {
      //   return res.status(408).json({
      //     success: false,
      //     message: "ไม่สามารถเข้าถึงการใช้งานนี้ได้",
      //     logout: true,
      //     description: "Request Timeout",
      //   });
      // }

      req.decoded = decoded;
      next();
    });
  } else {
    return res.status(401).json({
      success: false,
      message: "Token not provided Token ไม่ถูกต้อง",
      logout: false,
      description: "Unauthorized",
    });
  }
};
