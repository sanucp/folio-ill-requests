var axios = require("axios");
var fs = require("fs");
var data =
  '<?xml version="1.0" encoding="UTF-8"?>\r\n<soap:Envelope xmlns:soap= xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema">\r\n    <soap:Body>\r\n        <GetReportBlock_WS_FOLIO_BIBLIOTECA>\r\n            <login>ws_biblioteca</login>\r\n            <password>x2F4%i3LaJ</password>\r\n        </GetReportBlock_WS_FOLIO_BIBLIOTECA>\r\n    </soap:Body>\r\n</soap:Envelope>';

var config = {
  method: "post",
  url:
    "http://152.74.16.111:8080/dswsbobje/qaawsservices/biws?WSDL=1&cuid=AYKEpsMbDLtKgeYEZz7piYE",
  headers: {
    "Content-Type": "text/xml;charset=UTF-8",
    soapAction: "WS_BIBLIOTECA/GetReportBlock_WS_FOLIO_BIBLIOTECA",
  },
  data: data,
};

axios(config)
  .then(function (response) {
    fs.writeFile("test.xml", response.data, "utf-8", (err) => {
      if (err) throw err;
      console.log("exito");
    });
  })
  .catch(function (error) {
    console.log(error);
  });
