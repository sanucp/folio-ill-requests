const axios = require("axios");
const config = require("./data/config.json");
const fy = require("./data/fy.json");
const getToken = require("./function/authtk");
const nfy = require("./function/newfy");

function srfy() {
  let tk;
  return new Promise((resolve, reject) => {
    try {
      getToken()
        .then((r) => {
          tk = r;
        })
        .then(() => {
          axios({
            url:
              config["game"]["folio_url"] +
              "finance/fiscal-years?query=((code=" +
              fy["code"] +
              "*))",
            method: "get",
            headers: {
              "X-Okapi-Tenant": config["game"]["folio_tenandid"],
              "X-Okapi-Token": tk,
            },
          })
            .then((res) => {
              if (res.data.totalRecords != 0) {
                console.log(res.data.fiscalYears["0"]["id"]);
              } else {
                nfy().then((re) => {
                  console.log(re);
                });
              }
            })
            .catch((err) => {
              console.log(err);
            });
        });
    } catch (e) {
      console.log(e.message);
      throw e;
    }
  });
}

srfy();
