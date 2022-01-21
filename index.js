// helper to sleep periodically during execution 
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

//Run the app as an async function so we can use await calls for promises 
(async function () {
    const webdriver = require('selenium-webdriver');
    const By = require('selenium-webdriver').By,
        until = require('selenium-webdriver').until;
    const driver = new webdriver.Builder().forBrowser(webdriver.Browser.CHROME).build();
    const { Key } = require('selenium-webdriver');

    console.log("Starting tests");

    driver.navigate().to("https://www.google.com/");

    await sleep(2000);

    driver.findElement(By.name("q")).sendKeys('selenium');
    driver.findElement(By.name("q")).sendKeys(webdriver.Key.ENTER);

    await sleep(2000);

    // Now look for the # of results 
    let ele = await driver.wait(until.elementLocated(By.id('result-stats')), 10000);
    let results = await ele.getText();

    console.log(`Results: ${results}`);

    driver.quit();
}()); 