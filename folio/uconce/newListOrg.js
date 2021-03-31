const axios = require("axios");
const config = require("./data/config.json");
const orgs = require("./data/library-orgs.json");
const getToken = require("./function/auth");

function listOrg() {
  let tk;
  let header;
  let body;
  const uri = config["test"]["folio_url"] + "organizations/organizations";

  getToken()
    .then((re) => {
      tk = re;
      header = {
        "Content-Type": "application/json",
        "x-okapi-tenant": config["test"]["folio_tenandid"],
        "x-okapi-token": tk,
      };
    })
    .then(() => {
      orgs.forEach((element) => {
        body = {
          name: element["name"],
          code: element["code"],
          description: element["description"],
          status: "Active",
          language: "es-es",
          phoneNumbers: [
            {
              phoneNumber: element["phoneNumbers"],
            },
          ],
          emails: [
            {
              value: element["emails"],
            },
          ],
        };
        //console.log(body);
        axios
          .post(uri, JSON.stringify(body), { headers: header })
          .then((res) => {
            console.log(res.data);
          })
          .catch((e) => {
            console.log(e);
          });
      });
    });
}

listOrg();
