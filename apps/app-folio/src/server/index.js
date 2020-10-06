const express = require("express");
const axios = require("axios");
const config = require("./config.json");
const { v4: uuidv4 } = require("uuid");

const app = express();

app.use(express.static("dist"));

function getToken() {
  const url = config["demo"]["folio_url"] + "authn/login";
  const headers = {
    "Content-Type": "application/json",
    "x-okapi-tenant": config["demo"]["folio_tenandid"],
  };
  const auth = {
    username: config["demo"]["folio_user"],
    password: config["demo"]["folio_pass"],
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
            const d = t["x-okapi-token"].toString();
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

app.get("/api/getUser/:usr&:pass", (req, res) => {
  //console.log(req.param("pass"));
  try {
    var name = req.param("usr");
    var pass = req.param("pass");

    var authUrl = config["demo"]["folio_url"] + "authn/login";
    const authHeaders = {
      "Content-Type": "application/json",
      "x-okapi-tenant": config["demo"]["folio_tenandid"],
    };

    const usrData = {
      username: name,
      password: pass,
    };

    axios
      .post(authUrl, JSON.stringify(usrData), {
        headers: authHeaders,
      })
      .then(function (response) {
        if (response.status == 201) {
          async function a() {
            let men;
            return await getToken()
              .then(function (result) {
                men = result;
              })
              .then(function () {
                axios({
                  url:
                    config["demo"]["folio_url"] +
                    "bl-users/by-username/" +
                    name,
                  method: "get",
                  headers: {
                    "X-Okapi-Tenant": config["demo"]["folio_tenandid"],
                    "X-Okapi-Token": men,
                  },
                })
                  .then(function (usr) {
                    if (usr.status == 200) {
                      var response = JSON.stringify(usr.data.user);
                      res.send({ info: JSON.parse(response) });
                    }
                  })
                  .catch((e) => console.log(e));
              });
          }
          a();
        }
      })
      .catch((error) => console.log(error));
  } catch (err) {
    console.log("err", err);
  }
});

app.get("/api/request/:i&:a&:us&:bib", (req, res) => {
  //console.log(req.param("bib"));
  try {
    var u = req.param("us");
    var i = req.param("i");
    var au = req.param("a");
    const bib = req.param("bib");

    //console.log(JSON.parse(bib));

    function getItem() {
      let tok;
      let id;
      let recid;
      const bibdata = {
        source: "FOLIO",
        title: bib,
        contributors: [
          {
            name: au,
            contributorTypeId: "6e09d47d-95e2-4d8a-831b-f777b8ef6d81",
            contributorNameTypeId: "2b94c631-fca9-4892-a730-03ee529ffe2a",
            primary: true,
          },
        ],
        identifiers: [
          {
            identifierTypeId: "8261054f-be78-422d-bd51-4ed9f33c3422",
            value: i,
          },
        ],
        instanceTypeId: "6312d172-f0cf-40f6-b27d-9fa8feaf332f",
        tags: {
          tagList: ["ill-pending"],
        },
      };
      //console.log(bibdata);
      return new Promise(function (resolve, reject) {
        getToken()
          .then(function (result) {
            tok = result;
          })
          .then(function () {
            axios({
              url:
                config["demo"]["folio_url"] +
                "inventory/instances?limit=30&query=keyword all '" +
                i +
                "'",
              method: "get",
              headers: {
                "X-Okapi-Tenant": config["demo"]["folio_tenandid"],
                "X-Okapi-Token": tok,
              },
            })
              .then(function (response) {
                if (response.data.totalRecords != 0) {
                  //console.log(response.data.instances[0]["id"]);
                  id = response.data.instances[0]["id"];
                } else {
                  axios({
                    url:
                      config["demo"]["folio_url"] +
                      "instance-storage/instances",
                    method: "post",
                    headers: {
                      "X-Okapi-Tenant": config["demo"]["folio_tenandid"],
                      "X-Okapi-Token": tok,
                      "Content-Type": "application/json",
                    },
                    data: bibdata,
                  })
                    .then(function (res) {
                      console.log(res.data.instances[0]["id"]);
                      //id = response.data.instances[0]["id"];
                    })
                    .catch(function (error) {
                      console.log(error.response.data);
                    });
                }
              })
              .then(function () {
                //console.log(id);
                axios({
                  url:
                    config["demo"]["folio_url"] +
                    "holdings-storage/holdings?limit=100&query=instanceId==" +
                    id,
                  method: "get",
                  headers: {
                    "X-Okapi-Tenant": config["demo"]["folio_tenandid"],
                    "X-Okapi-Token": tok,
                  },
                })
                  .then(function (response) {
                    recid = response.data.holdingsRecords[0]["id"];
                    //console.log(response.data);
                  })
                  .then(function () {
                    axios({
                      url:
                        config["demo"]["folio_url"] +
                        "inventory/items?query=holdingsRecordId==" +
                        recid,
                      method: "get",
                      headers: {
                        "X-Okapi-Tenant": config["demo"]["folio_tenandid"],
                        "X-Okapi-Token": tok,
                      },
                    })
                      .then(function (response) {
                        var r = response.data.items;
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
    getItem();
    async function request() {
      let re;
      let tk;
      var body;
      var id = uuidv4();
      var d = new Date();
      //var nd = new Date();
      //nd.setDate(+4);
      var url;
      var header;
      return (
        await getToken().then(function (result) {
          tk = result;
        }),
        await getItem().then(function (response) {
          re = response;
          //console.log(re);
        }),
        (body = {
          id: id,
          requestType: "Page",
          requestDate: d.toISOString(),
          requesterId: u,
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
              name: re[0]["effectiveLocation"]["name"],
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
          "X-Okapi-Tenant": config["demo"]["folio_tenandid"],
          "X-Okapi-Token": tk,
          "Content-Type": "application/json",
        }),
        (url = config["demo"]["folio_url"] + "circulation/requests"),
        //console.log(body),
        axios
          .post(url, JSON.stringify(body), {
            headers: header,
          })
          .then(function (resp) {
            if (resp.status == 201) {
              var respt = resp;
              //console.log(respt);
              res.send({ re: JSON.parse(respt) });
            }
          })
          .catch(function (e) {
            console.log(e.response);
          })
      );
    }
    request();
  } catch (err) {
    console.log("err", err);
  }
});

app.listen(process.env.PORT || 8080, () =>
  console.log(`Listening on port ${process.env.PORT || 8080}!`)
);
