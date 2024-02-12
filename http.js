// Written by Ashley Colbert
// Written on February 14, 2024

const http = require("http");
const path = require("path");
const fs = require("fs");
const routes = require("./route.js");
const EventEmitter = require("events");
class MyEmitter extends EventEmitter {}
const myEmitter = new MyEmitter();

global.DEBUG = true;

const httpServer = http.createServer((request, response) => {
  if (DEBUG) console.log("Request URL: ", request.url);
  let filePath = "./views/";
  switch (request.url) {
    case "/styles.css":
      filePath += "../public/styles.css";
      myEmitter.emit("route", path);
      routes.css(filePath, response);
      console.log('CSS file accessed')
      break;
    case "/":
      filePath += "./index.html";
      myEmitter.emit("route", path);
      routes.home(filePath, response);
      console.log('Home page displayed')
      break;
    case "/about":
      filePath += "./about.html";
      myEmitter.emit("route", path);
      routes.about(filePath, response);
      console.log('About page displayed')
      break;
    case "/ourTeam":
      filePath += "./ourTeam.html";
      myEmitter.emit("route", path);
      routes.ourTeam(filePath, response);
      console.log('Our team page displayed')
      break;
    case "/moreInfo":
      filePath += "./moreInfo.html";
      myEmitter.emit("route", path);
      routes.moreInfo(filePath, response);
      console.log('More information page displayed')
      break;
    case "/services":
      filePath += "./services.html";
      myEmitter.emit("route", path);
      routes.services(filePath, response);
      console.log('Services page displayed')
      break;
    case "/contactUs":
      filePath += "./contactUs.html";
      myEmitter.emit("route", path);
      routes.contactUs(filePath, response);
      console.log('Contact page displayed');
      break;
    default:
      if(DEBUG) console.log('404 Page Not Found');
      response.writeHead(404, { 'Content-Type': 'text/plain'});
      response.end('404 Page Not Found');
  }
});

httpServer.listen(3000, () => {
  console.log('Server is running on local host 3000');
})