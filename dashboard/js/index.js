
  var uEmail, uName, uTobs, numOfSpam;

  var config = {
    apiKey: "AIzaSyDcvxKgsZCAaeRfqDe0PlPcgESZDwuJwAU",
    authDomain: "friendlychat-c4e05.firebaseapp.com",
    databaseURL: "https://friendlychat-c4e05.firebaseio.com",
    projectId: "friendlychat-c4e05",
    storageBucket: "friendlychat-c4e05.appspot.com",
    messagingSenderId: "63768838798"
  };
  firebase.initializeApp(config);
  firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
  document.getElementById("lt").innerHTML = ".logout{display: inherit !important;}"
  uEmail = user.email;
  document.getElementById("uemail").innerHTML = uEmail;
var dbRef = new Firebase('https://friendlychat-c4e05.firebaseio.com/');
 var profRef = dbRef.child('profiles');
    profRef.on("child_added", function(snap) {
    console.log(snap.val().email);
    if(snap.val().email === uEmail){
      uName = snap.val().name;
      uTobs = snap.val().tobs;
      numOfSpam = snap.val().num;
      //return;
    }
    document.getElementById("name").innerHTML = uName;
    document.getElementById("utobs").innerHTML = uTobs;
    document.getElementById("num").innerHTML = numOfSpam;
});


    // User is signed in.
//window.location = "/form/";
  }
  else{
    document.getElementById("lt").innerHTML = ".logout{display: none;}"
    window.location = "../login/index.html";
  }
});
   


   var logout = function(){
firebase.auth().signOut().then(function() {
  alert("Signed out");
  window.location = "../";
}).catch(function(error) {
  alert(error.message);
});
};