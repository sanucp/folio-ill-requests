const schedule = require("node-schedule");
const config = require("./data/config.json");
const auth = require("./function/auth");

const job = schedule.scheduleJob("* */1 * * * *", function () {
  config.forEach((element) => {
    if (element.name === "test") {
      auth()
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  });
});

job;
