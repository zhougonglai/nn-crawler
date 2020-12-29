// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const puppeteer = require('puppeteer');

export default async (req, res) => {
	const browser = await puppeteer.launch();
	const page = await browser.newPage();
	console.log(req.query, decodeURIComponent(req.query.url));
	await page.goto(decodeURIComponent(req.query.url));
	const title = await page.title();
	const keywords = await page.$$eval('meta', (els) =>
		els.filter((e) => e.name === 'keywords').map((e) => e.content),
	);
	const description = await page.$$eval('meta', (els) =>
		els.filter((e) => e.name === 'description').map((e) => e.content),
	);
	const h1 = await page.$$eval('h1', (els) => els.map((e) => e.innerText));
	const h2 = await page.$$eval('h2', (els) => els.map((e) => e.innerText));
	const h3 = await page.$$eval('h3', (els) => els.map((e) => e.innerText));

	res.statusCode = 200;
	res.json({
		title,
		keywords,
		description,
		el: {
			h1,
			h2,
			h3,
		},
	});
};
