const HOST = "https://logo.clearbit.com/";

const fs = require('fs-extra');
const https = require('http');
const username = 'domain\\username';
const password = 'password';
const HttpsProxyAgent = require('https-proxy-agent');
const request = require('request');
const proxy = 'http://proxyserver:80';
var auth = 'Basic ' + new Buffer(username + ':' + password).toString('base64');
var agent = new HttpsProxyAgent(proxy);
agent.headers = { 'Proxy-Authentication': auth };

var createOptions = function(u) {
  return {
      uri: u,
      method: "GET",
      // agent: agent,   // Use this for proxy
      timeout: 10000,
      followRedirect: true,
      maxRedirects: 10
    };
}
var download = function(options, companyname, filename){
  request(options,
    function(error, resdata, body) {
      request(options).pipe(fs.createWriteStream(filename)).on('close', function() {
        console.log(companyname + ";" + resdata.statusCode + ";" + filename);
        if (resdata.statusCode != '200') {
          fs.removeSync(filename);
        }
      });
    }
  );
};



var sites = [
["Google","https://www.google.com.sg/"],
["Yahoo","https://yahoo.com.sg/"]
];

for (var i = 0; i < sites.length; i++) {
  var domain = sites[i][1].replace(/https?\:\/\//gi,'').replace(/www\./gi, '').replace(/\/$/gi, '');
  var options = createOptions(HOST + domain);
  var filename = '.\/logo\/' + domain.replace(/[^\w\d]/gi, '_') + '.jpg';
  download(options, sites[i][0], filename);
}
