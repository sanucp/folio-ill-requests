const axios = require("axios");
const config = require("./data/config.json");
const orgs = require("./data/org.json");
const getToken = require("./function/authtk");

async function uptorg() {
  let tk;
  let header;
  let body;
  const url = config["game"]["folio_url"] + "organizations/organizations";
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
  };
  return (
    await getToken().then((res) => {
      tk = res;
      header = {
        "Content-Type": "application/json",
        "x-okapi-tenant": config["game"]["folio_tenandid"],
        "x-okapi-token": tk,
      };
    }),
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
