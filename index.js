const { send } = require('micro');
const url = require('url');

module.exports = function (request, response) {
  const { path } = url.parse(request.url);
  console.log(path);
  if ("/1" === path)
    send(response, 200, '1 Hello World!');
  if ("/2" === path)
    send(response, 200, '2 Hello World!');
};