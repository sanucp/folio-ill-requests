const axios = require("axios");
const config = require("./config.json");

/*function getToken() {
  const url = config["folio_url"] + "authn/login";
  const headers = {
    "Content-Type": "application/json",
    "x-okapi-tenant": config["folio_tenandid"],
  };
  const auth = {
    username: config["folio_user"],
    password: config["folio_pass"],
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
}

async function ness() {
  let men;
  return await getToken()
    .then(function (result) {
      men = result;
    })
    .then(function () {
      axios({
        url: config["folio_url"] + "bl-users/by-username/sanucp",
        method: "get",
        headers: {
          "X-Okapi-Tenant": config["folio_tenandid"],
          "X-Okapi-Token": men,
        },
      })
        .then(function (res) {
          console.log(res);
        })
        .catch(function (err) {
          console.log(err);
        });
    })
    .catch(function (error) {
      console.log(error);
    });
}

ness();*/

var d = new Date();

d.setDate(+4);

console.log(d);
