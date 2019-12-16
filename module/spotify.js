const Chromy = require("chromy");
const fs = require("fs");

module.exports = socket => {
  async function main() {
    let chromy = new Chromy();
    await chromy.goto("https://accounts.spotify.com/en/login");
    let result;
    result = await chromy.screenshotDocument();
    fs.writeFileSync("out.png", result);

    await chromy.insert("#login-username", "111111111");
    await chromy.insert("#login-password", "1111111111");
    await chromy.sleep(2000);
    await chromy.click("#login-button");
    result = await chromy.screenshotDocument();
    fs.writeFileSync("out.png", result);

    await chromy.wait("#account-settings-link");
    result = await chromy.screenshotDocument();
    fs.writeFileSync("out.png", result);

    await chromy.sleep(20000);
    await chromy.close();
    process.exit();
  }

  try {
    main();
  } catch (error) {
    console.log(error);
    process.exit();
  }
};
