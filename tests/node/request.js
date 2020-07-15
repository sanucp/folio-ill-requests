const { v4: uuidv4 } = require("uuid");
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
                recid = response.data.holdingsRecords[0]["id"];
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
                    var r = res.data.items;
                    //console.log(r);
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

function getUser() {
  let token;
  return new Promise(function (resolve, reject) {
    getToken()
      .then(function (result) {
        token = result;
      })
      .then(function () {
        axios({
          url: config["folio_url"] + "bl-users/by-username/sanucp",
          method: "get",
          headers: {
            "X-Okapi-Tenant": config["folio_tenandid"],
            "X-Okapi-Token": token,
          },
        })
          .then(function (res) {
            var u = res.data.user;
            resolve(u);
          })
          .catch(function (e) {
            console.log(e);
          });
      })
      .catch(function (error) {
        console.log(error);
      });
  });
}

async function request() {
  let us;
  let re;
  let tk;
  var body;
  var id = uuidv4();
  var d = new Date();
  var url;
  var header;
  return (
    await getToken().then(function (result) {
      tk = result;
    }),
    await getUser().then(function (result) {
      us = result;
      console.log(us);
    }),
    await getItem().then(function (res) {
      re = res;
      console.log(re);
    }),
    (body = {
      id: id,
      requestType: "Page",
      requestDate: d.toISOString(),
      requesterId: us["id"],
      itemId: re[0]["id"],
      status: "Open - In transit",
      position: 1,
      item: {
        status: re[0]["status"]["name"],
        title: re[0]["title"],
        barcode: re[0]["barcode"],
        callNumber: re[0]["itemLevelCallNumber"],
        holdingsRecordId: re[0]["holdingsRecordId"],
        location: {
          name: re[0]["permanentLocation"]["name"],
        },
      },
      fulfilmentPreference: "Hold Shelf",
      requestExpirationDate: "2020-07-25T20:25:37Z",
      pickupServicePointId: re[0]["lastCheckIn"]["servicePointId"],
      tags: {
        tagList: ["ill"],
      },
    }),
    (header = {
      "X-Okapi-Tenant": config["folio_tenandid"],
      "X-Okapi-Token": tk,
      "Content-Type": "application/json",
    }),
    (url = config["folio_url"] + "circulation/requests"),
    axios
      .post(url, JSON.stringify(body), {
        headers: header,
      })
      .then(function (res) {
        var r = res;
        console.log(r);
      })
      .catch(function (e) {
        console.log(e.response.data);
      })
  );
}

request();
