var request = require('request');
var Linkedin =  {
  getAuthLink : function(apiKey, csrfToken, redirectUrl) {
    var linkStr = 'https://www.linkedin.com/uas/oauth2/authorization?response_type=code&client_id=' + apiKey;
    linkStr += '&scope=r_basicprofile%20r_emailaddress%20r_network';
    linkStr += '&state=' + csrfToken;
    linkStr += '&redirect_uri='+redirectUrl;
    return linkStr;
  },
  requestAccessToken : function(authCode, redirectUrl, apiKey, secretKey, cb) {
    var url = 'https://www.linkedin.com/uas/oauth2/accessToken?';
    url+= 'grant_type=authorization_code';
    url+= '&code=' + authCode;
    url+= '&redirect_uri='+redirectUrl;
    url+= '&client_id='+apiKey;
    url+= '&client_secret='+secretKey;
    console.log(url);
    request(url, function(err, res, body) {
        cb(err,res, body);
    });
  },
  getContactList:  function(token, cb) {
    var url = 'https://api.linkedin.com/v1/people/~/connections?oauth2_access_token=' + token;
      request(url, function(err, res, body) {
        cb(err, body);
      });
  }
}
module.exports = Linkedin;
