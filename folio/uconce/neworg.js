const axios = require("axios");
const config = require("./data/config.json");
const orgs = require("./data/org.json");
const getToken = require("./function/auth");
const aqunit = require("./function/aqunit");

async function uptorg() {
  let tk;
  let header;
  let body;
  let aunit;
  const url = config["test"]["folio_url"] + "organizations/organizations";
  return (
    //get the okapi token and configure the headers
    await getToken().then((res) => {
      tk = res;
      header = {
        "Content-Type": "application/json",
        "x-okapi-tenant": config["test"]["folio_tenandid"],
        "x-okapi-token": tk,
      };
    }),
    // gat the id of the acquisitions-unit and give value to the body variable
    await aqunit().then((resp) => {
      aunit = resp;
      body = {
        name: orgs["name"],
        code: orgs["code"],
        description: orgs["description"],
        status: "Active",
        language: "es-es",
        phoneNumbers: [
          {
            phoneNumber: orgs["phoneNumbers"]["phoneNumber"],
          },
        ],
        emails: [
          {
            value: orgs["emails"]["value"],
          },
        ],
        acqUnitIds: [aunit],
      };
    }),
    //Axios request to the API for creating a new organization
    await axios
      .post(url, JSON.stringify(body), { headers: header })
      .then((re) => {
        console.log(re);
      })
      .catch((err) => {
        console.log(err.response.data);
      })
  );
}

uptorg();
