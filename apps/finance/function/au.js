const axios = require("axios");
const config = require("../data/config.json");

module.exports = function au() {
  const url = config["game"]["folio_url"] + "authn/login";
  const headers = {
    "Content-Type": "application/json",
    "x-okapi-tenant": config["game"]["folio_tenandid"],
  };
  const auth = {
    username: config["game"]["folio_user"],
    password: config["game"]["folio_pass"],
  };
  axios
    .post(url, JSON.stringify(auth), {
      headers: headers,
    })
    .then((response) => {
      const t = response.headers;
      if (t["x-okapi-token"]) {
        const d = t["x-okapi-token"];
        Response(d);
        //console.log(d);
      } else {
        console.log("getOkapiToken: no okapi token");
      }
    })
    .catch((error) => {
      console.log("getOkapiToken: error getting okapi token");
      console.log(error);
    });
};
