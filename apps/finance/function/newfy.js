const axios = require("axios");
const config = require("../data/config.json");
const fy = require("../data/fy.json");
const getToken = require("./auth");
const aunit = require("./aqunit");

module.exports = function newfy() {
  let tok;
  let au;
  let body;
  return new Promise(function (resolve, reject) {
    try {
      getToken()
        .then(function (r) {
          tok = r;
        })
        .then(function () {
          aunit()
            .then(function (res) {
              au = res;
              body = {
                name: fy["name"],
                acqUnitIds: [au],
                code: fy["code"],
                description: fy["description"],
                periodStart: fy["start"],
                periodEnd: fy["end"],
                series: "FY",
                currency: "COP",
              };
            })
            .then(function () {
              axios({
                url: config["game"]["folio_url"] + "finance/fiscal-years",
                method: "post",
                headers: {
                  "X-Okapi-Tenant": config["game"]["folio_tenandid"],
                  "X-Okapi-Token": tok,
                  "Content-Type": "application/json",
                },
                data: JSON.stringify(body),
              }).then(function (re) {
                const f = re.data.fiscalYears["0"]["id"];
                resolve(f);
              });
            });
        });
    } catch (e) {
      console.log(e.message);
      throw e;
    }
  });
};
