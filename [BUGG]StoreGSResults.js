const puppeteer = require('puppeteer');

async function StoreResult (TEXT){
  const browser = await puppeteer.launch({headless:false});
  const page = await browser.newPage();
  await page.goto('https://google.com');
  const input = await page.$(
      "body > div.L3eUgb > div.o3j99.ikrT4e.om7nvf > form > div:nth-child(1) > div.A8SBwf > div.RNNXgb > div > div.a4bIc > input"
  );
    await input.type(TEXT,{delay:100});
    await page.keyboard.press("Enter");
    await page.waitForSelector(".g");
    const result = await page.evaluate(()=>{
        const results=document.querySelectorAll(".g");
        const temp=[];
        results.forEach(items => {
          // BUGG - skip the 1st node because it is stoping loop       [cant make logic]
         /// console.log(items);
            let item={
                heading:items.querySelector(".g h3").innerHTML
            };
            temp.push(item);
        });
        return temp;
    });
    require("fs").write("data.json",JSON.stringify(result),()=>{});
    browser.close();
}

StoreResult("I am automated");
