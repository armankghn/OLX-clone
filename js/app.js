if ('serviceWorker' in navigator) {
    window.addEventListener('load', ev => {
      navigator.serviceWorker.register('sw.js')
        .then(res => console.log('registered!!!'))
        .catch(err => console.log(err));
    })
  }
function locationIndex(){
    window.location= 'index.html';
}
function locationSignup(){
    window.location= 'signup.html';
}
function locationSignin(){
    window.location= 'signin.html';
}
function locationhome(){
    window.location= 'home.html';
}
function locationad(){
    location = "adsform.html";
}




//signin
var auth = firebase.auth();
var db = firebase.database();
var emailRef = document.getElementById("email");
var passRef = document.getElementById("password");
var validation=document.getElementById('error');

function SignIn()
{
    const promise= auth.signInWithEmailAndPassword(emailRef.value, passRef.value);
        promise.then((success) => {
        locationhome();
        localStorage.setItem('userID',firebase.auth().currentUser.uid);
     })
    promise.catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
        
        validation.innerHTML=error.message;
        // window.alert('Error:'+ error.message);
      });
   

     



}
function valid(){
    validation.innerHTML='';
}

var email = document.getElementById("email1");
var pass = document.getElementById("password1");

function SignUp()
{

    const promise= auth.createUserWithEmailAndPassword(email.value, pass.value);
     promise.then((success) => {
        var abc=success.user.uid;
         userData(abc);
        //  
     })
    promise.catch((err) => {
        console.error(err);
    })
}

function userData(abc){
    
    var email = document.getElementById("email1");
    var pass = document.getElementById("password1");
    var username = document.getElementById("name");
    var profilepic = document.getElementById('p_pic');
    var currentUser = localStorage.getItem("userID");
    var _db = firebase.database();
    var xyz =abc;

 // Create a root reference
 var selectedFile = profilepic.files[0];
 var fileName = profilepic.files[0].name;
 var storageRef = firebase.storage().ref('profilePics/'+ fileName );
 var uploadTask = storageRef.put(selectedFile);


// Register three observers:
    // 1. 'state_changed' observer, called any time the state changes
    // 2. Error observer, called on failure
    // 3. Completion observer, called on successful completion
    uploadTask.on('state_changed', function(snapshot){
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        console.log(xyz)
        switch (snapshot.state) {
            case firebase.storage.TaskState.PAUSED: // or 'paused'
            console.log('Upload is paused');
            break;
            case firebase.storage.TaskState.RUNNING: // or 'running'
            console.log('Upload is running');
            break;
        }
        }, function(error) {
          // Handle unsuccessful uploads
        }, function() {
         // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
    
            uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
            // console.log(xyz)
            // console.log(downloadURL)
            //console.log('File available at', downloadURL);
            var postKey = firebase.database().ref(`userData/`).push().key;
            var updates= {};
            var postData ={
                user: username.value,
                email: email.value,
                password: pass.value,
                pic: downloadURL
                
            }
            updates[`/userData/${xyz}/`+ postKey]= postData;
            firebase.database().ref().update(updates);
            location = "index.html";
            
        });
    
    });
    


}

//signout
function logOut(){
    firebase.auth().signOut().then(function() {
        // Sign-out successful.
        location = "index.html";
      }).catch(function(error) {
        // An error happened.
      });
}

//ad data upload

var fileInput = document.getElementById('picture');
var currentUser = localStorage.getItem("userID");
function upload(){    
    var price= document.getElementById('price').value;
   // console.log(price);
    var adName = document.getElementById('adName').value;
   // console.log(adName);
    var sel = document.getElementById('category').value;
   // console.log(sel);
    var Sname = document.getElementById('sellername').value;
   // console.log(Sname);
    var phone = document.getElementById('cell').value;
   // console.log(phone);
    var city = document.getElementById('city').value;
   // console.log(city);
   

    // Create a root reference
    var selectedFile = fileInput.files[0];
    var fileName = fileInput.files[0].name;
    var storageRef = firebase.storage().ref('images/'+ fileName );
    var uploadTask = storageRef.put(selectedFile);

    
    // Register three observers:
    // 1. 'state_changed' observer, called any time the state changes
    // 2. Error observer, called on failure
    // 3. Completion observer, called on successful completion
    uploadTask.on('state_changed', function(snapshot){
    // Observe state change events such as progress, pause, and resume
    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
    var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log('Upload is ' + progress + '% done');
    switch (snapshot.state) {
        case firebase.storage.TaskState.PAUSED: // or 'paused'
        console.log('Upload is paused');
        break;
        case firebase.storage.TaskState.RUNNING: // or 'running'
        console.log('Upload is running');
        break;
    }
    }, function(error) {
      // Handle unsuccessful uploads
    }, function() {
     // Handle successful uploads on complete
    // For instance, get the download URL: https://firebasestorage.googleapis.com/...

        uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
  
        //console.log('File available at', downloadURL);
        var postKey = firebase.database().ref('Posts/').push().key;
        var updates= {};
        var postData ={
            ad : adName,
            category: sel,
            url: downloadURL,
            sellerName: Sname,
            phoneNumber: phone,
            city: city,
            price: price,
            sellerID: currentUser
            
        }
        updates['/posts/'+ postKey]= postData;
        firebase.database().ref().update(updates);
       
        window.location='home.html';
        
    });

});

   
}


