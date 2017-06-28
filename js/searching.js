var dbRef = new Firebase('https://friendlychat-c4e05.firebaseio.com/');
var spamRef = dbRef.child('spammers');

var search = function() {

  var text = document.getElementById("text").value;

  if (!validateKeyword(text)) {
    return false;
  }

  var qr = text.toUpperCase();
  var locCheck = false;
  var query = qr.split(" ");
  console.log(query);

  if(qr === "STOP" || text === "" || text === null) {
    document.getElementById("result").innerHTML="<div style=\"color:#D91E18\">Name is empty</div>";
    document.getElementById("result2").innerHTML = "Use spammer's name, business, location, phone number or anything related";
    return false;
  }

  document.getElementById("result").innerHTML = "You Searched for: " + text;
  var spam = [],
      objects = [],
      spamNum = 0,
      count;

  document.getElementById("newstyle").innerHTML = "";

  spamRef.on("child_added", function(snap) {
    objects.push(snap.val());
    count = 0;
    
    snap.forEach(function(childSnapshot) {
        var key = childSnapshot.key(); // Key is the child name, like "name", "email" etc.
        var childData = childSnapshot.val(); // Value inside chil
        if (typeof childData === "string") {
          //console.log(childData);
          for (var i = 0; i < query.length; i++) {
            if (query[i] === childData.toUpperCase()) {
               count++;
               console.log(count);
            }
          }
        }
    });

    spam[spamNum] = count;
    spamNum++;
  });

  // console.log(spam);
  console.log(spam.length);

  //----------Checking if all Spammer searched score is ZERO----------
  if (spam.filter(function(x) { return x; }).pop() == undefined) { // https://stackoverflow.com/questions/20744960/javascript-how-can-i-fetch-a-non-zero-value-from-an-array
    console.log("CANT FIND SPAMMER!");
    CantfoundSpammer();
    return false;
  }

  //----------Finding the highest score among the searched-------------
  var max = 0, index;
  for (var k = 0; k < spam.length; k++) {
    if (spam[k] > max) {
      max = spam[k];
      index = k;
    }
  }
  console.log("MAX = " + max);

  //--------Finding if the max value is redundant--------------------
  var countMax = spam.reduce(function(n, val) { // https://stackoverflow.com/questions/17313268/efficiently-find-the-number-of-occurrences-a-given-value-has-in-an-array
    return n + (val === max);
  }, 0);

  if (countMax > 1) {
    foundMultipleTimes();
  } else { // now it's definitely 1
    foundSpammer();
    displayInfo(objects[index]);
  }
} /** Main Search function ends here **/

function CantfoundSpammer() {
  document.getElementById("result").innerHTML="<div style=\"color:#D91E18\">Can't find</div>";
  document.getElementById("result2").innerHTML = "Try any other keyword to make your search wider";
  document.getElementById("newstyle").innerHTML = " .box2 {width: 700px;height: 150px;} body{background-color: #E74C3C !important;} .title-container .title-down{ color: #E4F1FE !important;} .title-container .title{ color: #E4F1FE !important;}  a.btn {display: none;}";
}

function foundSpammer() {
  document.getElementById("result").innerHTML = "Found";
  document.getElementById("newstyle").innerHTML = "body{background-color: #2ECC71 !important;} #result-heading,#result2{display:none;}   .box2 {    top: 55%;width: 150px;height: 150px;} #result{color:#92F22A;font-family: raleway;font-weight:900 !important;} .title-container .title-down{ color: #E4F1FE !important;} .title-container .title{ color: #E4F1FE !important;}  a.btn {display: block;}";
  
}

function foundMultipleTimes() {
  document.getElementById("result").innerHTML="<div style=\"color:#446CB3\">There are many spammers with this keyword</div>";
  document.getElementById("result2").innerHTML = "Narrow down your search by adding last name or social ID or any keyword";
  document.getElementById("newstyle").innerHTML = "body{background-color: #6BB9F0 !important;} .title-container .title-down{ color: #fff !important;} .title-container .title{ color: #fff !important;}  a.btn {display: none;}";
}


var nameKeys = {
  "first_name": "First Name",
  "last_name": "Last Name",
  "address": "Address",
  "phone": "Phone Number",
  "email": "Email Address",
  "socialID": "Social ID",
  "tobs": "Type of Business"
};
var nameKey = function(key){
    return nameKeys[key];
}

var invalidChars = ['+', '-', '/', '*', '.', '\'', '$', '#', '"', '_', '=', '%'];
function validateKeyword(keyword) {
  for (var i = 0; i < keyword.length; i++) {
    invalidChars.forEach(function (item, index) {
      if (keyword[i] === item) {
        document.getElementById("result").innerHTML = "Invalid Characters";
        return false;
      }
    }); 
  }
  return true;
}

function displayInfo(obj) {
  var details = document.getElementById("details");

  document.getElementById("popupHeading").innerHTML = obj.first_name + " " + obj.last_name;
  
  details.innerHTML = "<b>Email: </b>" + obj.email
  + "<br><b>Phone: </b>" + obj.phone 
  + "<br><b>City: </b>" + obj.city
  + "<br><b>Type of Business: </b>" + obj.tobs
  + "<br><b>Social ID: </b>" + obj.socialID
  + "<br><b>Description: </b><br>" + "<div style=\"padding-left:1em;\">" + obj.description; 
}
