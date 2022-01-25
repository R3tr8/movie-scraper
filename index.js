const puppeteer = require('puppeteer');
const mouth = '03';
const year = 2022;

(async () => {
    const browser = await puppeteer.launch({headless: true});
    const page = await browser.newPage();
    await page.goto(`https://www.imdb.com/movies-coming-soon/${year}-${mouth}/`);
    const movies = await page.evaluate(() => {
        let elements = document.querySelectorAll('div.list_item');
        let movies = [];
        for (let element of elements) {
            movies.push({
                title: element.querySelector('td.overview-top a').text.trim(),
                img: element.querySelector('img').src,
                director:element.querySelector('div.txt-block a').text.trim(),
                description: element.querySelector('div.outline').textContent.trim(),
            });
        }
        return movies;
    });
    console.log(movies);
    await browser.close();
})();