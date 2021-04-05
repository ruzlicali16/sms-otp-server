const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

var corsOption = {
  origin: "http://localhost:8081",
};

app.use(cors(corsOption));
app.use(bodyParser.json({}));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({ message: "Welcome to my server!" });
});

app.post("/api/send-sms", (req, res) => {
  var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
  var xhr = new XMLHttpRequest();

  makeCorsRequest(req.body.generatedCode, req.body.phoneNumber);
  async function makeCorsRequest(generatedCode, phoneNumber) {
    const url = `http://api.smsala.com/api/SendSMS?api_id=API641339859960&api_password=ZAjE1M1Qzg&sms_type=P&encoding=T&sender_id=tstala&phonenumber=${phoneNumber}&textmessage=MAPPCHO APP OTP Generated is ${generatedCode}. Please Don't Reply!`;
    createCORSRequest("GET", url);

    if (!xhr) {
      console.log("CORS not supported");
      return;
    }
    xhr.onload = function () {
      var text = xhr.responseText;
      console.log("text :>> ", text);
      res.send(req.body.generatedCode);
    };
    xhr.onerror = function () {
      console.log("ERROR in server!");
    };
    xhr.send();
  }

  function createCORSRequest(method, url) {
    if ("withCredentials" in xhr) {
      // XHR for Chrome/Firefox/Opera/Safari.
      xhr.open(method, url, true);
    } else if (typeof XDomainRequest != "undefined") {
      // XDomainRequest for IE.
      xhr = new XDomainRequest();
      xhr.open(method, url);
    } else {
      // CORS not supported.
      xhr = null;
    }
  }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
