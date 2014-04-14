var assert = require('assert');
var linkedin = require('lib').auth.linkedin;
var request = require('request');

describe('linkedin auth testing', function(){

  it('should generate a valid link', function(done) {
    var apiKey = process.env.LINKEDIN_API_KEY;
    var csrfToken = 'ljslfasf230234923fsdfsf';
    var link = linkedin.getAuthLink(apiKey, csrfToken);
    request(link, function (error, res, body) {
      assert.equal(res.statusCode, 200);
      done();
    });
  });

  it('should throw an eception if missing arguments', function() {
    
  });
});


