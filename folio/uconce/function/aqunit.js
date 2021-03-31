const axios = require("axios");
const config = require("../data/config.json");
const getToken = require("./auth");

module.exports = function aunit() {
  let tk;
  return new Promise(function (resolve, reject) {
    try {
      getToken()
        .then(function (re) {
          tk = re;
        })
        .then(function () {
          axios({
            url: config["test"]["folio_url"] + "acquisitions-units/units",
            method: "get",
            headers: {
              "X-Okapi-Tenant": config["test"]["folio_tenandid"],
              "X-Okapi-Token": tk,
            },
          })
            .then(function (res) {
              if (res.totalRecords != 0) {
                //console.log(res.data.acquisitionsUnits[0]["id"]);
                var au = res.data.acquisitionsUnits[1]["id"];
                resolve(au);
              }
            })
            .catch(function (err) {
              console.log(err);
            });
        })
        .catch(function (e) {
          console.log(e);
        });
    } catch (e) {
      console.log(e.message);
      throw e;
    }
  });
};
