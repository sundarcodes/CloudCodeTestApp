
// Use Parse.Cloud.define to define as many cloud functions as you want.
// For example:
Parse.Cloud.define("hello", function(request, response) {
  response.success("Hello world!..its superb");
});

Parse.Cloud.define("sendTestMail", function(request,response) {
    var Mailgun = require('mailgun');
	Mailgun.initialize('sandboxdc19f76f0daa463c9a2ff5eb0a5f0975.mailgun.org', 'key-5d9487f0c64aad70b2155562eb91b613');
	Mailgun.sendEmail({
	  to: "sundar82@gmail.com",
	  from: "sam@testMail.com",
	  subject: "Hello from Mail Gun!",
	  text: "Using Parse and Mailgun is super fun!"
	}, {
	  success: function(httpResponse) {
	    console.log(httpResponse);
	    response.success("Email sent!");
	  },
	  error: function(httpResponse) {
	    console.error(httpResponse);
	    response.error("Uh oh, something went wrong");
	  }
	});
});