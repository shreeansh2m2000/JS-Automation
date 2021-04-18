const puppeteer = require('puppeteer');

async function StoreResult(TEXT) {
    const browser = await puppeteer.launch({
        headless: false
    });
    const page = await browser.newPage();
    await page.goto('https://www.imdb.com/chart/top');
    await page.waitForSelector(".lister-list");
    const result = await page.evaluate(() => {
        const results = document.querySelectorAll(".titleColumn");
        console.log("No of results");
        console.log(results.length);
        const temp = [];
        results.forEach(items => {

            console.log(items.querySelector("a").innerHTML);
            let item = {
                name: items.querySelector("a").innerHTML
            };
            temp.push(item);
        });
        console.log("OUT");
        return temp;
    });
    console.log(result);
    browser.close();
}

StoreResult();