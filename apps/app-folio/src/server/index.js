const express = require("express");
const axios = require("axios");
const config = require("./config.json");
const { v4: uuidv4 } = require("uuid");

const app = express();

app.use(express.static("dist"));

app.get("/api/id/:id", (request, response) => {
  var i = request.param("id");
  //console.log(i);
  global.id = i;
  //console.log(id);
});

function getToken() {
  const url = config[id]["folio_url"] + "authn/login";
  const headers = {
    "Content-Type": "application/json",
    "x-okapi-tenant": config[id]["folio_tenandid"],
  };
  const auth = {
    username: config[id]["folio_user"],
    password: config[id]["folio_pass"],
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

    var authUrl = config[id]["folio_url"] + "authn/login";
    const authHeaders = {
      "Content-Type": "application/json",
      "x-okapi-tenant": config[id]["folio_tenandid"],
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
                  url: config[id]["folio_url"] + "bl-users/by-username/" + name,
                  method: "get",
                  headers: {
                    "X-Okapi-Tenant": config[id]["folio_tenandid"],
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

app.get("/api/request/:i&:a&:us&:bib&:cid", (req, res) => {
  try {
    var u = req.param("us");
    var i = req.param("i");
    var au = req.param("a");
    const bib = req.param("bib");
    const cid = req.param("cid");

    //console.log(cid);

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

    function location() {
      let tk;
      return new Promise(function (resolve, reject) {
        getToken()
          .then(function (result) {
            tk = result;
          })
          .then(function () {
            axios({
              url: config[cid]["folio_url"] + "locations?query=(details=*)",
              method: "get",
              headers: {
                "X-Okapi-Tenant": config[cid]["folio_tenandid"],
                "X-Okapi-Token": tk,
              },
            }).then(function (res) {
              var l = res.data.locations[1]["id"];
              resolve(l);
            });
          });
      });
    }

    function createInsta() {
      let tok;
      return new Promise(function (resolve, reject) {
        getToken()
          .then(function (result) {
            tok = result;
          })
          .then(function () {
            axios({
              url: config[cid]["folio_url"] + "instance-storage/instances",
              method: "post",
              headers: {
                "X-Okapi-Tenant": config[cid]["folio_tenandid"],
                "X-Okapi-Token": tok,
                "Content-Type": "application/json",
              },
              data: bibdata,
            }).then(function (response) {
              var i = response.data["id"];
              resolve(i);
            });
          });
      });
    }

    async function createHold() {
      let okt;
      let insId;
      let loc;
      let holdId;
      //return new Promise(function(resolve, reject){
      return (
        await getToken().then(function (response) {
          okt = response;
        }),
        await createInsta().then(function (res) {
          insId = res;
        }),
        await location().then(function (resp) {
          loc = resp;
        }),
        (hold = {
          instanceId: insId,
          permanentLocationId: loc,
          holdingsStatements: [
            {
              statement: "Line 1",
              note: "Note to line 1",
            },
          ],
          tags: {
            tagList: ["important"],
          },
        }),
        //console.log(hold),
        new Promise(function (resolve, reject) {
          axios({
            url: config[cid]["folio_url"] + "holdings-storage/holdings",
            method: "post",
            headers: {
              "X-Okapi-Tenant": config[cid]["folio_tenandid"],
              "X-Okapi-Token": okt,
              "Content-Type": "application/json",
            },
            data: hold,
          })
            .then(function (respo) {
              holdId = respo.data["id"];
            })
            .then(function () {
              item = {
                holdingsRecordId: holdId,
                status: {
                  name: "Available",
                },
                materialTypeId: "1a54b431-2e4f-452d-9cae-9cee66c9a892",
                permanentLoanTypeId: "2b94c631-fca9-4892-a730-03ee529ffe27",
                tags: {
                  tagList: ["important"],
                },
              };
              //console.log(item);
              axios({
                url: config[cid]["folio_url"] + "item-storage/items",
                method: "post",
                headers: {
                  "X-Okapi-Tenant": config[cid]["folio_tenandid"],
                  "X-Okapi-Token": okt,
                  "Content-Type": "application/json",
                },
                data: item,
              })
                .then(function (resp) {
                  var it = resp.data["id"];
                  //console.log(it);
                  resolve(it);
                })
                .catch(function (e) {
                  console.log(e.response.data);
                });
            })
            .catch(function (e) {
              console.log(e);
            });
        })
      );
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
                config[cid]["folio_url"] +
                "inventory/instances?limit=30&query=keyword all '" +
                i +
                "'",
              method: "get",
              headers: {
                "X-Okapi-Tenant": config[cid]["folio_tenandid"],
                "X-Okapi-Token": tok,
              },
            })
              .then(function (res) {
                //console.log(res.data.instances[0]["id"]);
                rId = res.data.instances[0]["id"];
              })
              .then(function () {
                axios({
                  url:
                    config[cid]["folio_url"] +
                    "holdings-storage/holdings?limit=100&query=instanceId==" +
                    rId,
                  method: "get",
                  headers: {
                    "X-Okapi-Tenant": config[cid]["folio_tenandid"],
                    "X-Okapi-Token": tok,
                  },
                })
                  .then(function (response) {
                    recid = response.data.holdingsRecords[0]["id"];
                  })
                  .then(function () {
                    axios({
                      url:
                        config[cid]["folio_url"] +
                        "inventory/items?query=holdingsRecordId==" +
                        recid,
                      method: "get",
                      headers: {
                        "X-Okapi-Tenant": config[cid]["folio_tenandid"],
                        "X-Okapi-Token": tok,
                      },
                    })
                      .then(function (res) {
                        var r = res.data.items[0]["id"];
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

    function searchcre() {
      let stok;
      return new Promise(function (resolve, reject) {
        getToken()
          .then(function (result) {
            stok = result;
          })
          .then(function () {
            axios({
              url:
                config[cid]["folio_url"] +
                "inventory/instances?limit=30&query=keyword all '" +
                i +
                "'",
              method: "get",
              headers: {
                "X-Okapi-Tenant": config[cid]["folio_tenandid"],
                "X-Okapi-Token": stok,
              },
            })
              .then(function (res) {
                if (res.data.totalRecords != 0) {
                  getItem()
                    .then(function (resp) {
                      var idtem = resp;
                      resolve(idtem);
                    })
                    .catch(function (e) {
                      console.log(e);
                    });
                } else {
                  createHold()
                    .then(function (response) {
                      var idcre = response;
                      resolve(idcre);
                    })
                    .catch(function (e) {
                      console.log(e);
                    });
                }
              })
              .catch(function (e) {
                console.log(e.response);
              });
          });
      });
    }

    function serP() {
      let spt;
      return new Promise(function (resolve, reject) {
        getToken()
          .then(function (re) {
            spt = re;
          })
          .then(function () {
            axios({
              url: config[cid]["folio_url"] + "service-points",
              method: "get",
              headers: {
                "X-Okapi-Tenant": config[cid]["folio_tenandid"],
                "X-Okapi-Token": spt,
              },
            })
              .then(function (r) {
                var s = r.data.servicepoints[0]["id"];
                resolve(s);
              })
              .catch(function (e) {
                console.log(e);
              });
          });
      });
    }

    async function request() {
      let tokreq;
      let itemid;
      let rId;
      let recid;
      let sp;
      var id = uuidv4();
      var d = new Date();
      var body;
      return (
        await getToken().then(function (res) {
          tokreq = res;
        }),
        await searchcre().then(function (resp) {
          itemid = resp;
        }),
        await serP().then(function (r) {
          sp = r;
        }),
        axios({
          url:
            config[cid]["folio_url"] +
            "inventory/instances?limit=30&query=keyword all '" +
            i +
            "'",
          method: "get",
          headers: {
            "X-Okapi-Tenant": config[cid]["folio_tenandid"],
            "X-Okapi-Token": tokreq,
          },
        })
          .then(function (res) {
            rId = res.data.instances["0"]["id"];
          })
          .then(function () {
            axios({
              url:
                config[cid]["folio_url"] +
                "holdings-storage/holdings?limit=100&query=instanceId==" +
                rId,
              method: "get",
              headers: {
                "X-Okapi-Tenant": config[cid]["folio_tenandid"],
                "X-Okapi-Token": tokreq,
              },
            })
              .then(function (respo) {
                recid = respo.data.holdingsRecords[0]["id"];
              })
              .then(function () {
                axios({
                  url:
                    config[cid]["folio_url"] +
                    "inventory/items?query=holdingsRecordId==" +
                    recid,
                  method: "get",
                  headers: {
                    "X-Okapi-Tenant": config[cid]["folio_tenandid"],
                    "X-Okapi-Token": tokreq,
                  },
                })
                  .then(function (resp) {
                    body = {
                      id: id,
                      requestType: "Page",
                      requestDate: d.toISOString(),
                      requesterId: u,
                      itemId: itemid,
                      status: "Open - In transit",
                      position: 1,
                      item: {
                        status: resp.data.items[0]["status"]["name"],
                        title: resp.data.items[0]["title"],
                        barcode: resp.data.items[0]["barcode"],
                        callNumber: resp.data.items[0]["itemLevelCallNumber"],
                        holdingsRecordId:
                          resp.data.items[0]["holdingsRecordId"],
                        location: {
                          name: resp.data.items[0]["effectiveLocation"]["name"],
                        },
                      },
                      fulfilmentPreference: "Hold Shelf",
                      requestExpirationDate: "2020-12-31T20:25:37Z",
                      pickupServicePointId: sp,
                      tags: {
                        tagList: ["ill"],
                      },
                    };
                  })
                  .then(function () {
                    axios({
                      url: config[cid]["folio_url"] + "circulation/requests",
                      method: "post",
                      headers: {
                        "X-Okapi-Tenant": config[cid]["folio_tenandid"],
                        "X-Okapi-Token": tokreq,
                        "Content-Type": "application/json",
                      },
                      data: JSON.stringify(body),
                    })
                      .then(function (r) {
                        if (r.status == 201) {
                          //console.log("exito");
                          res.send(JSON.stringify("exito!!"));
                        }
                      })
                      .catch(function (e) {
                        console.log(e);
                      });
                  })
                  .catch(function (e) {
                    console.log(e);
                  });
              })
              .catch(function (e) {
                console.log(e);
              });
          })
          .catch(function (e) {
            console.log(e);
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
