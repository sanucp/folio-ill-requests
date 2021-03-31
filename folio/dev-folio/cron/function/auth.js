const axios = require("axios");
const config = require("../data/config.json");

config.forEach((element) => {
  if (element.name === "test") {
    module.exports = function getToken() {
      const url = element.folio_url + "authn/login";
      const headers = {
        "Content-Type": "application/json",
        "x-okapi-tenant": element.folio_tenandid,
      };
      const auth = {
        username: element.folio_user,
        password: element.folio_pass,
      };
      return new Promise(function (resolve, reject) {
        try {
          axios
            .post(url, JSON.stringify(auth), {
              headers: headers,
            })
            .then(function (response) {
              const t = response.headers;
              if (t["x-okapi-token"]) {
                const d = t["x-okapi-token"];
                resolve(d);
                //console.log(d);
              } else {
                console.log("getOkapiToken: no okapi token");
              }
            })
            .catch(function (error) {
              console.log("getOkapiToken: error getting okapi token");
              console.log(error);
            });
        } catch (e) {
          console.log(e.message);
          throw e;
        }
      });
    };
  }
});
