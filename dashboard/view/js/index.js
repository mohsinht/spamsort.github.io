
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

var spamRef = dbRef.child('spammers');
spamRef.on("child_added", function(snap) 
{
  var text = [];
  if(snap.val().addedBy === uEmail){
      if(snap.val().first_name!==""){
        text += "<i class=\"fa fa-user\" aria-hidden=\"true\"></i><b>  Name: </b>" + snap.val().first_name + " " + snap.val().last_name + "<br />";
      }
      if(snap.val().email !== ""){
        text += "<i class=\"fa fa-user\" aria-hidden=\"true\"></i><b>  Email: </b>" + snap.val().email + "<br />";
      }
      if(snap.val().city !== ""){
        text += "<i class=\"fa fa-globe\" aria-hidden=\"true\"></i><b>  City: </b>" + snap.val().city + "<br />";
      }
      if(snap.val().tobs !== ""){
        text += "<i class=\"fa fa-briefcase\" aria-hidden=\"true\"></i><b>  Type Of Business: </b>" + snap.val().tobs + "<br />";
      }
      if(snap.val().socialID !== ""){
        text += "<i class=\"fa fa-id-badge\" aria-hidden=\"true\"></i><b>  Social ID: </b>" + snap.val().socialID + "<br />";
      }
      if(snap.val().address !== ""){
        text += "<i class=\"fa fa-map-marker\" aria-hidden=\"true\"></i><b>  Address: </b>" + snap.val().address + "<br />";
      }
      if(snap.val().description !== ""){
        text += "<i class=\"fa  fa-info-circle\" aria-hidden=\"true\"></i><b>  Description: </b>" + snap.val().description + "<br />";
      }
      document.getElementById("view").innerHTML += "<div class=\"viewSpammer\" style=\"\">" +text+  "</div>";
  }
});

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