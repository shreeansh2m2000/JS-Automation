const puppeteer = require('puppeteer');

async function StoreResult(TEXT) {
    const browser = await puppeteer.launch({
        headless: false
    });
    const page = await browser.newPage();
    await page.goto('https://google.com');
    const input = await page.$(
        "body > div.L3eUgb > div.o3j99.ikrT4e.om7nvf > form > div:nth-child(1) > div.A8SBwf > div.RNNXgb > div > div.a4bIc > input"
    );
    await input.type(TEXT, {
        delay: 100
    });
    await page.keyboard.press("Enter");
    await page.waitForSelector(".g");
    const result = await page.evaluate(() => {
        const results = document.querySelectorAll(".g");

        console.log(results); //
        console.log(results.length); //
        const temp = [];
        results.forEach(items => {
            if (items.classList.length == 1) {
                let item = {
                    heading: items.querySelector(".g h3").innerHTML
                };
                temp.push(item);
            } else {
                console.log("Item not Valid", items)
            }
        });
        return temp;
    });
    console.log(result);
    // browser.close();
}

StoreResult("I am automated");