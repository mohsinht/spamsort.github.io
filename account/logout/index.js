
  firebase.auth().signOut().then(function() {
    //alert("Signed out");
  }).catch(function(error) {
    alert(error.message);
  });
  window.location = "../../";