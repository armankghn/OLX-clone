var db = firebase.database();
var adKey = localStorage.getItem('currentadKey');
var table= document.getElementById('content');
var currentUser = localStorage.getItem("userID");
firebase.database().ref().child('posts').on('child_added',snapshot => {
    // var postObject = snapshot.val();
    // console.log(postObject);
    // console.log(snapshot.key);
    // var keys = Object.keys(postObject)
     // ...
     if(adKey==snapshot.key){
       if(snapshot.val().sellerID!==currentUser){
        document.getElementById('chat-button').style.display='block';
       }
     var row = generateRow(snapshot.val(),snapshot.key);
     table.innerHTML = row;}
 // addCommentElement(postElement, data.key, data.val().text, data.val().author);
});

function generateRow(data, key) {
    return `

    <h1 class="my-4">${data.ad}</h1>

    <!-- Portfolio Item Row -->
    <div class="row">

      <div class="col-md-8">

      <a class="portfolio-item d-block mx-auto" href='${data.url}'>
        <img class="img-fluid" src=${data.url} alt=""></a>
      </div>

      <div class="col-md-4">
        <h3 class="my-3">Contact Details</h3>
        <ul class="list-group list-group-flush">

                <li class="list-group-item"><label for="youridhere" class="static-value">Name: &nbsp </label>${data.sellerName}</li>

                <li class="list-group-item"><label for="youridhere" class="static-value">Phone: &nbsp </label>${data.phoneNumber}</li>

                <li class="list-group-item"><label for="youridhere" class="static-value">City: &nbsp </label>${data.city}</li>
              </ul>
        <h3 class="my-3">Product Details</h3>
        <ul class="list-group list-group-flush">

                <li class="list-group-item"><label for="youridhere" class="static-value">Price: &nbsp </label>${data.price}</li>

                <li class="list-group-item"><label for="youridhere" class="static-value">Category: &nbsp </label><a href="#" class="card-link" id="category">${data.category}</a></li>
                <li class="list-group-item" ><a href=""  onclick="fav();" class="card-link" id="category">Add to Favourite</a></li>


              </ul>
      </div>

    </div>
    <!-- /.row -->

            `
    }

// create chat thread
    function chat(){

      db.ref().child('posts').on('child_added',snapshot => {

      if(snapshot.key==adKey){
        db.ref(`chat/buyer/${currentUser}/${adKey}`).set(snapshot.val())
        db.ref(`chat/seller/${snapshot.val().sellerID}/${currentUser}/${adKey}`).set(snapshot.val())
      }
      });


    }



//user name and pic menu dropdowm
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


    });


// add to favourite
function fav(){
  var adKey = localStorage.getItem('currentadKey');
  var currentUser = localStorage.getItem("userID");
  
    
      firebase.database().ref(`userData/${currentUser}/`).on('child_added', snapshot=>{
          var userKey =snapshot.key;
          // firebase.database().ref().child(`userData/${currentUser}/${userKey}/favourites/${adKey}`).on('child_added',snapshot=>{
          //   var validkey= snapshot.key;
          //   setfav(validkey);
          // });
          firebase.database().ref('posts').on('child_added',snapshot => {
            if(adKey==snapshot.key ){
          firebase.database().ref().child(`userData/${currentUser}/${userKey}/favourites/${adKey}/`).set(snapshot.val());
            }
      })
  
      })
}

//delete data
// function deleteData(){
//   var adKey = localStorage.getItem('currentadKey');
//   var currentUser = localStorage.getItem("userID");
//   firebase.database().ref().child(adKey).remove()

// }