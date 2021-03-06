
   firebase.auth().onAuthStateChanged(function(user) {
  if (!user) {
    // User is signed in.
    window.location = "../login/";
  }else{
  uEmail = user.email;
    if(!user.emailVerified){
        window.location = "../verify/";
    }
}
});

  $(document).ready(function() {
    $('#contact_form').bootstrapValidator({
        // To use feedback icons, ensure that you use Bootstrap v3.1.0 or later
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            first_name: {
                validators: {
                        stringLength: {
                        min: 2,
                    },
                        notEmpty: {
                        message: 'Please supply your first name'
                    }
                }
            },
             last_name: {
                validators: {
                     stringLength: {
                        min: 2,
                    },
                    notEmpty: {
                        message: 'Please supply your last name'
                    }
                }
            },
            email: {
                validators: {
                    emailAddress: {
                        message: 'Please supply a valid email address'
                    }
                }
            },
            phone: {
                validators: {

                }
            },
            address: {
                validators: {
                     stringLength: {
                        min: 8,
                    },
                }
            },
            city: {
                validators: {
                     stringLength: {
                        min: 4,
                    },
                }
            },
            state: {
                validators: {

                }
            },
            zip: {
                validators: {
                    notEmpty: {
                        message: 'Please supply your zip code'
                    },
                }
            },
            comment: {
                validators: {
                      stringLength: {
                        min: 20,
                        max: 200,
                        message:'Please enter at least 20 characters and no more than 200'
                    },
                    notEmpty: {
                        message: 'Please supply a description of your project'
                    }
                    }
                }
            }
        })
        .on('success.form.bv', function(e) {
            $('#success_message').slideDown({ opacity: "show" }, "slow") // Do something ...
                $('#contact_form').data('bootstrapValidator').resetForm();

            // Prevent form submission
            e.preventDefault();

            // Get the form instance
            var $form = $(e.target);

            // Get the BootstrapValidator instance
            var bv = $form.data('bootstrapValidator');


            // Use Ajax to submit form data
            $.post($form.attr('action'), $form.serialize(), function(result) {
                console.log(result);
            }, 'json');
        });

});


var submitSpam = function(){
  firebase.auth().onAuthStateChanged(function(user) {
  if (!user) {
    // User is signed in.
window.location = "../login/";
  }
  else{
    var total;
    uEmail = user.email;
  }
});
var fname = $("input[name=first_name]").val();
var lname = $("input[name=last_name]").val();
var email = $("input[name=email]").val();
var ph = $("input[name=phone]").val();
var add = $("input[name=address]").val();
var city = $("input[name=city]").val();
var tobs= $("input[name=tobs]").val();
var sid= $("input[name=website]").val();
var info= document.getElementById("desc").value;

if((fname==="" || lname==="") && email==="" && ph==="" &&  sid===""){
    alert("Please type Spammer's Name, Social ID, Email or Phone Number.");
    return;
}
if(info.length<20){
    alert("Info must be at least 20 characters long");
    return;
}



var curuser = firebase.auth().currentUser;

var dbRef = new Firebase('https://friendlychat-c4e05.firebaseio.com/');
var spamRef = dbRef.child('spammers');
console.log(info);
spamRef.push({
    first_name: fname,
    last_name:lname,
    email: email,
    phone: ph,
    address: add,
    city: city,
    tobs: tobs,
    socialID: sid,
    description:info,
    addedBy: curuser.email
});

    var profRef = dbRef.child('profiles');
    var numOfSpam;
    profRef.on("child_added", function(snap) 
    {
        //console.log(snap.val());
        numOfSpam = snap.val().num;
        if(numOfSpam === undefined){
            numOfSpam = 0;
        }
        numOfSpam++;
        //console.log("Num = " + numOfSpam)
        if(snap.val().email === curuser.email){
          snap.ref().update({num: numOfSpam});
        }
       // alert("The spammer has been added!");

        window.location = "../";
    });


}