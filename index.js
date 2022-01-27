const puppeteer = require('puppeteer');
const qoa = require('qoa');
const {log} = console;
const input = {
    type: 'input',
    query: 'Entrer le titre du film que vous voulez rechercher',
    handle: 'movie'
}
qoa.prompt([input]).then(searchMovie);

function searchMovie(movie) {
    puppeteer.launch({headless: false}).then(async browser => {
        const page = await browser.newPage();
        await page.goto(`https://www.imdb.com/`, {waitUntil: 'networkidle2'});

        const searchInput = await page.$('#suggestion-search');
        await searchInput.click();
        await searchInput.type(JSON.stringify(movie.movie));

        await page.waitForTimeout(5000);

        const searchButton = await page.$('#iconContext-magnify');
        await searchButton.click();

        console.log('searching...');

        await page.waitForTimeout(5000);

        let elements = await page.$$('table.findList tr');
        let movies = []
        for (let i = 0; i <= movies.length; i++) {
            let element = elements[i];
            let title = await element.$eval('a', el => el.innerText);
            console.log(title);
            movies.push(elements[i]);
            //TODO : add titles to array
        }
        //TODO : display movies

        await page.waitForTimeout(5000);
    });
}