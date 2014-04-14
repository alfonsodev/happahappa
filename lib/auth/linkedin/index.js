var request = require('request');
var Linkedin =  {
  
  getAuthLink : function(apiKey, csrfToken) {
    var linkStr = 'https://www.linkedin.com/uas/oauth2/authorization?response_type=code&client_id=' + apiKey;
    linkStr += '&scope=r_emailaddress%20r_emailaddress%20rw_groups';
    linkStr += '&state=' + csrfToken;
    linkStr += '&redirect_uri=http://localhost/api/auth/linkedin/callback';
    return linkStr;
  }
  requestAccessToken : function(authCode, redirectUrl, apiKey, secretKey) {
    var url = 'https://www.linkedin.com/uas/oauth2/accessToken?';
    url+= 'grant_type=authorization_code;
    url+= '&code=AUTHORIZATION_CODE';
    url+= '&redirect_uri=YOUR_REDIRECT_URI';
    url+= '&client_id=YOUR_API_KEY';
    url+= '&client_secret=YOUR_SECRET_KEY';
    request(url, function(err, res, body){

    });
  }
}

module.exports = Linkedin;
