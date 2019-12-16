const Chromy = require("chromy");
let chromy = new Chromy({ visible: true });
chromy
  .chain()
  .goto("https://accounts.spotify.com/en/login")
  .type("#login-username", "1111111111")
  .type("#login-password", "1111111111")
  .click("#login-button")
  .wait("#account-settings-link")
  .goto("https://open.spotify.com/album/222222222222")
  .wait(".TrackListHeader__button--bottom")
  .evaluate(() => {
    return document.querySelectorAll("button.btn.btn-green")[0].click();
  })
  .sleep(33000)
  .end()
  .then(_ => chromy.close());
