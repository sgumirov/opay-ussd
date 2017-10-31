const { send } = require('micro');
const parse = require('urlencoded-body-parser')
const url = require('url');
var http = require('http');

function parseCookies (request) {
    var list = {},
        rc = request.headers.cookie;

    rc && rc.split(';').forEach(function( cookie ) {
        var parts = cookie.split('=');
        list[parts.shift().trim()] = decodeURI(parts.join('='));
    });

    return list;
}

module.exports = async function (req, res) {
  console.log(req.headers);
  console.log(parseCookies(req));
  console.log(parseCookies(req).Session);
  const { path } = url.parse(req.url);
  console.log(path);
  const data = await parse(req);
  console.log(data);
  if ("/1" === path)
    send(res, 200, '1 Hello World!');
  if ("/2" === path)
    send(res, 200, '2 Hello World!');
};