document.getElementById("Admin").innerHTML = sessionStorage.getItem("Email");


//logout
const logout=document.querySelector("#logout");
      logout.addEventListener('click',(e)=>{
        e.preventDefault();

        auth.signOut().then(()=>{
         
          window.location.href="../index.html";
        });
    });

//retrieve Trainers list

database.ref('Trainers').on('value',function(snapshot){
    var htmlregisterAll = "";
    var childCounts = snapshot.numChildren();
    var t = 0;
    var i = childCounts + 1;
   
    snapshot.forEach(function(childSnapshot){
        if(t==0){
            htmlregisterAll = "";  
        }
        t++;
        i--;
        var childUID = childSnapshot.key;
        var childData = childSnapshot.val();
        var htmlRegister="";
        htmlRegister+="<tr>";
        htmlRegister+="<td>"+i+"</td>";
        htmlRegister+="<td>"+childData.FirstName+"</td>";
        htmlRegister+="<td>"+childData.MiddleName+"</td>";
        htmlRegister+="<td>"+childData.LastName+"</td>";
        htmlRegister+="<td>"+childData.PhoneNumber+"</td>";
        htmlRegister+="<td>"+childData.Category+"</td>";
        htmlRegister+="<td><a href='#Trainerdelete'class='btn btn-danger btn-circle'><i class='fas fa-trash'onclick=\"Trainerdelete("+"'linedeleteregister"+childUID + "', '"+childUID+"')\"" +" ></i></a>";
        htmlRegister+="</td>";
        htmlRegister+="</tr>";
        htmlregisterAll = htmlRegister + htmlregisterAll;
        if(t == childCounts) {
            document.getElementById("trainers").innerHTML=htmlregisterAll ;

        
            
        }
    });
});
//count the trainers
database.ref('Trainers').on('value', function(snapshot) {

    var childCounts = snapshot.numChildren();
    
    var i = 0;

    var Trainers = 0;
   
    snapshot.forEach(function(childSnapshot) {

      i++;
      var childData = childSnapshot.val();

      if(childData.Category == "Trainer") {
        Trainers++;
      }

      if(i == childCounts) {
        document.getElementById("trainer").innerHTML=Trainers;
      }

    });
});
//count the Clients
database.ref('Clients').on('value', function(snapshot) {

    var childCounts = snapshot.numChildren();
    
    var i = 0;

    var Clients = 0;
   
    snapshot.forEach(function(childSnapshot) {

      i++;
      var childData = childSnapshot.val();

      if(childData.Category == "Booking") {
        Clients++;
      }

      if(i == childCounts) {
        document.getElementById("client").innerHTML=Clients;
      }

    });
});
//count the wedding
database.ref('Wedding').on('value', function(snapshot) {

    var childCounts = snapshot.numChildren();
    
    var i = 0;

    var Wedding = 0;
   
    snapshot.forEach(function(childSnapshot) {

      i++;
      Wedding++;

      if(i == childCounts) {
        document.getElementById("wedding").innerHTML=Wedding;
      }

    });
});
//count the birtday
database.ref('Birthday').on('value', function(snapshot) {

    var childCounts = snapshot.numChildren();
    
    var i = 0;

    var Birthday = 0;
   
    snapshot.forEach(function(childSnapshot) {

      i++;
      var childData = childSnapshot.val();

        Birthday++;
    

      if(i == childCounts) {
        document.getElementById("birthday").innerHTML=Birthday;
      }

    });
});
//count the Ceremoniy
database.ref('Graduation').on('value', function(snapshot) {

    var childCounts = snapshot.numChildren();
    
    var i = 0;

    var Graduation = 0;
   
    snapshot.forEach(function(childSnapshot) {

      i++;
     
      Graduation++;

      if(i == childCounts) {
        document.getElementById("graduation").innerHTML=Graduation;
      }

    });
});
//count the Clients
database.ref('Special').on('value', function(snapshot) {

    var childCounts = snapshot.numChildren();
    
    var i = 0;

    var Special = 0;
   
    snapshot.forEach(function(childSnapshot) {

      i++;
      Special++;  
      if(i == childCounts) {
        document.getElementById("special").innerHTML=Special;
      }

    });
});



function Trainerdelete(childUID, user_id) {
                              
    database.ref('Trainers').child(user_id).remove().then(resut => {
     
      alert("user sucessfully deleted");

      var element = document.getElementById(childUID);
 
      document.getElementById("trainers").removeChild(element);

    });

  }

  //list of clients

  database.ref('Clients').on('value',function(snapshot){
    var htmlClientsAll = "";
    var childCounts = snapshot.numChildren();
    var t = 0;
    var i = childCounts + 1;
   
    snapshot.forEach(function(childSnapshot){
        if(t==0){
            htmlClientsAll = "";  
        }
        t++;
        i--;
        var childUID = childSnapshot.key;
        var childData = childSnapshot.val();
        var htmlClients="";
            htmlClients+="<tr>";
            htmlClients+="<td>"+i+"</td>";
            htmlClients+="<td>"+childData.FirstName+"</td>";
            htmlClients+="<td>"+childData.MiddleName+"</td>";
            htmlClients+="<td>"+childData.LastName+"</td>";
            htmlClients+="<td>"+childData.PhoneNumber+"</td>";
            htmlClients+="<td>"+childData.Category+"</td>";
            htmlClients+="<td><a href='#userdelete'class='btn btn-danger btn-circle'><i class='fas fa-trash'onclick=\"userdelete("+"'linedeleteregister"+childUID + "', '"+childUID+"')\"" +" ></i></a>";
            htmlClients+="</td>";
            htmlClients+="</tr>";
            htmlClientsAll = htmlClients + htmlClientsAll;
        if(t == childCounts) {
            document.getElementById("clients").innerHTML=htmlClientsAll ;
        }

       
    });
});
function userdelete(childUID, user_id) {
                              
    database.ref('Clients').child(user_id).remove().then(resut => {
     
      alert("user sucessfully deleted");

      var element = document.getElementById(childUID);
 
      document.getElementById("clients").removeChild(element);

    });

  }

  //checkbox
  var ischecked = "";
 function detect_wedding() {

    var detect_wedding = document.getElementById("wedding");

    if(detect_wedding.checked == true) {
        ischecked = "Wedding";
     document.getElementById("birthday").checked = false;
     document.getElementById("graduation").checked = false;
     document.getElementById("special").checked = false;
    }
    }
    
    function detect_birthday() {
    
    var detect_birthday = document.getElementById("birthday");
    
    if(detect_birthday.checked == true) {
        ischecked = "Birthday";
        document.getElementById("wedding").checked = false;
        document.getElementById("graduation").checked = false;
        document.getElementById("special").checked = false;
    }
    }
    function detect_graduation() {
    
    var detect_graduation = document.getElementById("graduation");
    
    if(detect_graduation.checked == true) {
        ischecked = "Graduation";
        document.getElementById("wedding").checked = false;
        document.getElementById("birthday").checked = false;
        document.getElementById("special").checked = false;
    }
    }
    function detect_special() {
    
    var detect_special = document.getElementById("special");
    
    if(detect_special.checked == true) {
        ischecked = "Special";
        document.getElementById("wedding").checked = false;
        document.getElementById("birthday").checked = false;
        document.getElementById("graduation").checked = false;
    }
    }
    var uid=database.ref('Photo').push().key;
    
