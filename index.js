const { send } = require('micro');
const parse = require('urlencoded-body-parser')
const url = require('url');
var http = require('http');
var fs = require('fs');
// initiallise session
const session = require('micro-cookie-session')({
  name: 'session',
  keys: ['someverystringsecretstring'],
  maxAge: 24 * 60 * 60 * 1000
})

var files = ["index.xml", "airtime.xml", "fixed-amount.xml", "custom-amount.xml", "mpesa.xml", "payment.xml", "todo.xml"];
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
//  send(res, 200, fileStream);
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

    //user is back to finish payment
    if (last[abon]==="src/mpesa.xml") {
      serveFile(res, abon, "src/transaction-success.xml");
      return;
    }

    for (i = 0; i < files.length; i++) {
      if (path.includes(files[i])) {
        serveFile(res, abon, "src/"+files[i]);
        return;
      }
    }
  } catch (err) {
    console.log(err);
    send(res, 500)
  }
};
