const Chromy = require("chromy");
const fs = require("fs");
var termkit = require("terminal-kit");
var term = termkit.terminal;

module.exports = socket => {
  let Ask = q => t =>
    new Promise((r, j) => {
      term("Captca");
      term.inputField({}, function (error, input) {
        return r(input);
      });
    });

  async function main() {
    let chromy = new Chromy();

    await chromy.goto("https://e-okul.meb.gov.tr/logineOkul.aspx");
    const result = await chromy.screenshotSelector("#image1");
    fs.writeFileSync("out.png", result);

    await chromy.insert("#txtKullaniciAd", "111111111");
    await chromy.insert("#txtSifre", "111111111111");
    var a = await Ask()();
    await chromy.insert("#guvenlikKontrol", a);
    await chromy.click("#btnGiris");
    await chromy.wait(
      "#ModulMenu1_TB_AnaMenu > tbody > tr:nth-child(1) > td > table > tbody > tr > td"
    );
    await chromy.click(
      "#ModulMenu1_TB_AnaMenu > tbody > tr:nth-child(1) > td > table > tbody > tr > td"
    );
    await chromy.click(
      "#OKLMenu1_TB_AnaMenu > tbody > tr:nth-child(5) > td > table:nth-child(1) > tbody > tr > td"
    );
    await chromy.click("#IOK10000 > tbody > tr:nth-child(4) > td");
    await chromy.wait("#ddlDersler");

    var sinif = await chromy.evaluate(() => {
      var s = [];
      var c = document.querySelectorAll("#ddlSinifiSubesi")[0].children;
      for (let i = 0; i < c.length; i++) {
        s.push({ id: c[i].value });
      }
      return s;
    });

    var ders = await chromy.evaluate(() => {
      var s = [];
      var c = document.querySelectorAll("#ddlDersler")[0].children;
      for (let i = 0; i < c.length; i++) {
        s.push({ id: c[i].value });
      }
      return s;
    });

    for (let i = 0; i < sinif.length; i++) {
      await chromy.goto(
        "https://e-okul.meb.gov.tr/IlkOgretim/OKL/IOK10006.aspx"
      );
      await chromy.sleep(2000);
      await chromy.wait("#ddlSinifiSubesi");

      for (let c = 0; c < ders.length - 1; c++) {
        await chromy.select("#ddlSinifiSubesi", sinif[i].id);
        await chromy.select("#ddlDersler", ders[c + 1].id);
        await chromy.click("#btnListele");
        await chromy.wait("#Ogrenci_listesi1_dgListe");
        var text = await chromy.evaluate(() => {
          return document.querySelectorAll(
            "#Ogrenci_listesi1_dgListe > tbody > tr:nth-child(2) > td:nth-child(3)"
          )[0].innerText;
        });
      }
    }
    await chromy.sleep(2000);
    await chromy.close();
    process.exit();
  }

  try {
    main();
  } catch (error) {
    process.exit();
  }
};
