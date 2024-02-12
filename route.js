// Written by Ashley Colbert
// Written on February 14, 2024

const fs = require("fs");
const winston = require("winston")

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


function css(path, response) {
  fs.readFile(path, function(error, content) {
    if(error) {
      console.log("Error reading CSS")
      response.writeHead(500, {'Content-Type': 'text/plain'});
      response.end('500 Internal Server Error');
      logger.error('500 Internal Server Error')
    } else {
      response.writeHead(200, {'Content-Type': 'text/css'});
      response.end(content, 'utf-8');
    }
  });
}

function fetch(file, response) {
  fs.readFile(file, (error, content) => {
    if(error) {
      console.log("Error reading file")
      response.writeHead(500, {'Content-Type': 'text/plain'});
      response.end('500 Internal Server Error');
      logger.error('500 Internal Server Error')

    } else {
      response.writeHead(200, { 'Content-Type': 'text/html'});
      response.end(content, 'utf-8');
    }
  });
};

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

  module.exports = {
    home,
    about,
    ourTeam,
    moreInfo,
    contactUs,
    services,
    css,
    logger
  }
