const axios = require("axios");
const config = require("../data/config.json");
const org = require("../data/org.json");
const getToken = require("./authtk");

module.exports = function sOrg() {
  let tk;
  return new Promise((resolve, reject) => {
    try {
      getToken()
        .then((res) => {
          tk = res;
        })
        .then(() => {
          axios({
            url:
              config["game"]["folio_url"] +
              "organizations/organizations?query=((name=" +
              org["name"] +
              "))",
            method: "get",
            headers: {
              "X-Okapi-Tenant": config["game"]["folio_tenandid"],
              "X-Okapi-Token": tk,
            },
          })
            .then((r) => {
              const org = r.data.organizations[0]["id"];
              //console.log(r.data.organizations[0]["id"]);
              resolve(org);
            })
            .catch((e) => {
              console.log(e);
            });
        });
    } catch (e) {
      console.log(e.message);
      throw e;
    }
  });
};
