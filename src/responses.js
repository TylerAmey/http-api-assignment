const fs = require('fs');

const index = fs.readFileSync(`${__dirname}/../client/client.html`);
const css = fs.readFileSync(`${__dirname}/../client/style.css`);

const respond = (request, response, status, type) => {
  response.writeHead(status, { 'Content-Type': 'application/json' });
  response.write(JSON.stringify(object));
  response.end();
};

// 200
const success = (request, response) => {
  const responseJSON = {
    message: 'This is a successful response',
  };

  respond(request, response, 200, responseJSON);
};

// 400 & 200
const badRequest = (request, response, params) => {
  const responseJSON = {
    message: 'This request has the required parameters',
  };

  if (!params.valid || params.valid !== 'true') {
    responseJSON.message = 'Missing valid query parameter set to true';
    responseJSON.id = 'badRequest';
    return respond(request, response, 400, responseJSON);
  }

  return respond(request, response, 200, responseJSON);
};

// 401 & 200
const unauthorized = (request, response, params) => {
  const responseJSON = {
    message: 'This request has the required parameters',
  };

  if (!params.valid || params.valid !== 'true') {
    responseJSON.message = 'Missing loggedIn query parameter set to true';
    responseJSON.id = 'unauthorized';
    return respond(request, response, 401, responseJSON);
  }
  return respond(request, response, 200, responseJSON);
};

// 403
const forbidden = (request, response) => {
  const responseJSON = {
    message: 'Access to the requested page is forbidden',
    id: 'forbidden',
  };

  return respond(request, response, 403, responseJSON);
};

// 500
const internal = (request, response) => {
  const responseJSON = {
    message: 'Internal Server Error',
    id: 'internal',
  };

  return respond(request, response, 500, responseJSON);
};

// 501
const notImplemented = (request, response) => {
  const responseJSON = {
    message: 'Requested functionality not implemented',
    id: 'notImplemented',
  };

  return respond(request, response, 501, responseJSON);
};

// 404
const notFound = (request, response) => {
  const responseJSON = {
    message: 'The page you are looking for was not found.',
    id: 'notFound',
  };

  respond(request, response, 404, responseJSON);
};

const getIndex = (request, response) => {
  respond(request, response, index, 'text/html');
};

const getCSS = (request, response) => {
  respond(request, response, css, 'text/css');
};

module.exports = {
  success,
  badRequest,
  notFound,
  unauthorized,
  forbidden,
  internal,
  notImplemented,
  getIndex,
  getCSS,
};
