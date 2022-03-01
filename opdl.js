const url = 'https://ianime-fr.com/voir-one-piece-episode-1-vostfr/'

//C:\Program Files\Google\Chrome\Application\chrome.exe

const puppeteer = require('puppeteer-core');

(async () => {
  const browser = await puppeteer.launch({product : 'C:\Program Files\Google\Chrome\Application', headless: false});
  const page = await browser.newPage();
  await page.goto(url);
  await page.click('#videooverlay')
  //await page.screenshot({ path: 'example.png' });
  //videooverlay -> click ?
  //olvideo_html5_api -> save


  //await browser.close();
})();