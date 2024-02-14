// Written by Ashley Colbert
// Written on February 14, 2024

const http = require("http");
// const path = require("path");
// const fs = require("fs");
const routes = require("./route.js");
const winston = require('winston');

//Event emitter created
const EventEmitter = require("events");
class MyEmitter extends EventEmitter {}
const myEmitter = new MyEmitter();

global.DEBUG = true;

//MyEmitter created to print to the console and combined.log file everytime a page is accessed.
myEmitter.on('route', (url, page, code, error) => {
  const date = new Date();
  if(DEBUG) console.log(`${page} page located at ${url} visited, status code ${code} at ${date}`);
  logger.info(`${page} page located at ${url} visited`);
});

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


//server created with several routes linked to 6 html pages, located in the views subfolder.
const httpServer = http.createServer(async (request, response) => {
  if (DEBUG) console.log("Request URL: ", request.url);
  let filePath = "./views/";
  switch (request.url) {
    case "/":
      filePath += "./index.html";
      myEmitter.emit("route", filePath, 'Home', 200);
      routes.about(filePath, response);
      break;
    case "/about":
      filePath += "./about.html";
      myEmitter.emit("route", filePath, 'About');
      routes.about(filePath, response);
      break;
    case "/ourTeam":
      filePath += "./ourTeam.html";
      myEmitter.emit("route", filePath, 'Our Team');
      routes.ourTeam(filePath, response);
      break;
    case "/moreInfo":
      filePath += "./moreInfo.html";
      myEmitter.emit("route", filePath, 'More Information');
      routes.moreInfo(filePath, response);
      break;
    case "/services":
      filePath += "./services.html";
      myEmitter.emit("route", filePath, 'Services');
      routes.services(filePath, response);
      break;
    case "/contactUs":
      filePath += "./contactUs.html";
      myEmitter.emit("route", filePath, 'Contact Us');
      routes.contactUs(filePath, response);
      break;
//styles.css added as a route, each html page can now access the style sheet from the public folder.
    case "/styles.css":
      filePath += "../public/styles.css";
      routes.css(filePath, response);
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

