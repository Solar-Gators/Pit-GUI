import * as http from 'http';
import * as url from 'url';

var app = require('./config/app');
var server = app.start();


//BMS request handler
const requestHandler = (request, response) => {
    //Parse URL
    const parsedUrl = url.parse(request.url);
    let pathN = parsedUrl.pathname;

    //For debugging; display the path submitted on console
    console.log(pathN);

    //if the path name is api/bms
    if(pathN == '/api/bms')
    {
        response.writeHead(200, {'Content-Type': 'application/json'});
        return response.end();
    } 
    else{
        // else submit a 404 error and write that to the webpage
        response.writeHead(404, {'Content-Type': 'text/html'});
        return response.end("Bad gateway error");
    }
  
      
  };