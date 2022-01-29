const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({headless: true});
    const page = await browser.newPage();
    await page.goto(`https://www.imdb.com/movies-coming-soon/`);
    const movies = await page.evaluate(() => {
        let elements = document.querySelectorAll('div.list_item');
        let movies = [];
        for (let element of elements) {
            movies.push({
                title: element.querySelector('td.overview-top a').text.trim(),
                director:element.querySelector('div.txt-block a').text.trim(),
                description: element.querySelector('div.outline').textContent.trim(),
                url: element.querySelector('td.overview-top a').href
            });

        }
        return movies;
    });
    console.log(movies);
    await browser.close();
})();
