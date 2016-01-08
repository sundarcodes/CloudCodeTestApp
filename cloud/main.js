
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

Parse.Cloud.afterSave("Student", function(request) {
  var user = new Parse.User();
  var parentEmail = request.object.get("parentEmail");
  user.set("username", parentEmail );
  var randomPassword = generateRandomPassword();
  user.set("password", randomPassword);
  // user.set("email", "email@example.com");
  Parse.Cloud.useMasterKey();
  user.signUp(, {
    success: function(user) {
      // Hooray! Let them use the app now.
      // Send them a email
      console.log("User successfully created");
      var emailBody = "Dear Parent,\n Congratulations. You have successfully registered for the skoolApp. Your username is "+parentEmail+" and password is "+randomPassword;
      sendMail(parentEmail,"yourFriend@skoopApp.com","Successful Registration",emailBody);
    },
    error: function(user, error) {
      // Show the error message somewhere and let the user try again.
      console.log("Error: " + error.code + " " + error.message);
    }
  });

});

generateRandomPassword = function(){
  return "password";
}

sendMail = function(toUser,fromUser,emailSubject,emailBody) {
  var Mailgun = require('mailgun');
	Mailgun.initialize('sandboxdc19f76f0daa463c9a2ff5eb0a5f0975.mailgun.org', 'key-5d9487f0c64aad70b2155562eb91b613');
	Mailgun.sendEmail({
	  to: toUser,
	  from: fromUser,
	  subject: emailSubject,
	  text: emailBody
	}, {
	  success: function(httpResponse) {
	    console.log(httpResponse);
	    console.log("Email sent! to :"+ toUser);
	  },
	  error: function(httpResponse) {
	    console.error(httpResponse);
	    console.log("Uh oh, something went wrong");
	  }
	});
}
