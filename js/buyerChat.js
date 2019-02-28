var db = firebase.database();
var currentUser = localStorage.getItem("userID");
var table = document.getElementById('conversation');
var msg_text = document.getElementById('text');
var chat = document.getElementById('chat');
var date = new Date();


//*******current user profile pic *******
var profile = document.getElementById('profile');
db.ref('userData/').on('child_added',snapshot =>{
if(currentUser==snapshot.key){
    // console.log(snapshot.key);
    db.ref(`userData/${currentUser}`).on('child_added',snapshot =>{
    profile.innerHTML=`
    <div class="wrap">
				<img id="profile-img" src='${snapshot.val().pic}' class="online" alt="" />
				<p>${snapshot.val().user}</p>
				
            </div>`
    });


}


})


//*******ads displayed on the left*******

firebase.database().ref(`chat/buyer/${currentUser}`).on('child_added', function (snapshot) {
  
    table.innerHTML += `
    <li class="contact" onclick="genID('${snapshot.val().sellerID}', '${snapshot.key}') ;getadkey('${snapshot.key}','${snapshot.val().sellerID}');">
    <div class="wrap">
        <img src=${snapshot.val().url} alt="" />
        <div class="meta">
            <p class="name">${snapshot.val().ad}</p>
            <p class="preview">${snapshot.val().category}</p>
        </div>
    </div>
    </li>    
    
    `
})


function getadkey(forAdKey,sID){
    
    localStorage.removeItem('secondaryadkey')
    localStorage.setItem('secondaryadkey',forAdKey);
    localStorage.removeItem('secondarysellerID');
    localStorage.setItem('secondarysellerID',sID);
    chatData();
   

}

function chatData(){
    var sKey = localStorage.getItem('secondaryadkey');
    var sID = localStorage.getItem('secondarysellerID'); 
    chat.innerHTML='';
    firebase.database().ref().child(`chat/buyer/${currentUser}/${sKey}/buyerMessages/`).on('child_added',snapshot => {
        chat.innerHTML+=`
        <li class="replies">
        <img src="http://emilcarlsson.se/assets/harveyspecter.png" alt="" />
                    <p>${snapshot.val().message}</p>
                    </li>
        `
    });
    firebase.database().ref().child(`chat/seller/${sID}/${currentUser}/${sKey}/sellerMessages/`).on('child_added',snapshot => {
        chat.innerHTML+=`
        <li class="sent">
        <img src="http://emilcarlsson.se/assets/harveyspecter.png" alt="" />
                    <p>${snapshot.val().message}</p>
                    </li>
        `
    });
    
}



//*******on click on left ads open its seller data *******
function genID(sID, key) {
    var table1 = document.getElementById('data');
    table1.innerHTML='';
    firebase.database().ref().child(`chat/buyer/${currentUser}`).on('child_added', snapshot => {
        
        
      if(sID==snapshot.val().sellerID){
        db.ref(`userData/${sID}`).on('child_added',snapshot =>{
            table1.innerHTML = fill1(snapshot.val());
        });
      }

    });
    function fill1( ad){
        return `
        <div class="wrap">
        <img id="inbox-img" src=${ad.pic} alt="" />
        <p>${ad.user}</p>
        </div>
        `
        }
}


function send(){
    var inputbox =document.getElementById('text');
    var sKey = localStorage.getItem('secondaryadkey');
    var sID = localStorage.getItem('secondarysellerID');
    var buyerRef =firebase.database().ref(`chat/buyer/${currentUser}/${sKey}/buyerMessages/`);
    buyerRef.push().set({
        message: msg_text.value,
        time: date.getTime()
    }).then(chatData());
    
    var sellerRef=firebase.database().ref(`chat/seller/${sID}/${currentUser}/${sKey}/buyerMessages/`);
    sellerRef.push().set({
        message: msg_text.value,
        time: date.getTime()
    }).then(chatData());
    inputbox.value='';

}