// post data
fetchTodos();

      function fetchTodos(){
        var table = document.getElementById('main1');
       firebase.database().ref().child('posts').on('child_added',snapshot => {
       // var postObject = snapshot.val();
       // console.log(postObject);
       // console.log(snapshot.key);
       // var keys = Object.keys(postObject)
        // ...
        var row = generateRow(snapshot.val(),snapshot.key);
        table.innerHTML += row;
    // addCommentElement(postElement, data.key, data.val().text, data.val().author);
  });
     
    }


    
    function generateRow(data, key) { 
      return `
      
        <div class="col-sm " >

        <div class="card " style="width: 18rem;" id='main' onclick="adLocation('${key}')">
                <img class="card-img-top" src=${data.url} alt="Card image cap" style="width: 17rem; height: 200px;" id="picture">
                <div class="card-body">
                  <h5 class="card-title" id="adTitle">${data.ad}</h5>
                  
                 <p class="card-title" ><label for="youridhere" class="static-value">Price: &nbsp </label>${data.price}</p>
                                      
                  
                  <a href="#" class="card-link" id="category">${data.category}</a>
                </div>
                <ul class="list-group list-group-flush">
                 
                  <li class="list-group-item">${data.sellerName}</li>
                 
                  <li class="list-group-item">${data.phoneNumber}</li>
                
                  <li class="list-group-item">${data.city}</li>
                </ul>
        
              </div>
              </div>
              
              `
      } 


      function adLocation(key){
          localStorage.setItem("currentadKey",key);
              location = "currentAd.html";
    }


//search engine
var search = document.getElementById("input-search");

search.addEventListener('keypress',function(e){
    if (13 == e.keyCode) {
        FilterDiv();
     }
} );
  
  function FilterDiv()
  {
      var searchVal = search.value.toUpperCase();
      // console.log(searchVal);
  
      //let  = document.getElementById("add-view-div");
      let childDiv = document.querySelectorAll("div.col-sm");

      for(var i = 0; i < childDiv.length; i++)
      {
          h5 = childDiv[i].getElementsByTagName("h5")[0];
          if(h5.innerText.toUpperCase().indexOf(searchVal) > -1)
          {
              childDiv[i].style.display = "block";
          }
          else
          {
              childDiv[i].style.display = "none";
          }
          location= '#latestads';
      }
  }

  var profile = document.getElementById('profile');
db.ref('userData/').on('child_added',snapshot =>{
if(currentUser==snapshot.key){
    // console.log(snapshot.key);
    db.ref(`userData/${currentUser}`).on('child_added',snapshot =>{
    profile.innerHTML=`
    <div class="dropdown show,nav-item mx-0 mx-lg-1" >
    <a class="btn btn-secondary dropdown-toggle,nav-link py-3 px-0 px-lg-3 rounded js-scroll-trigger" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
    ${snapshot.val().user}
    <img src='${snapshot.val().pic}' width="30" height="30" class="d-inline-block align-top" id='profileimg' alt="">
    </a>
  
    <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
      <a class="dropdown-item" href="buyerChat.html">Buyer Messages</a>
      <a class="dropdown-item" href="sellerChat.html">Seller Messages</a>
      <a class="dropdown-item" href="favourite.html">favourites</a>

      <a class="dropdown-item"  onclick="logOut()" >Logout</a>
    </div>
  </div>     
    `
    });

}


})


/* <a class="nav-link py-3 px-0 px-lg-3 rounded js-scroll-trigger"  href="#">${snapshot.val().user}
    <img src='${snapshot.val().pic}' width="30" height="30" class="d-inline-block align-top" id='profileimg' alt="">
    
  </a> */

//   <a class="dropdown-item" id="subscribe"   onclick="subscribeToNotifications()">Subscribe</a>
//   <a class="dropdown-item" id="unsubscribe"  onclick="unsubscribeFromNotifications()" >Unubscribe</a>

