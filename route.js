// Written by Ashley Colbert
// Written on February 14, 2024

const fs = require("fs");

function home(path, response) {
  fetch (path, response)
}

function about(path, response) {
  fetch (path, response)
}

function ourTeam(path, response) {
  fetch (path, response)
}

function moreInfo(path, response) {
  fetch (path, response)
}

function services(path, response) {
  fetch (path, response)
}

function contactUs(path, response) {
  fetch (path, response)
}

function fetch(file, response) {
  fs.readFile(file, (error, content) => {
    if(error) {
      console.log("Error reading file")
      response.writeHead(500, {'Content-Type': 'text/plain'});
      response.end('500 Internal Server Error');
    } else {
      response.writeHead(200, { 'Content-Type': 'text/html'});
      response.end(content, 'utf-8');
    }
  });
}
  module.exports = {
    home,
    about,
    ourTeam,
    moreInfo,
    contactUs,
    services
  }