firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
  uEmail = user.email;
  uEmV = user.emailVerified;
}
var dbRef = new Firebase('https://friendlychat-c4e05.firebaseio.com/');
dbRef.child('profiles').orderByChild('email').equalTo(uEmail).on("value", function(snapshot) {
	document.getElementById("newStyle").innerHTML=".loading{display:none};"
    //console.log(snapshot.val());
    snapshot.forEach(function(data) {
        displayInfo("Name", data.val().name);
        displayInfo("Email", data.val().email);
        displayInfo("Business", data.val().tobs);
        if(data.val().companyName !== undefined && data.val().companyName !==""){
        	displayInfo("Company", data.val().companyName);
        }
        if(data.val().companyAddress!== undefined && data.val().companyAddress !==""){
        	displayInfo("Company Address", data.val().companyAddress);
        }
        if(data.val().companyWeb!== undefined && data.val().companyWeb !==""){
        	displayInfo("Company Website", data.val().companyWeb);
        }
        displayInfo("About", data.val().info);
      	if(data.val().verified){
      		verifiedAccount();
      	}
        });
});
	
	if(uEmV){
		verifiedEmail(uEmail);
	}

});


function displayInfo(key, info){
	document.getElementById("userInfo").innerHTML+="<li class=\"list-group-item disabled yyy\"><div class=\"prof-hdn\">" + key + ": </div>" + info + "</li> ";
}

function verifiedEmail(email){
	var el = document.getElementById('emailHead');
	var val = parseInt(el.innerText);
	var class_name = "panel panel-success";
	el.className = ' ' + class_name;
	document.getElementById("emailStatus").innerHTML = "Complete";
	document.getElementById("emailInfo").innerHTML = "Your email \'" + email + "\' is verified";
	var el = document.getElementById('buttonV');
	var val = parseInt(el.innerText);
	var class_name = "hide";
	el.className = ' ' + class_name;

	document.getElementById("progressBar").innerHTML = "<div class=\"progress-bar progress-bar-striped active\" role=\"progressbar\" aria-valuenow=\"66\" aria-valuemin=\"0\" aria-valuemax=\"100\" style=\"width: 66%\">";
    document.getElementById("progressBar").innerHTML += "<span class=\"sr-only\">33% Complete</span>"
}


function verifiedAccount(){
	var el = document.getElementById('accountHead');
	var val = parseInt(el.innerText);
	var class_name = "panel panel-success";
	el.className = ' ' + class_name;
	document.getElementById("accountStatus").innerHTML = "Complete";
		var el = document.getElementById('buttonAV');
	var val = parseInt(el.innerText);
	var class_name = "hide";
	el.className = ' ' + class_name;
	document.getElementById("accountInfo").innerHTML = "Your account is verified";
	document.getElementById("progressBar").innerHTML = "<div class=\"progress-bar progress-bar-striped active\" role=\"progressbar\" aria-valuenow=\"66\" aria-valuemin=\"0\" aria-valuemax=\"100\" style=\"width: 100%\">";
    document.getElementById("progressBar").innerHTML += "<span class=\"sr-only\">100% Complete</span>"
    
setTimeout(function() {
  window.location = "/account";
}, 3000);
}




function sendverification(){
var user = firebase.auth().currentUser;

user.sendEmailVerification().then(function() {
	var el = document.getElementById('sendButtonV');
	var val = parseInt(el.innerText);
	var class_name = "disabled";
	el.className += ' ' + class_name;
  document.getElementById("sendButtonV").innerHTML = "Sent";
}).catch(function(error) {
  console.log(error.message);
});

}