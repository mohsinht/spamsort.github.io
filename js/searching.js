//-----------------Firebase Api--------------------
var dbRef = new Firebase('https://friendlychat-c4e05.firebaseio.com/');
var spamRef = dbRef.child('spammers');

//-----------------Main Search Function------------
var search=function() 
  {
    var text = document.getElementById("text").value;
    var qr = text.toUpperCase();
    var query = qr.split(" ");
    var goForward = true;

    for(var s=0; s<query.length; s++){
       if(!(isAlphaNumeric(query[s]))){
         goForward=false;
       }
       if(!(query[s]!=="")){
         goForward=false;
      } 
    }

    if(!goForward){
      invalidCharacters();
      if(qr===""){
                document.getElementById("result").innerHTML="<div style=\"color:#4B77BE\">Name is empty</div>";
                 document.getElementById("result2").innerHTML = "Use spammer's name, business, location, phone number or anything related";
      }
      return ;
    }

    var spam = [];
    var count;
    var spamNum = 0;
    var objects= [];
    spamRef.on("child_added", function(snap) 
    {
      objects.push(snap.val());
      count=0;
        
      snap.forEach(function(childSnapshot) 
      {
        var key = childSnapshot.key(); //Key is the child name, like "name", "email" etc.
        var childData = childSnapshot.val(); //Value inside chil
        if(typeof childData ==='string' )
        {
          for(var i=0;i<query.length;i++)
          {
            if(query[i] ===childData.toUpperCase() )
            {
              count++;
            }
          }
        }
      });
        spam[spamNum] = count;
        spamNum++;
    });

    var index;


      //----------Checking if all Spammer searched score is ZERO----------
    var check = false;  
    for(var k=0; k<spam.length; k++){
      if(spam[k]!==0){
        check = true;
        }
      }
      if(check === false){
          CantfoundSpammer();
      }
      //-------------------------------------------------------------------


      //----------Finding the highest score among the searched-------------
      else
      {
        var max = 0;
        for(var k=0; k<spam.length; k++)
        {
          if(spam[k]>max)
          {
            max = spam[k];
            index = k;
          }
        }

        //--------Finding if the max value is redundant--------------------
        var countMax=0;
        for(var k=0; k<spam.length; k++)
        {
          if(spam[k]===max)
          {
          countMax++;
          }
        }    
        if(countMax>1){
          foundMultipleTimes();
        }
        else if(countMax===1){
          foundSpammer();
          displayInfo(objects[index]);
        }
      }
  }



var CantfoundSpammer = function(){
  document.getElementById("result").innerHTML="<div style=\"color:#D91E18\">Can't find</div>";
  document.getElementById("result2").innerHTML = "Try any other keyword to make your search wider";
  document.getElementById("newstyle").innerHTML = " .box2 {width: 700px;height: 150px;}";
  document.getElementById("newstyle").innerHTML = "body{background-color: #E74C3C !important;} .title-container .title-down{ color: #E4F1FE !important;} .title-container .title{ color: #E4F1FE !important;}  a.btn {display: none;}";
}


