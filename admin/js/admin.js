
document.querySelector("#Admin").innerHTML = sessionStorage.getItem("FirstName");

//logout
const logout=document.querySelector("#logout");
logout.addEventListener('click',(e)=>{
        e.preventDefault();

        auth.signOut().then(()=>{
         
          window.location.href="../index.html";
        });
    });

    //count Trainers
    database.ref('Trainers').on('value',function(snapshot){

        var childCounts = snapshot.numChildren();
    
        var i = 0;
    
        var Trainers = 0;
       
        snapshot.forEach(function(childSnapshot) {
    
          i++;
          Trainers++;  
          if(i == childCounts) {
            document.getElementById("Trainers").innerHTML=Trainers;
          }
        });
    });
    //count Clients
    database.ref('Clients').on('value',function(snapshot){

        var childCounts = snapshot.numChildren();
    
        var i = 0;
    
        var Clients = 0;
       
        snapshot.forEach(function(childSnapshot) {
    
          i++;
          Clients++;  
          if(i == childCounts) {
            document.getElementById("Clients").innerHTML=Clients;
          }
        });
    });
    //count wedding
    database.ref('Wedding').on('value',function(snapshot){

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
    //count birthday
    database.ref('Birthday').on('value',function(snapshot){

        var childCounts = snapshot.numChildren();
    
        var i = 0;
    
        var Birthday = 0;
       
        snapshot.forEach(function(childSnapshot) {
    
          i++;
          Birthday++;  
          if(i == childCounts) {
            document.getElementById("birthday").innerHTML=Birthday;
          }
        });
    });
    //count graduation
    database.ref('Graduation').on('value',function(snapshot){

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
    //count Special
    database.ref('Special').on('value',function(snapshot){

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
    //count orders
    database.ref('orders').on('value',function(snapshot){

        var childCounts = snapshot.numChildren();
    
        var i = 0;
    
        var orders = 0;
       
        snapshot.forEach(function(childSnapshot) {
    
          i++;
          orders++;  
          if(i == childCounts) {
            document.getElementById("order").innerHTML=orders;
          }
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
                document.querySelector("#trainers").innerHTML=htmlregisterAll ;
            }
    
           
        });
    });
    
    
    function Trainerdelete(childUID, user_id) {
                                  
        database.ref('Trainers').child(user_id).remove().then(resut => {
         
          alert("user sucessfully deleted");
    
          var element = document.getElementById(childUID);
     
          document.querySelector("#trainers").removeChild(element);
    
        });
    
      }
  //list of clients

  database.ref('Clients').on('value',function(snapshot){
    var htmlOrdersAll = "";
    var childCounts = snapshot.numChildren();
    var t = 0;
    var i = childCounts + 1;
   
    snapshot.forEach(function(childSnapshot){
        if(t==0){
            htmlOrdersAll = "";  
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
            htmlOrdersAll = htmlClients + htmlOrdersAll;
        if(t == childCounts) {
            document.querySelector("#clients").innerHTML=htmlOrdersAll ;
        }

       
    });
});

  //list of Order

  database.ref('orders').on('value',function(snapshot){
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
            htmlClients+="<td>"+childData.FullName+"</td>";
            htmlClients+="<td class='text-center'><img src=\""+childData.Photo+"\"  class='img-fluid img-thumbnail'style='max-width:100%;max-height:200px; height:auto; display:block;'</td>";          
            htmlClients+="<td>"+childData.Date+"-"+childData.Time+"</td>";
            htmlClients+="<td>"+childData.Quantity+"</td>";
            htmlClients+="<td>"+childData.Total+"</td>";
            htmlClients+="<td>"+childData.Description+"</td>";
            htmlClients+="<td><a href='#userdelete'class='btn btn-danger btn-circle'><i class='fas fa-trash'onclick=\"orderdelete("+"'linedeleteregister"+childUID + "', '"+childUID+"')\"" +" ></i></a>";
            htmlClients+="</td>";
            htmlClients+="</tr>";
            htmlClientsAll = htmlClients + htmlClientsAll;
        if(t == childCounts) {
            document.getElementById("orders").innerHTML=htmlClientsAll ;
        }

       
    });
});
function userdelete(childUID, user_id) {
                              
    database.ref('Clients').child(user_id).remove().then(resut => {
     
      alert("user sucessfully deleted");

      var element = document.getElementById(childUID);
 
      document.querySelector("#clients").removeChild(element);

    });

  }
function orderdelete(childUID, user_id) {
                              
    database.ref('orders').child(user_id).remove().then(resut => {
     
      alert("user sucessfully deleted");

      var element = document.getElementById(childUID);
 
      document.querySelector("#orders").removeChild(element);

    });

  }



  //checkbox
  var ischecked = "";
 function detect_wedding() {

    var detect_wedding = document.querySelector("#wedding");

    if(detect_wedding.checked == true) {
        ischecked = "Wedding";
     document.querySelector("#birthday").checked = false;
     document.querySelector("#graduation").checked = false;
     document.querySelector("#special").checked = false;
    }
    }
    
    function detect_birthday() {
    
    var detect_birthday = document.querySelector("#birthday");
    
    if(detect_birthday.checked == true) {
        ischecked = "Birthday";
        document.querySelector("#wedding").checked = false;
        document.querySelector("#graduation").checked = false;
        document.querySelector("#special").checked = false;
    }
    }
    function detect_graduation() {
    
    var detect_graduation = document.querySelector("#graduation");
    
    if(detect_graduation.checked == true) {
        ischecked = "Graduation";
        document.querySelector("#wedding").checked = false;
        document.querySelector("#birthday").checked = false;
        document.querySelector("#special").checked = false;
    }
    }
    function detect_special() {
    
    var detect_special = document.querySelector("#special");
    
    if(detect_special.checked == true) {
        ischecked = "Special";
        document.querySelector("#wedding").checked = false;
        document.querySelector("#birthday").checked = false;
        document.querySelector("#graduation").checked = false;
    }
    }
    var uid=database.ref('Photo').push().key;
    
//count Comment
database.ref('Comments').on('value', function(snapshot) {


    var childCounts = snapshot.numChildren();
    
    var i = 0;

    var Comments = 0;
   
    snapshot.forEach(function(childSnapshot) {

      i++;
      Comments++;  
      if(i == childCounts) {
        document.getElementById("comments").innerHTML=Comments;
      }

      var childUid = snapshot.val();
      var childData = snapshot.val();

      html=`
      <div class="dropdown-list-image mr-3">
        <img class="rounded-circle" src="https://source.unsplash.com/fn_BT9fwg_E/60x60" alt="">
        <div class="status-indicator bg-success"></div>
      </div>
      <div class="font-weight-bold">
        <div class="text-truncate">${childData.message}</div>
        <div class="small text-gray-500">${childData.date}</div>
      </div>  
      `;
      document.getElementById("commentmessage").innerHTML=html;

    });
});
