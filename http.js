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
  let path = "./views/";
  switch (request.url) {
    case "/":
      path += "./index.html";
      myEmitter.emit("route", path);
      routes.home(path, response);
      console.log('Home page displayed')
      break;
    case "/about":
      path += "./about.html";
      myEmitter.emit("route", path);
      routes.about(path, response);
      console.log('About page displayed')
      break;
    case "/ourTeam":
      path += "./ourTeam.html";
      myEmitter.emit("route", path);
      routes.ourTeam(path, response);
      console.log('Our team page displayed')
      break;
    case "/moreInfo":
      path += "./moreInfo.html";
      myEmitter.emit("route", path);
      routes.moreInfo(path, response);
      console.log('More information page displayed')
      break;
    case "/services":
      path += "./services.html";
      myEmitter.emit("route", path);
      routes.services(path, response);
      console.log('Services page displayed')
      break;
    case "/contactUs":
      path += "./contactUs.html";
      myEmitter.emit("route", path);
      routes.contactUs(path, response);
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
