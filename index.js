require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const connection = require("./config/db");
connection();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json());
app.use(cors());

// Hello worlds
app.get("/dev/express/", (req, res) => {
  res.send("Hello I'm dev in nbadigitalservice company");
});
app.use("/dev/express/signin-admin", require("./routes/signin.admin"));

app.use("/dev/express/check-price", require("./routes/check.price")); // ออกนอก
app.use("/dev/express/booking", require("./routes/booking")); // ออกนอก
app.use("/dev/express/webhook", require("./routes/web.hook")); // ออกนอก
app.use("/dev/express/tracking", require("./routes/tracking")); // ออกนอก
app.use("/dev/express/label", require("./routes/label")); // ออกนอก

//////////////-----------------------------///////////////
app.use("/dev/express/admins", require("./routes/admin"));
app.use("/dev/express/partners", require("./routes/partners"));
app.use("/dev/express/cod-express", require("./routes/cod.express"));
app.use("/dev/express/ip-address", require("./routes/ip.address"));
app.use("/dev/express/courier", require("./routes/courier"));
app.use("/dev/express/purchase", require("./routes/purchase"));
app.use("/dev/express/cut-around", require("./routes/cut.around"));
app.use("/dev/express/check", require("./routes/check"));

const port = process.env.PORT || 9110;
app.listen(port, console.log(`Listening on port ${port}...`));
