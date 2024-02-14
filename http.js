// Written by Ashley Colbert
// Written on February 14, 2024

const http = require("http");
const path = require("path");
const fs = require("fs");
const routes = require("./route.js");
const news = require('gnews');
const winston = require('winston');

//Event emitter created
const EventEmitter = require("events");
class MyEmitter extends EventEmitter {}
const myEmitter = new MyEmitter();

//NPM package winston installed to handle error and info logging.
const logger = winston.createLogger({
  level: 'info',
  format:winston.format.combine(
    winston.format.timestamp({
      format: 'MM-DD-YYYY HH:mm:ss'
    }),
    winston.format.json(),
    ),
  transports: [
  new winston.transports.File({filename: 'error.log', level: 'error'}),
  new winston.transports.File({filename: 'combined.log'}),
  ],
});

global.DEBUG = true;

const httpServer = http.createServer(async (request, response) => {
  if (DEBUG) console.log("Request URL: ", request.url);
  let filePath = "./views/";
  switch (request.url) {
    case "/":
      try {
        const search = await news.search('Busniess in Newfoundland', {n : 5});
        let htmlNews = '<h3>Today\'s Top Business Headlines in Newfoundland and Labrador</h3><ul>';
          search.forEach(article => {
            htmlNews += `<li> <a href="${article.url}">${article.title}</a></li>`;
          });
        
        filePath = path.join(filePath, "index.html");
        fs.readFile(filePath, 'utf8', (err, html) => {
          if(err) {
            logger.error('Error reading index.html');
            response.writeHead(500);
            return response.end('Error loading page');
          }
          const insertHtml = html.replace ('place news here', htmlNews)
            response.writeHead(200, {'Content-Type': 'text/html'});
            response.end(insertHtml); });
      } catch (error) {
        logger.error('Error fetching news')
        response.writeHead(500, { 'Content-Type': 'text/plain' });
        response.end("An error occurred, unable to fetch news articles.");
      }
      break;
    case "/about":
      filePath += "./about.html";
      myEmitter.emit("route", path);
      routes.about(filePath, response);
      console.log('About page displayed')
      logger.info('About page displayed')
      break;
    case "/ourTeam":
      filePath += "./ourTeam.html";
      myEmitter.emit("route", path);
      routes.ourTeam(filePath, response);
      console.log('Our team page displayed')
      logger.info('Our team page displayed')
      break;
    case "/moreInfo":
      filePath += "./moreInfo.html";
      myEmitter.emit("route", path);
      routes.moreInfo(filePath, response);
      console.log('More information page displayed')
      logger.info('More information page displayed')
      break;
    case "/services":
      filePath += "./services.html";
      myEmitter.emit("route", path);
      routes.services(filePath, response);
      console.log('Services page displayed')
      logger.info('Services page displayed')
      break;
    case "/contactUs":
      filePath += "./contactUs.html";
      myEmitter.emit("route", path);
      routes.contactUs(filePath, response);
      console.log('Contact page displayed');
      logger.info('Contact Us page started')
      break;
    case "/styles.css":
      filePath += "../public/styles.css";
      myEmitter.emit("route", path);
      routes.css(filePath, response);
      console.log('CSS file accessed')
      break;
    default:
      if(DEBUG) console.log('404 Page Not Found');
      logger.error('404 Page Not Found')
      response.writeHead(404, { 'Content-Type': 'text/plain'});
      response.end('404 Page Not Found');
    }
  });
httpServer.listen(3000, () => {
  console.log('Server is running on local host 3000');
  logger.info('Server started')
})

