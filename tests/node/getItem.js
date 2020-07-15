const axios = require("axios");
const config = require("./config.json");

function getToken() {
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

function getItem() {
  let tok;
  let rId;
  let recid;
  return new Promise(function (resolve, reject) {
    getToken()
      .then(function (result) {
        tok = result;
      })
      .then(function () {
        axios({
          url:
            config["folio_url"] +
            "inventory/instances?limit=30&query=keyword all '9781423160922'",
          method: "get",
          headers: {
            "X-Okapi-Tenant": config["folio_tenandid"],
            "X-Okapi-Token": tok,
          },
        })
          .then(function (res) {
            rId = res.data.instances[0]["id"];
          })
          .then(function () {
            axios({
              url:
                config["folio_url"] +
                "holdings-storage/holdings?limit=100&query=instanceId==" +
                rId,
              method: "get",
              headers: {
                "X-Okapi-Tenant": config["folio_tenandid"],
                "X-Okapi-Token": tok,
              },
            })
              .then(function (response) {
                //recid = response.data.holdingsRecords[0]["id"];
                recid = response.data.holdingsRecords[0]["id"];
                //console.log(recid);
              })
              .then(function () {
                axios({
                  url:
                    config["folio_url"] +
                    "inventory/items?query=holdingsRecordId==" +
                    recid,
                  method: "get",
                  headers: {
                    "X-Okapi-Tenant": config["folio_tenandid"],
                    "X-Okapi-Token": tok,
                  },
                })
                  .then(function (res) {
                    var r = res.data.items[0]["id"];
                    console.log(r);
                    resolve(r);
                  })
                  .catch(function (error) {
                    console.log(error);
                  });
              })
              .catch(function (err) {
                console.log(err);
              });
          })
          .catch(function (e) {
            console.log(e);
          });
      });
  });
}

getItem();
