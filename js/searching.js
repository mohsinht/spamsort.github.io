var search=function() {
  con=0;
var text = document.getElementById("text").value;
var dbRef = new Firebase('https://friendlychat-c4e05.firebaseio.com/');
var spamRef = dbRef.child('spammers');
//document.getElementById("result").innerHTML = text;
  var text = document.getElementById("text").value;
  var qr = text.toUpperCase();
  var locCheck = false;
//  var ilocName = document.getElementById("loc").value;
//  var locName = ilocName.toUpperCase();
//  var ikeywords = document.getElementById("keys").value;
//  var keywords = ikeywords.toUpperCase();

//console.log(locName);
  console.log(qr);
          if((qr==="STOP") || (text === "") || (text === null))
          {
            document.getElementById("result").innerHTML="<div style=\"color:#D91E18\">Name is empty</div>";
             document.getElementById("result2").innerHTML = "Use spammer's name, business, location, phone number or anything related";
            return;
          }
   document.getElementById("result").innerHTML= "You Searched for: " + text;
  // if(ilocName!==''){
    // document.getElementById("result").innerHTML= "You Searched for: " + text + " in " + ilocName;
     //if(ikeywords!==''){
      //document.getElementById("result").innerHTML= "You Searched for: " + text + " in " + ilocName + " with keywords \'" + ikeywords + "\'";
     //}
   //}
 // else if(ikeywords!==''){
   //  document.getElementById("result").innerHTML= "You Searched for: " + text + " with keywords " + "\'" + ikeywords + "\'";
   //}

   document.getElementById("newstyle").innerHTML = "";
var found= false;
  spamRef.on("child_added", function(snap) {
    snap.forEach(function(childSnapshot) {
        var key = childSnapshot.key(); //Key is the child name, like "name", "email" etc.
        var childData = childSnapshot.val(); //Value inside child
        if(con>10){
          return;
        }
        if(typeof childData ==='string' )
        {
          if(childData.toUpperCase()===qr){
          con++;
          document.getElementById("newstyle").innerHTML = " ";

          document.getElementById("result").innerHTML = "Found " + text + " in type \'" +key + "\' at " + con + " instances";
          if(con>10){
            foundMultipleTimes();
            document.getElementById("result").innerHTML = "Found " + text + " multiple times (10+)";
            document.getElementById("result2").innerHTML = "Try narrowing down your search by adding keywords, i.e location, business, middle name etc.";
          }
          found = true;

          if(con===1){
            foundSpammer();
          }
          else{
            
          }

        }
        else{
          //if(ilocName!==''){
            //if(childData.city === ilocName){
              //console.log("Matched location");
            //}
          //}
 
    }
        }
    });

    if(!found){
      CantfoundSpammer();
      
      document.getElementById("result").innerHTML = "Can't find " + text;
    }
});
}



var CantfoundSpammer = function(){
  document.getElementById("newstyle").innerHTML = " .box2 {width: 700px;height: 150px;}";
  document.getElementById("newstyle").innerHTML = "body{background-color: #E74C3C !important;} .title-container .title-down{ color: #E4F1FE !important;} .title-container .title{ color: #E4F1FE !important;}";
}


var foundSpammer = function(){
   document.getElementById("result").innerHTML = "Found";
             document.getElementById("newstyle").innerHTML = "body{background-color: #2ECC71 !important;} #result-heading,#result2{display:none;}   .box2 {width: 150px;height: 150px;} #result{color:#92F22A;font-family: raleway;font-weight:900 !important;} .title-container .title-down{ color: #E4F1FE !important;} .title-container .title{ color: #E4F1FE !important;}";
  
}


var foundMultipleTimes = function(){
  document.getElementById("newstyle").innerHTML = "body{background-color: #6BB9F0 !important;} .title-container .title-down{ color: #fff !important;} .title-container .title{ color: #fff !important;}";
}