
// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyAVrvfYpZI8Di8UrLLVWnBxRVt_kSKNoto",
    authDomain: "home-of-cake.firebaseapp.com",
    databaseURL: "https://home-of-cake.firebaseio.com",
    projectId: "home-of-cake",
    storageBucket: "home-of-cake.appspot.com",
    messagingSenderId: "342936516946",
    appId: "1:342936516946:web:45e435dc6f16d194b3228b",
    measurementId: "G-3WLTFJYNTR"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  const auth = firebase.auth();
  const database = firebase.database();
  firebase.analytics();

document.querySelector("#Admin").innerHTML = sessionStorage.getItem("Email");

if(window.location.href.includes('orders.html')){

//list of Orders

main()
async function main() {

    const snap = await database.ref('orders')
    .once('value');

    let htmls = '';
    await snap.forEach(async (val, i) => {
        const childData = await val.val();
        if(childData){
            htmls += `<tr>
                <td>${childData.FullName}</td>
                <td class="text-center"><img src="${childData.Photo}" alt="" class="img-fluid img-thumbnail"style="max-width:100%;max-height:200px; height:auto; display:block;"</td>
                <td>${childData.Date}</td>
                <td>${childData.Time}</td>
                <td>${childData.Total}</td>
                <td>${childData.Description}</td>
                <td>${childData.Quantity}</td>
            </tr>`;
        }
    });
setTimeout(() => {
    document.querySelector("#orders-list-output").innerHTML=htmls ;
},4000)

}

// database.ref('Orders').on('value', function(snapshot){
//     var htmlOrdersAll = "";
//     var childCounts = snapshot.numChildren();
//     var t = 0;
//     var i = childCounts + 1;
    
//     snapshot.forEach(function(childSnapshot){
        
//         console.log(childSnapshot)
//         if(t==0){
//             htmlOrdersAll = "";  
//         }
//         t++;
//         i--;
//         var childUID = childSnapshot.key;
//         var childData = childSnapshot.val();
//         var htmlOrders=`
//             <tr>
//                 <td>${i}</td>
//                 <td>${childData.FirstName}</td>
//                 <td>${childData.MiddleName}</td>
//                 <td>${childData.LastName}</td>
//                 <td>${childData.PhoneNumber}</td>
//                 <td>${childData.Category}</td>
//                 <td><a href='#userdelete' class='btn btn-danger btn-circle'><i class='fas fa-trash'onclick="userdelete('linedeleteregister${childUID}', ${childUID})}"></i></a></td>
//             </tr>`;
//             htmlOrdersAll += htmlOrders;
//         if(t == childCounts) {
//             document.querySelector("#orders-list-output").innerHTML=htmlOrdersAll ;
//         }

       
//     });
// });
}

//logout
const logout=document.querySelector("#logout");
logout.addEventListener('click',(e)=>{
        e.preventDefault();

        auth.signOut().then(()=>{
         
          window.location.href="../index.html";
        });
    });

if(window.location.href.includes('trainers.html')){
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
}

if(window.location.href.includes('clients.html')){


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
function userdelete(childUID, user_id) {
                              
    database.ref('Clients').child(user_id).remove().then(resut => {
     
      alert("user sucessfully deleted");

      var element = document.getElementById(childUID);
 
      document.querySelector("#clients").removeChild(element);

    });

  }

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
    
