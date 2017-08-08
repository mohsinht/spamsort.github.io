  firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
     window.location = "../verify";
  }
});


var register=function(){
  var email = document.getElementById("inEmail").value;
  var name = document.getElementById("inName").value;
  var pass = document.getElementById("inPass").value;
  var tob = document.getElementById("inTob").value;
  var cname = document.getElementById("inCoName").value;
  var cadd = document.getElementById("inCoAdd").value;
  var cweb = document.getElementById("inCoWeb").value;
  var text = document.getElementById("info").value;
  var response = grecaptcha.getResponse();
  if(!(isAlphaNumeric(name) && isAlphaNumeric(email) && isAlphaNumeric(tob) && isAlphaNumeric(cname) && isAlphaNumeric(cadd) && isAlphaNumeric(cweb))){
    document.getElementById("errormsg").innerHTML = "<div style=\"color:red\">You've entered invalid characters</div>";
    return;
  }
  if(name===""){
    document.getElementById("errormsg").innerHTML = "<div style=\"color:red\">Your Name cannot be empty</div>";
    return;
  }
  if(pass===""){
    document.getElementById("errormsg").innerHTML = "<div style=\"color:red\">You must enter a password</div>";
    return;
  }
  if(pass.length<6){
    document.getElementById("errormsg").innerHTML = "<div style=\"color:red\">Password must have atleast 6 characters</div>";
    return;
  }
  if(email===""){
    document.getElementById("errormsg").innerHTML = "<div style=\"color:red\">Your email cannot be empty</div>";
    return;
  }
  if(!validateEmail(email)){
    document.getElementById("errormsg").innerHTML = "<div style=\"color:red\">Email address is badly formatted.</div>";
    return;
  }
  if(tob===""){
    document.getElementById("errormsg").innerHTML = "<div style=\"color:red\">Your Type of Business cannot be empty</div>";
    return;
  }
  if(text===""){
    document.getElementById("errormsg").innerHTML = "<div style=\"color:red\">Detail message cannot be empty</div>";
    return;
  }
  if(text.length<20){
    document.getElementById("errormsg").innerHTML = "<div style=\"color:red\">Detail message must have at least 20 characters. Elaborate the reason to create an account</div>";
    return;
  }
  if(response.length == 0){
    document.getElementById("errormsg").innerHTML = "<div style=\"color:red\">You haven't completed the captcha</div>";
    return;
 }

firebase.auth().createUserWithEmailAndPassword(email, pass).catch(function(error) {
  // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;

      document.getElementById("errormsg").innerHTML = errorMessage;
      console.log(errorMessage);
      console.log(errorCode);
      if(error){
        return;
      }
  // ...
  });

  var dbRef = new Firebase('https://friendlychat-c4e05.firebaseio.com/');
  var profRef = dbRef.child('profiles');
  profRef.push({
    name: name,
    email: email,
    companyAddress: cadd,
    companyName: cname,
    companyWeb: cweb,
    tobs: tob,
    info: text,
    num: 0,
    verified: false
  });

  firebase.auth().signOut().then(function() {
    //alert("Signed out");
  }).catch(function(error) {
    alert(error.message);
  });

  setTimeout(function() {
  window.location = "../verify";
}, 3000);
  document.getElementById("errormsg").innerHTML = "<div style=\"color:green\">Thank you!, your information has been received and saved. You'll be emailed to " + email + " when your account is accepted.</div>";
}


var login = function(){

  var logEmail = document.getElementById("logEmail").value;
  var logPass = document.getElementById("logPass").value;
  firebase.auth().signInWithEmailAndPassword(logEmail, logPass).catch(function(error) {
    // Handle Errors here.  
    var errorCode = error.code;
    var errorMessage = error.message;
    document.getElementById("errormsg2").innerHTML = errorMessage;
        console.log(errorMessage);
        console.log(errorCode);

    // ...
  });
  firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
          document.getElementById("errormsg2").innerHTML = "<div style=\"color:green\">Logged in succesfully!</div>";
      // User is signed in.
          window.location = "../verify";
  }
});
}



function isAlphaNumeric(str) {
  var code, i, len;

  for (i = 0, len = str.length; i < len; i++) {
    code = str.charCodeAt(i);
    if (!(code > 47 && code < 58) && // numeric (0-9)
        !(code === 46 || code===45 || code===95 || code===64 || code===32 || code===47 || code===58 || code===92) && // . - _  @  / : \(dot, dash, underscore, at-the-rate, space) 
        !(code > 64 && code < 91) && // upper alpha (A-Z) 
        !(code > 96 && code < 123)) { // lower alpha (a-z)
      return false;
    }
  }
  return true;
};


function validateEmail(x) {
    var atpos = x.indexOf("@");
    var dotpos = x.lastIndexOf(".");
    if (atpos<1 || dotpos<atpos+2 || dotpos+2>=x.length) {
        return false;
    }
    else{
      return true;
    }
}
