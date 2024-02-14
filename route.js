// Written by Ashley Colbert
// Written on February 14, 2024

const fs = require("fs");
const winston = require("winston")

//Each route uses the fetch function(below) to to fetch the html file needed to run each page.
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

//css file added here and exported at the bottom on page, to be added as a route to the server giving all html pages access.(I could not find a way to do this without adding it as a route.)
function css(path, response) {
  fs.readFile(path, function(error, content) {
    if(error) {
      console.log("Error reading CSS")
      response.writeHead(500, {'Content-Type': 'text/plain'});
      response.end('500 Internal Server Error');
      //errors will be logged to the error.log file created by the winston npm.
      logger.error('500 Internal Server Error')
    } else {
      response.writeHead(200, {'Content-Type': 'text/css'});
      response.end(content, 'utf-8');
    }
  });
}

//fetch function used to fetch the files for each route. The fs global object is used to read each file.
function fetch(file, response) {
  fs.readFile(file, (error, content) => {
    if(error) {
      console.log("Error reading file")
      response.writeHead(500, {'Content-Type': 'text/plain'});
      response.end('500 Internal Server Error');
      //errors will be logged to the error.log file created by the winston npm.
      logger.error('500 Internal Server Error')

    } else {
      response.writeHead(200, { 'Content-Type': 'text/html'});
      response.end(content, 'utf-8');
    }
  });
};

//winston logger function added here to log any internal server errors that occur on this page. Note, it is used more extensively on the http.js page in conjunction with myEmitter.
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


//all routes are exported from this page to be used in the http page when creating a server.
  module.exports = {
    home,
    about,
    ourTeam,
    moreInfo,
    contactUs,
    services,
    css,
  }
