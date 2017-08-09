//-----------------Firebase Api--------------------
var dbRef = new Firebase('https://friendlychat-c4e05.firebaseio.com/');
var spamRef = dbRef.child('spammers');
//-----------------Main Search Function------------
var search=function() {

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
                document.getElementById("result2").innerHTML = "Use spammer's name, email, phone or anything related";
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
   document.getElementById("result").innerHTML = "Spammer Found";
   document.getElementById("detailsbutton").innerHTML = "<button class=\"btn btn-success\" data-toggle=\"modal\" data-target=\"#basicModal\">View details</button>";
             document.getElementById("newstyle").innerHTML = "#detailsbutton{display:block} body{background-color: #2ECC71 !important;} #result-heading,#result2{display:none;}   .box2 {    } #result{color:#92F22A;font-family: raleway;font-weight:900 !important;} .title-container .title-down{ color: #E4F1FE !important;} .title-container .title{ color: #E4F1FE !important;}  a.btn {display: block;}";
  
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


var displayInfo = function(obj){
  document.getElementById("details").innerHTML="";
  if(obj.first_name !=="" || obj.last_name !==""){
  document.getElementById("details").innerHTML = "<div class= \"col-md-12 spname\" data-toggle=\"tooltip\" data-placement=\"left\" title=\"Spammer Name\"><span class=\"glyphicon glyphicon-user nameicon\" aria-hidden=\"true\"></span><span class=\"glyphicon glyphicon-remove nameicon2\" aria-hidden=\"true\"></span><span class=\"glyphicon glyphicon-warning-sign nameicon3\" aria-hidden=\"true\"></span><b style=\"text-decoration: underline;text-decoration-color: red;\">" + obj.first_name + " " + obj.last_name + "</b></div>";
}
  if(obj.email !== ""){
  document.getElementById("details").innerHTML += "<div class= \"col-md-5 col-md-offset-1\"><b>Email: </b>" + obj.email + "</div>"; 
}
  if(obj.phone !== ""){
  document.getElementById("details").innerHTML += "<div class= \"col-md-5 col-md-offset-1\"><b>Phone: </b>" + obj.phone + "</div>"; 
}
    if(obj.city !== ""){
  document.getElementById("details").innerHTML += "<div class= \"col-md-5 col-md-offset-1\"><b>City: </b>" + obj.city + "</div>"; 
}
  if(obj.tobs !== ""){
  document.getElementById("details").innerHTML += "<div class= \"col-md-5 col-md-offset-1\"><b>Type of Business: </b>" + obj.tobs + "</div>";  
}
  if(obj.socialID !== ""){
  document.getElementById("details").innerHTML += "<div class= \"col-md-5 col-md-offset-1\"><b>Social ID: </b>" + obj.socialID + "</div>"; 
}
  if(obj.description !== ""){
  document.getElementById("details").innerHTML += "<div class= \"col-md-12 col-md-offset-1\"><br><b>Description: </b>" + "<div style=\"padding-left:0;\">" + obj.description + "</div>"; 
}
}





var isAlphaNumeric = function(str) {
  var code, i, len;

  for (i = 0, len = str.length; i < len; i++) {
    code = str.charCodeAt(i);
    if (!(code > 47 && code < 58) && // numeric (0-9)
        !(code === 46 || code===45 || code===95 || code===64) && // . - _  @ (dot, dash, underscore, at-the-rate) 
        !(code > 64 && code < 91) && // upper alpha (A-Z) 
        !(code > 96 && code < 123)) { // lower alpha (a-z)
      return false;
    }
  }
  return true;
};