const puppeteer = require("puppeteer");

module.exports.getTimeStories = async (req, res, next) => {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto("https://time.com/");

    const rightCol = await page.evaluate(() => {
      return Array.from(document.querySelectorAll(".latest-stories__item")).map(
        (x) => x.textContent
      );
    });
    
    const hrefs = await page.$$eval(".latest-stories__item>a", (list) =>
      list.map((elm) => elm.href)
    );

    let latestStories = [];

    rightCol.map((name, index) => {
      let splitData = name.split("\n");
      let obj = {
        title: splitData[2].trim(),
        link: hrefs[index],
      };
      latestStories.push(obj);
    });
    await browser.close();
    return res.success("FETCHED_SUCCESSFULLY", latestStories);
  } catch (error) {
    next(error);
  }
};
