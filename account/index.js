firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
  uEmail = user.email;
}else{
   window.location = "/account/login";
}
var dbRef = new Firebase('https://friendlychat-c4e05.firebaseio.com/');
dbRef.child('profiles').orderByChild('email').equalTo(uEmail).on("value", function(snapshot) {
	document.getElementById("newStyle").innerHTML=".loading{display:none};"
    //console.log(snapshot.val());
    snapshot.forEach(function(data) {
        document.getElementById("uName").innerHTML = data.val().name;
        document.getElementById("userEmail").innerHTML += uEmail;
        document.getElementById("userBusiness").innerHTML += data.val().tobs;
        document.getElementById("numOfSpam").innerHTML = data.val().num;
        if(!data.val().verified){
          window.location = "/account/verify";
        }
        });
});
console.log(window.location.href);



});