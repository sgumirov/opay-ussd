const { send } = require('micro');
const parse = require('urlencoded-body-parser')
const url = require('url');
var http = require('http');
var fs = require('fs');
const dir = "opay955";
const session = require('micro-cookie-session')({
  name: 'session',
  keys: ['someverystringsecretstring1'],
  maxAge: 24 * 60 * 60 * 1000
})
var files = fs.readdirSync(dir);

console.log("Serving files:\n"+files)

var last = {};

function parseCookies (request) {
    var list = {},
        rc = request.headers.cookie;
    rc && rc.split(';').forEach(function( cookie ) {
        var parts = cookie.split('=');
        list[parts.shift().trim()] = decodeURI(parts.join('='));
    });

    return list;
}

function serveFile(res, abon, filename) {
  var mimeType = "text/html";
  res.writeHead(200, mimeType);
  var fileStream = fs.createReadStream(filename);
  fileStream.pipe(res);
  last[abon] = filename;
  console.log("last["+abon+"]="+filename);
}

module.exports = async function (req, res) {
  try {
    const { path } = url.parse(req.url);
    var query = url.parse(req.url, true).query;
    console.log(req.headers);
    var abon = query.abonent;

    // enable session storage in cookie 
    session(req, res);
    req.session.abon = abon

    for (i = 0; i < files.length; i++) {
      if (path.includes("/"+files[i])) {
        serveFile(res, abon, dir+"/"+files[i]);
        return;
      }
    }
  } catch (err) {
    console.log(err);
    send(res, 500)
  }
};
