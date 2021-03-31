const axios = require("axios");
const config = require("./data/config.json");
const orgs = require("./data/orgs.json");
const getToken = require("./function/authtk");

function test() {
  let tk;
  let header;
  let body;
  const uri = config["game"]["folio_url"] + "organizations/organizations";

  getToken()
    .then((re) => {
      tk = re;
      header = {
        "Content-Type": "application/json",
        "x-okapi-tenant": config["game"]["folio_tenandid"],
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

      //console.log(uri);
      /*axios
        .post(url, JSON.stringify(body), { heades: header })
        .then((res) => {
          console.log(res);
        })
        .catch((e) => {
          console.log(e.response);
        });*/
    });
}

test();