var foundSpammer = function(){
   document.getElementById("result").innerHTML = "Found";
             document.getElementById("newstyle").innerHTML = "body{background-color: #2ECC71 !important;} #result-heading,#result2{display:none;}   .box2 {    top: 55%;width: 150px;height: 150px;} #result{color:#92F22A;font-family: raleway;font-weight:900 !important;} .title-container .title-down{ color: #E4F1FE !important;} .title-container .title{ color: #E4F1FE !important;}  a.btn {display: block;}";

function search() {
	var text = document.getElementById("text").value;

	if (text == "") {
		document.getElementById("result").innerHTML = "<div style=\"color:#D91E18\">Name is empty</div>";
		document.getElementById("result2").innerHTML = "Use spammer's name, business, location, phone number or anything related";
		return false;
	}

	if (!validateKeyword(text)) {
		document.getElementById("result").innerHTML = "Invalid Characters";
		return false;
	}

	var qr = text.toUpperCase();
	var query = qr.split(" ");

	for (var i = 0; i < query.length; i++) {
		if (!isAlphaNumeric(query[i])) {
			invalidCharacters();
			return false;
		}
	}

	document.getElementById("result").innerHTML= "You Searched for: " + text;
	document.getElementById("newstyle").innerHTML = "";
	var spam = [],
		spamNum = 0,
		count,
		objects= [];

	spamRef.on("child_added", function(snap) {
		objects.push(snap.val());
		count = 0;

		snap.forEach(function(childSnapshot) {
			var key = childSnapshot.key(); //Key is the child name, like "name", "email" etc.
			var childData = childSnapshot.val(); //Value inside chil
			if (typeof childData === "string") {
				for (var i = 0; i < query.length; i++) {
					if (query[i] === childData.toUpperCase() )
						count++;
				}
			}
		});
		spam[spamNum] = count;
		spamNum++;
	});

	//----------Checking if all Spammer searched score is ZERO----------
	if (spam.filter(function(x) { return x; }).pop() == undefined) { // https://stackoverflow.com/questions/20744960/javascript-how-can-i-fetch-a-non-zero-value-from-an-array
		CantfoundSpammer();
		return false;
	}
	//-------------------------------------------------------------------

	//----------Finding the highest score among the searched-------------
	var max = 0, index;
	for (var k = 0; k < spam.length; k++) {
		if (spam[k] > max) {
			max = spam[k];
			index = k;
		}
	}
	//-----------------------------------------------------------------

	//--------Finding if the max value is redundant--------------------
	var countMax = spam.reduce(function(n, val) { // https://stackoverflow.com/questions/17313268/efficiently-find-the-number-of-occurrences-a-given-value-has-in-an-array
		return n + (val === max);
	}, 0);

	if (countMax > 1) {
		foundMultipleTimes();
	} else { // definitely 1
		foundSpammer();
		displayInfo(objects[index]);
	}
	//-----------------------------------------------------------------
//-------------------------------------------------------------------
}


function CantfoundSpammer() {
	document.getElementById("result").innerHTML="<div style=\"color:#D91E18\">Can't find</div>";
	document.getElementById("result2").innerHTML = "Try any other keyword to make your search wider";
	document.getElementById("newstyle").innerHTML = " .box2 {width: 700px;height: 150px;}";
	document.getElementById("newstyle").innerHTML = "body{background-color: #E74C3C !important;} .title-container .title-down{ color: #E4F1FE !important;} .title-container .title{ color: #E4F1FE !important;}  a.btn {display: none;}";
}


function foundSpammer() {
	document.getElementById("result").innerHTML = "Found";
	document.getElementById("newstyle").innerHTML = "body{background-color: #2ECC71 !important;} #result-heading,#result2{display:none;}   .box2 {    top: 55%;width: 150px;height: 150px;} #result{color:#92F22A;font-family: raleway;font-weight:900 !important;} .title-container .title-down{ color: #E4F1FE !important;} .title-container .title{ color: #E4F1FE !important;}  a.btn {display: block;}";
>>>>>>> origin/gh-pages
  
}

function foundMultipleTimes() {
	document.getElementById("result").innerHTML="<div style=\"color:#446CB3\">There are many spammers with this keyword</div>";
	document.getElementById("result2").innerHTML = "Narrow down your search by adding last name or social ID or any keyword";
	document.getElementById("newstyle").innerHTML = "body{background-color: #6BB9F0 !important;} .title-container .title-down{ color: #fff !important;} .title-container .title{ color: #fff !important;}  a.btn {display: none;}";
}


function invalidCharacters() {
	document.getElementById("result").innerHTML="<div style=\"color:#6C7A89\">Invalid Characters</div>";
	document.getElementById("result2").innerHTML = "Use only alphanumeric keywords";
	document.getElementById("newstyle").innerHTML = "body{background-color: #36D7B7 !important;} .title-container .title-down{ color: #E4F1FE !important;} .title-container .title{ color: #E4F1FE !important;}  a.btn {display: none;}";
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
function nameKey(key) {
    return nameKeys[key];
}


var displayInfo = function(obj){
  document.getElementById("details").innerHTML="";
  if(obj.first_name !=="" || obj.last_name !==""){
  document.getElementById("popupHeading").innerHTML = obj.first_name + " " + obj.last_name;
}
  if(obj.email !== ""){
  document.getElementById("details").innerHTML = "<b>Email: </b>" + obj.email; 
}
  if(obj.phone !== ""){
  document.getElementById("details").innerHTML += "<br><b>Phone: </b>" + obj.phone; 
}
    if(obj.city !== ""){
  document.getElementById("details").innerHTML += "<br><b>City: </b>" + obj.city; 
}
  if(obj.tobs !== ""){
  document.getElementById("details").innerHTML += "<br><b>Type of Business: </b>" + obj.tobs; 
}
  if(obj.socialID !== ""){
  document.getElementById("details").innerHTML += "<br><b>Social ID: </b>" + obj.socialID; 
var invalidChars = ['+', '-', '/', '*', '.', '\'', '$', '#', '"', '_', '=', '%'];
function validateKeyword(keyword) {
  for (var i = 0; i < keyword.length; i++) {
    invalidChars.forEach(function (item, index) {
      if (keyword[i] === item) {
        return false;
      }
    }); 
  }
  return true;
}

function displayInfo(obj) {
	var details = document.getElementById("details").innerHTML = "";
	
	if (obj.first_name !== "" || obj.last_name !== "") {
		document.getElementById("popupHeading").innerHTML = obj.first_name + " " + obj.last_name;
	}
	if (obj.email !== "") {
		details.innerHTML = "<b>Email: </b>" + obj.email; 
	}
	if (obj.phone !== "") {
		details.innerHTML += "<br><b>Phone: </b>" + obj.phone; 
	}
	if (obj.city !== "") {
		details.innerHTML += "<br><b>City: </b>" + obj.city; 
	}
	if (obj.tobs !== "") {
		details.innerHTML += "<br><b>Type of Business: </b>" + obj.tobs; 
	}
	if (obj.socialID !== "") {
		details.innerHTML += "<br><b>Social ID: </b>" + obj.socialID; 
	}
	if (obj.description !== "") {
		details.innerHTML += "<br><b>Description: </b><br>" + "<div style=\"padding-left:1em;\">" + obj.description; 
	}
>>>>>>> origin/gh-pages
}

function isAlphaNumeric(str) {
	var code, len = str.length;
	
	for (var i = 0; i < len; i++) {
		code = str.charCodeAt(i);
		if (!(code > 47 && code < 58) && // numeric (0-9)
		!(code === 46 || code === 45 || code === 95 || code === 64) && // . - _  @ (dot, dash, underscore, at-the-rate) 
		!(code > 64 && code < 91) && // upper alpha (A-Z) 
		!(code > 96 && code < 123)) { // lower alpha (a-z)
			return false;
		}
	}
	return true;
}
