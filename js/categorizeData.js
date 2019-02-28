function mobile(){
    var table = document.getElementById('main1');
    table.innerHTML="";
    firebase.database().ref().child('posts').on('child_added',snapshot => {
    //  var postObject = snapshot.val();
    // console.log(postObject);
    // console.log(snapshot.val().category);
    //  var keys = Object.keys(postObject)
     //console.log(snapshot.val().category);
      if(snapshot.val().category== "mobile"){
        var row = generateRow(snapshot.val(),snapshot.key);
        table.innerHTML += row;
      }
     // ...
     
     
  
 
 // addCommentElement(postElement, data.key, data.val().text, data.val().author);
});
location="#main1";
}

function jobs(){
  var table = document.getElementById('main1');
  table.innerHTML="";
  firebase.database().ref().child('posts').on('child_added',snapshot => {
  //  var postObject = snapshot.val();
  // console.log(postObject);
  // console.log(snapshot.val().category);
  //  var keys = Object.keys(postObject)
   //console.log(snapshot.val().category);
    if(snapshot.val().category== "jobs"){
      var row = generateRow(snapshot.val(),snapshot.key);
      table.innerHTML += row;
    }
   // ...
   
   


// addCommentElement(postElement, data.key, data.val().text, data.val().author);
});
location="#main1";
}

function fashion(){
  var table = document.getElementById('main1');
  table.innerHTML="";
  firebase.database().ref().child('posts').on('child_added',snapshot => {
   //var postObject = snapshot.val();
  // console.log(postObject);
  // console.log(snapshot.val().category);
   //var keys = Object.keys(postObject)
   //console.log(snapshot.val().category);
    if(snapshot.val().category== "fashion"){
      var row = generateRow(snapshot.val(),snapshot.key);
      table.innerHTML += row;
    }
   // ...
   
   


// addCommentElement(postElement, data.key, data.val().text, data.val().author);
});
location="#main1";
}

function electronics(){
  var table = document.getElementById('main1');
  table.innerHTML="";
  firebase.database().ref().child('posts').on('child_added',snapshot => {
  // var postObject = snapshot.val();
  // console.log(postObject);
  // console.log(snapshot.val().category);
  // var keys = Object.keys(postObject)
   //console.log(snapshot.val().category);
    if(snapshot.val().category== "electronics"){
      var row = generateRow(snapshot.val(),snapshot.key);
      table.innerHTML += row;
    }
   // ...
   
   


// addCommentElement(postElement, data.key, data.val().text, data.val().author);
});
location="#main1";
}

function bike(){
  var table = document.getElementById('main1');
  table.innerHTML="";
  firebase.database().ref().child('posts').on('child_added',snapshot => {
   // var postObject = snapshot.val();
  // console.log(postObject);
  // console.log(snapshot.val().category);
   //console.log(snapshot.val().category);
    if(snapshot.val().category== "bike"){
      var row = generateRow(snapshot.val(),snapshot.key);
      table.innerHTML += row;
    }
   // ...
   
   


// addCommentElement(postElement, data.key, data.val().text, data.val().author);
});
location="#main1";
}

function services(){
  var table = document.getElementById('main1');
  table.innerHTML="";
  firebase.database().ref().child('posts').on('child_added',snapshot => {
 //  var postObject = snapshot.val();
  // console.log(postObject);
  // console.log(snapshot.val().category);
  // var keys = Object.keys(postObject)
   //console.log(snapshot.val().category);
    if(snapshot.val().category== "services"){
      var row = generateRow(snapshot.val(),snapshot.key);
      table.innerHTML += row;
    }
   // ...
   
   


// addCommentElement(postElement, data.key, data.val().text, data.val().author);
});
location="#main1";
}

function generateRow(data, key) {
    return `
    <div class="col-sm ">

    <div class="card " style="width: 18rem;" onclick="adLocation('${key}')" id='main'>
            <img class="card-img-top" src=${data.url} alt="Card image cap" style="width: 17rem; height: 200px;" id="picture">
            <div class="card-body">
              <h5 class="card-title" id="adTitle">${data.ad}</h5>
              
             <p class="card-title" ><label for="youridhere" class="static-value">Price: &nbsp </label>${data.price}</p>
                                  
              
              <a href="#" class="card-link" id="category">${data.category}</a>
            </div>
            <ul class="list-group list-group-flush">
             
              <li class="list-group-item">${data.sellerName}</li>
             
              <li class="list-group-item">${data.phoneNumber}</li>
            
              <li class="list-group-item" id="city">${data.city}</li>
            </ul>
    
          </div>
          </div>
          
          `
  } 



  function adLocation(key){
    localStorage.setItem("currentadKey",key);
        location = "currentAd.html";
}