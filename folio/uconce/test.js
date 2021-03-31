const fs = require("fs");
var axios = require("axios");
const xmlbuilder = require("xmlbuilder");

const x = xmlbuilder
  .create("soap:Envelope", { encoding: "utf-8" })
  .att("xmlns:soap", "http://schemas.xmlsoap.org/soap/envelope/")
  .att("xmlns:xsi", "http://www.w3.org/2001/XMLSchema-instance")
  .att("xmlns:xsd", "http://www.w3.org/2001/XMLSchema")
  .ele("soap:Body")
  .ele("GetReportBlock_WS_FOLIO_BIBLIOTECA")
  .ele("login", "ws_biblioteca")
  .up()
  .ele("password", "x2F4%i3LaJ")
  .up()
  .ele("_Country", "")
  .up()
  .ele("_Proveedor", "")
  .up()
  .ele("_Idnumber", "")
  .up()
  .ele("_Nombre_Organizacion", "")
  .up()
  .ele("_Name1", "")
  .up()
  .ele("_City1", "")
  .up()
  .ele("_City2", "")
  .up()
  .ele("_Tel_Number", "")
  .up()
  .ele("resetState", "true")
  .up()
  .ele("refresh", "true")
  .up()
  .ele("getFromLatestDocumentInstance", "true")
  .up()
  .ele("getFromUserInstance", "true")
  .up()
  .ele("turnOutputToVTable", "false")
  .up()
  .ele("closeDocument", "false")
  .up()
  /*.ele("startRow", "1")
  .up()
  .ele("endRow", "20")
  .up()*/
  .up()
  .up()
  .end({ pretty: true });

var config = {
  method: "post",
  url:
    "http://152.74.16.111:8080/dswsbobje/qaawsservices/biws?WSDL=1&cuid=AYKEpsMbDLtKgeYEZz7piYE",
  headers: {
    "Content-Type": "text/xml;charset=UTF-8",
    soapAction: "WS_BIBLIOTECA/GetReportBlock_WS_FOLIO_BIBLIOTECA",
  },
  data: x,
};

console.log(config);

axios(config)
  .then((response) => {
    fs.writeFile("orgs.xml", response.data, "utf-8", (err) => {
      if (err) throw err;
      console.log("exito");
    });
  })
  .catch((err) => {
    console.log(err);
  });
