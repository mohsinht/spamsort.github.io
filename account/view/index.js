 firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
  uEmail = user.email;
  
 displaySpammers(uEmail);
}
});



function displaySpammers(uEmail){
	count=0;
	var dbRef = new Firebase('https://friendlychat-c4e05.firebaseio.com/');
dbRef.child('spammers').orderByChild('addedBy').equalTo(uEmail).on("value", function(snapshot) {
    snapshot.forEach(function(data) {
    	spammerTemplate(data.val(), ++count);
        });
    if(count!==0){
    	document.getElementById("newStyle").innerHTML=".nothingfound{display:none};"
    }
});
}

function spammerTemplate(obj, count){
	var sideinfo;
if(obj.phone!==""){
	sideinfo= obj.phone;
}
else if(obj.email !==""){
	sideinfo= obj.email;
}
else{
	sideinfo= obj.socialID;
}
document.getElementById("spammers").innerHTML += "<a href=\"\" data-toggle=\"modal\" data-target=\".bs-example-modal-" + count+ "\"><div class=\"box row\"><div class=\"col-xs-1 count-num\">"+count+"</div><div class=\"col-xs-7 hdn\">"+obj.first_name + " " + obj.last_name +"<br>" + sideinfo +"</div><div class=\"col-xs-1 dtl-icon\"><span class=\"glyphicon glyphicon-eye-open\" aria-hidden=\"true\"></span></div></div></a>";
var details = "<b>Name: </b>" + obj.first_name + " " + obj.last_name + "<br><b>Email: </b>" + obj.email + "<br><b>Type of Business: </b>" + obj.tobs;
details += "<br><b>City: </b>" + obj.city + "<br><b>Address: </b>" + obj.address + "<br><b>Phone: </b>" + obj.phone + "<br><b>Social ID: </b>" + obj.socialID + "<br><b>Phone Number: </b>" + obj.phone + "<br><b>Description: </b>" + obj.description;
document.getElementById("spammers").innerHTML += "<div class=\"modal fade bs-example-modal-" + count + "\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"myLargeModalLabel\"><div class=\"modal-dialog modal-lg\" role=\"document\"><div class=\"modal-content\" style=\"padding:10px\">" + details;
document.getElementById("spammers").innerHTML += "</div></div></div>";
}

