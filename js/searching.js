var dbRef = new Firebase('https://friendlychat-c4e05.firebaseio.com/');
var spamRef = dbRef.child('spammers');

var search=function() {
var text = 'undefined'; 
text = document.getElementById("text").value;

if(!validateKeyword(text));
  var text = document.getElementById("text").value;
  var qr = text.toUpperCase();
  var locCheck = false;
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
            document.getElementById("result").innerHTML="<div style=\"color:#D91E18\">Name is empty</div>";
             document.getElementById("result2").innerHTML = "Use spammer's name, business, location, phone number or anything related";
  }
  return ;
}
   document.getElementById("result").innerHTML= "You Searched for: " + text;
   var spam = [];
var count;
var spamNum = 0;
   document.getElementById("newstyle").innerHTML = "";
var found= false;
var objects= [];
  spamRef.on("child_added", function(snap) {
    objects.push(snap.val());
    count=0;
    
    snap.forEach(function(childSnapshot) {
        var key = childSnapshot.key(); //Key is the child name, like "name", "email" etc.
        var childData = childSnapshot.val(); //Value inside chil
        if(typeof childData ==='string' )
        {
          //console.log(childData);
          for(var i=0;i<query.length;i++){
            if(query[i] ===childData.toUpperCase() )
            {
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
 var index;
 console.log(spam.length);

  //----------Checking if all Spammer searched score is ZERO----------
  var check = false;  
  for(var k=0; k<spam.length; k++){
      if(spam[k]!==0){
        check = true;
      }
  }
  if(check === false){
      console.log("CANT FIND SPAMMER!");
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
    console.log("MAX = " + max);
    //-----------------------------------------------------------------

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
    //-----------------------------------------------------------------


  }

  //-------------------------------------------------------------------


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
  
}


var foundMultipleTimes = function(){
    document.getElementById("result").innerHTML="<div style=\"color:#446CB3\">There are many spammers with this keyword</div>";
  document.getElementById("result2").innerHTML = "Narrow down your search by adding last name or social ID or any keyword";
  document.getElementById("newstyle").innerHTML = "body{background-color: #6BB9F0 !important;} .title-container .title-down{ color: #fff !important;} .title-container .title{ color: #fff !important;}  a.btn {display: none;}";
}


var invalidCharacters = function(){
    document.getElementById("result").innerHTML="<div style=\"color:#6C7A89\">Invalid Characters</div>";
  document.getElementById("result2").innerHTML = "Use only alphanumeric keywords";
 document.getElementById("newstyle").innerHTML = "body{background-color: #36D7B7 !important;} .title-container .title-down{ color: #E4F1FE !important;} .title-container .title{ color: #E4F1FE !important;}  a.btn {display: none;}";
}


var nameKey = function(key){
    if(key === 'first_name'){
      return "First Name";
    }
    else if(key === 'last_name'){
      return "Last Name";
    }
    else if(key === 'address'){
      return "Address";
    }
    else if(key === 'phone'){
      return "Phone Number";
    }
    else if(key === 'email'){
      return "Email Address";
    }
    else if(key === 'socialID'){
      return "Social ID";
    }
    else if(key === 'tobs'){
      return "Type of Business";
    }
}

var validateKeyword = function(search){
  for(var i=0; i<search.length; i++)
  {
    if(search[i] === '+' || search[i] === '-' || search[i] === '/' || search[i] === '*' || search[i] === '.' || search[i] === '\'' || search[i] === '$' || search[i] === '#' || search[i] === '"' || search[i] === '_' || search[i] === '=' || search[i] === '%')
    {
      document.getElementById("result").innerHTML = "Invalid Characters";
      return false;
    }
    else{
      return true;
        }
    }
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
}
  if(obj.description !== ""){
  document.getElementById("details").innerHTML += "<br><b>Description: </b><br>" + "<div style=\"padding-left:1em;\">" + obj.description; 
}
}





function isAlphaNumeric(str) {
  var code, i, len;

  for (i = 0, len = str.length; i < len; i++) {
    code = str.charCodeAt(i);
    if (!(code > 47 && code < 58) && // numeric (0-9)
        !(code > 64 && code < 91) && // upper alpha (A-Z) 
        !(code > 96 && code < 123)) { // lower alpha (a-z)
      return false;
    }
  }
  return true;
};