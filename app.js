"strict mode";
//var LINKEDIN_OAUTH_USER_TOKEN = process.env.LINKEDIN_OAUTH_USER_TOKEN;
//var LINKEDIN_OAUTH_USER_SECRET = process.env.LINKEDIN_OAUTH_USER_SECRET;
var crypto = require('crypto');
var url = require('url');
// Third party modules
var scmp = require('scmp');
var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var methodOverride = require('method-override');
var expressSession = require('express-session');
var csurf = require('csurf');

// Own modules
var linkedin = require('lib').auth.linkedin;


// Configuration 
var debug = require('debug')('hh-api')
var port = process.env.PORT || 3000;
var LINKEDIN_API_KEY = process.env.LINKEDIN_API_KEY;
var LINKEDIN_SECRET_KEY = process.env.LINKEDIN_SECRET_KEY;
var reUrl = 'http://localhost:3000/api/auth/linkedin/callback';

// Initialization
var app = express();
//TODO: move this out of here
//This is because csurf does not check the csrf token in get requests 
function createToken(salt, secret) {
  return salt + crypto
    .createHash('sha1')
    .update(salt + secret)
    .digest('base64');
}
function checkToken(token, secret) {
  if ('string' != typeof token) return false;
  return scmp(token, createToken(token.slice(0, 10), secret));
}

app.set('port', port);

// middlewares
app.use(bodyParser());
app.use(cookieParser());
app.use(methodOverride());

app.use(expressSession({
  secret: 'random-dummy-hash-507f1adcf4e665f0e3754b22912d67f4',
  cookie: { httpOnly: true
    // secure: true
  }
}));
app.use(csurf());

//CSRF middleware to populate the token to the template vars
app.use(function(req, res, next) {
    debug('csrf middleware: ' + req.session._csrf);
    res.locals.STATE = req.session._csrf;
    next();
});

app.get('/', function(req, res, next) {
  var linkStr = linkedin.getAuthLink(LINKEDIN_API_KEY, req.csrfToken(), reUrl);
  var out = '<html><body><a href="' + linkStr + '">log in</a></body></html>';
  res.send(out);
});

app.get('/api/auth/linkedin/callback', function(req, res, next) {
  var secret = req.session.csrfSecret;
  var url_parts = url.parse(req.url, true);
  var query = url_parts.query;
  if (checkToken(query.state, secret)) {
    var self = this;
    self.res = res;
    linkedin.requestAccessToken(query.code, reUrl, LINKEDIN_API_KEY, LINKEDIN_SECRET_KEY, function(err, res, body) {
      self.res.send(body);
    });
  } else {
    var err = new Error('invalid csrf token');
    res.send(err.toString());
  }
});


app.listen(app.get('port'));

