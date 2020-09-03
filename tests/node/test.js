const axios = require("axios");
const config = require("./config.json");
const biblo = require("./biblio.json");

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

async function ness() {
  let men;
  const bibdata = {
    source: "FOLIO",
    title: biblo["title"],
    contributors: [
      {
        name: biblo["author"],
        contributorTypeId: "6e09d47d-95e2-4d8a-831b-f777b8ef6d81",
        contributorNameTypeId: "2b94c631-fca9-4892-a730-03ee529ffe2a",
        primary: true,
      },
    ],
    identifiers: [
      {
        identifierTypeId: "8261054f-be78-422d-bd51-4ed9f33c3422",
        value: biblo["ISBN"],
      },
    ],
    instanceTypeId: "6312d172-f0cf-40f6-b27d-9fa8feaf332f",
    notes: [
      {
        instanceNoteTypeId: "6a2533a7-4de2-4e64-8466-074c2fa9308c",
        note: biblo["coments"],
        staffOnly: true,
      },
    ],
    tags: {
      tagList: ["ill-pending"],
    },
  };
  //console.log(bibdata);
  return await getToken()
    .then(function (result) {
      men = result;
    })
    .then(function () {
      axios({
        url:
          config["folio_url"] +
          "inventory/instances?limit=30&query=keyword all '" +
          biblo["ISBN"] +
          "'",
        method: "get",
        headers: {
          "X-Okapi-Tenant": config["folio_tenandid"],
          "X-Okapi-Token": men,
        },
      })
        .then(function (res) {
          if (res.data.totalRecords != 0) {
            console.log(res.data);
          } else {
            axios({
              url: config["folio_url"] + "instance-storage/instances",
              method: "post",
              headers: {
                "X-Okapi-Tenant": config["folio_tenandid"],
                "X-Okapi-Token": men,
                "Content-Type": "application/json",
              },
              data: bibdata,
            }).then(function (response) {
              console.log(response);
            });
          }
        })
        .catch(function (err) {
          console.log(err);
        });
    })
    .catch(function (error) {
      console.log(error);
    });
}

ness();
