 window.location = "/account/verify";
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDcvxKgsZCAaeRfqDe0PlPcgESZDwuJwAU",
    authDomain: "friendlychat-c4e05.firebaseapp.com",
    databaseURL: "https://friendlychat-c4e05.firebaseio.com",
    projectId: "friendlychat-c4e05",
    storageBucket: "friendlychat-c4e05.appspot.com",
    messagingSenderId: "63768838798"
  };
  firebase.initializeApp(config);
  //var dbRef = new Firebase('https://friendlychat-c4e05.firebaseio.com/');
  //var profRef = dbRef.child('profiles');

  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      validate(user.email, user.emailVerified);
    } else {
    // No user is signed in.
    }
  });



  var validate = function(email, verified){
    console.log(email);
    console.log(verified);
    if(verified){
      document.getElementById("emailV").innerHTML = "<span class=\"fa-stack fa-lg\" style=\"    color: rgba(0, 128, 0, 0.09);\"><i class=\"fa fa-circle fa-stack-2x\"></i><i style=\"color:green;\" class=\"fa fa-check\" aria-hidden=\"true\"></i></span>";
    }
    else{
      document.getElementById("emailV").innerHTML =  "<span class=\"fa-stack fa-lg\" style=\"color:rgba(128, 0, 0, 0.09);\"><i class=\"fa fa-circle fa-stack-2x\"></i><i style=\"color:red;\" class=\"fa fa-times\" aria-hidden=\"true\"></i></span>";
      document.getElementById("emailV").innerHTML += "<button onclick=\"Emailverification()\" id=\"resend\">Resend Email</button>";
    }
  }



/*

  var addUserData = function(email){

    profRef.on("child_added", function(snap) {
      if(snap.val().email === email){

          uName= snap.val().name;
          uEmail = snap.val().email;
          uCA = snap.val().companyAddress;
          uCN = snap.val().companyName;
          uCW = snap.val().companyWeb;
          uTobs = snap.val().tobs;
          uInfo = snap.val().info;
      }
      console.log(uInfo+ uName);
    });
  }

*/


var Emailverification = function(){
  firebase.auth().onAuthStateChanged(function(user) {
user.sendEmailVerification().then(function() {
  alert("Email has been sent");
  // Email sent.
}, function(error) {
  alert("Email already verified");
  // An error happened.
});
  });


};


var logout = function(){
  firebase.auth().signOut().then(function() {
    alert("Signed out");
  }).catch(function(error) {
    //alert(error.message);
  });
  
  window.location = "/login";
};
