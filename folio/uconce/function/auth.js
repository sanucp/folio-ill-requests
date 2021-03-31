const axios = require("axios");
const config = require("../data/config.json");

module.exports = function getToken() {
  const url = config["test"]["folio_url"] + "authn/login";
  const headers = {
    "Content-Type": "application/json",
    "x-okapi-tenant": config["test"]["folio_tenandid"],
  };
  const auth = {
    username: config["test"]["folio_user"],
    password: config["test"]["folio_pass"],
  };
  return new Promise((resolve, reject) => {
    try {
      axios
        .post(url, JSON.stringify(auth), {
          headers: headers,
        })
        .then((response) => {
          const t = response.headers;
          if (t["x-okapi-token"]) {
            const d = t["x-okapi-token"];
            resolve(d);
            //console.log(d);
          } else {
            console.log("getOkapiToken: no okapi token");
          }
        })
        .catch((error) => {
          console.log("getOkapiToken: error getting okapi token");
          console.log(error);
        });
    } catch (e) {
      console.log(e.message);
      throw e;
    }
  });
};
