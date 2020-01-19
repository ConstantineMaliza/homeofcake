$('#btn-one').click(function() {
  $('#btn-one').html('<span class="spinner-border spinner-border-sm mr-2" role="status" aria-hidden="true"></span> registering...').addClass('disabled');
  });
$('#btn-two').click(function() {
  $('#btn-two').html('<span class="spinner-border spinner-border-sm mr-2" role="status" aria-hidden="true"></span> loging...').addClass('disabled');
  });
//Register form
const Register= document.querySelector("#RegisterForm");
Register.addEventListener('submit',(e) =>{
    e.preventDefault();
    const firstname=Register['firstname'].value;
    const middlename=Register['middlename'].value;
    const lastname=Register['lastname'].value;
    const email=Register['email'].value;
    const phonenumber=Register['phonenumber'].value;
    const password=Register['password'].value;
    const conf_password=Register['conf_password'].value;

    if(password.length < 6) {
         alert("Minimum Password length is 6 characters !")
         return;
       }
    if(password.length!= conf_password.length){
        alert("dismatch password");
        return;
    }

    var training=document.getElementById("training");
      var booking=document.getElementById("booking");
    
      if (training.checked != true && booking.checked != true){
          alert("Please select account type");
          return;
       }
       var category="";
      if(training.checked==true){
        category="Trainer";
      }
      else if(booking.checked==true){
        category="Booking";
      }
      else{
          alert(" Please select account type");
          return;
      }

      if(phonenumber == null || phonenumber.length == 0 || phonenumber == "null" || phonenumber == "undefined") {
      alert("Phone number required");
      return;
    }else {

      if(phonenumber.startsWith("+25078") || phonenumber.startsWith("+25072") || phonenumber.startsWith("+25073")) {

            if(phonenumber.length == 13) {
              phonenumber = phonenumber; // phone.substr(1);

            }else {
              alert("Invalid Phone Number length");
              return;
            }

            }else if(phonenumber != null && phonenumber.startsWith("25078") || phonenumber.startsWith("25072") || phonenumber.startsWith("25073")) {

            if(phonenumber.length == 12) {
              phonenumber = "+"+ phonenumber;

            }else {
              alert("Invalid Phone Number length");
              return;
            }

            }else if(phonenumber != null && phonenumber.startsWith("078") || phonenumber.startsWith("072") || phonenumber.startsWith("073")) {

            if(phonenumber.length == 10) {
            //    phonenumber = "+25"+ phonenumber;

            }else {
              alert("Invalid Phone Number length");
              return;
            }

            }else if(phonenumber != null && phonenumber.startsWith("78") || phonenumber.startsWith("72") || phonenumber.startsWith("73")) {

            if(phonenumber.length == 9) {
              phonenumber = "250"+ phonenumber;

            }else {
              alert("Invalid Phone Number length");
              return;
            }

      }else if(phonenumber.length < 8) {
          alert("Invalid Phone Number")
          return;
      }

    }
    auth.createUserWithEmailAndPassword(email, password).catch(function(error){
     

          var errorCode = error.code;
          var errorMessage = error.message;

          alert(errorCode +" - "+ errorMessage);

          }).then(cred =>{
              const user_id=cred.user.uid;
              const user_email=cred.user.email;

              // alert(user_id +" "+ user_email);
              WriteDataProfile(user_id, email, password);//call function

              function WriteDataProfile(User_id,FirstName,MiddleName,LastName,Email,PhoneNumber, Password,Category){  //input data in database
                if(category=="Trainer")  {
                database.ref('Trainers').child(user_id).set({
                  User_id: user_id,
                  FirstName:firstname,
                  MiddleName:middlename,
                  LastName:lastname,
                  Email: email,
                  PhoneNumber:phonenumber,
                  Password : password,
                  Category:category

                  });}
                  else{
                    database.ref('Clients').child(user_id).set({
                      User_id: user_id,
                      FirstName:firstname,
                      MiddleName:middlename,
                      LastName:lastname,
                      Email: email,
                      PhoneNumber:phonenumber,
                      Password : password,
                      Category:category
    
                      });
                  }
                  // alert( user_id);
              }

          }).then(result =>{
            $('#btn-one').fadeOut('slow');

              alert('Account succesffully created');

              window.location.href="index.html";

            });
        });    

        //Login Form

         //login user
         
        const login=document.querySelector("#LoginForm");
        login.addEventListener('submit' , (e) => {
            e.preventDefault();
            const email=login["email"].value;
            const password=login["password"].value;

            auth.signInWithEmailAndPassword(email, password).catch(function(error) {

              // alert(email +""+password);
              // Handle Errors here.
              var errorCode = error.code;
              var errorMessage = error.message;

              alert(errorCode +" - "+ errorMessage);
        
              }).then(cred =>{
                  const user_id=cred.user.uid;

                  sessionStorage.setItem("userUID", user_id);

                  // $('#loaderlogin').fadeOut('slow');
                  database.ref("Clients/"+ user_id).once('value', function(snapshot) {

                    
                    var dataProfile = snapshot.val();          
                    var category = dataProfile.Category;
          
                    sessionStorage.setItem("Email", dataProfile.Email);
                    sessionStorage.setItem("FirstName", dataProfile.FirstName);
                    sessionStorage.setItem("MiddleName", dataProfile.MiddleName);
                    sessionStorage.setItem("LastName", dataProfile.LastName);
                    sessionStorage.setItem("userAccount", category);
          
                    // var userPhone = dataProfile.phone != null ? dataProfile.phone : "";
          
                    // sendSMS(userPhone, "GoWithMe\n\nYou have logged in your account of GoWithMe at: "+ new Date().toString() +"\n\nThank you.");
          
                    if(category=="Booking"){
                      window.location.href="services&product.html";
                    }else if(category=="Training"){
                      window.location.href="index.html";
                    }else if(category=="Admin"){
                      window.location.href="admin/index.html";
                    }else {
                      window.location.href="index.html";
                    }
          
                });          
          

              });

        });

 
	