"strict mode";
var LINKEDIN_API_KEY = process.env.LINKEDIN_API_KEY;
var LINKEDIN_SECRET_KEY = process.env.LINKEDIN_SECRET_KEY;
var LINKEDIN_OAUTH_USER_TOKEN = process.env.LINKEDIN_OAUTH_USER_TOKEN;
var LINKEDIN_OAUTH_USER_SECRET = process.env.LINKEDIN_OAUTH_USER_SECRET;

var express = require('express');
var hbs = require('hbs');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var methodOverride = require('method-override');
var expressSession = require('express-session');
var csurf = require('csurf');

var app = express();
var port = process.env.PORT || 3000;
app.set('port', port);
//view stuff
app.set('views', __dirname);
app.set('view engine', 'html');
app.engine('html', hbs.__express);

//middlewares
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
    res.locals.STATE = req.session._csrf;
    next();
});

app.get('/', function(req, res, next) {
  debugger;
  var linkStr = 'https://www.linkedin.com/uas/oauth2/authorization?response_type=code&client_id=' + LINKEDIN_API_KEY;
    linkStr += '&scope=r_emailaddress%20r_emailaddress%20rw_groups';
    linkStr += '&state=' + req.csrfToken();
    linkStr += '&redirect_uri=http://localhost/api/auth/linkedin/callback';
  var out = '<html><body><a href="' + linkStr + '">log in</a></body></html>';
  res.send(out);
});
app.get('/api/auth/linkedin/callback', function() {

});

app.listen(app.get('port'));

