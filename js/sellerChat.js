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
  //  console.log(snapshot.key);
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
firebase.database().ref().child(`chat/seller/${currentUser}/`).on('child_added', function (snapshot) {
    // myads.push(data.key)
    var data=snapshot.val();
    for(var key in data) {
        table.innerHTML += abc(data[key], snapshot.key, key);
        // console.log(snapshot.val(), snapshot.key, key)
    }    
})    
function abc(ad, buyerkey, adkey) {
    return `
    <li class="contact" onclick="genID('${buyerkey}', '${adkey}'); getadkey('${adkey}','${buyerkey}');">
    <div class="wrap">
        <img src=${ad.url} alt="" />
        <div class="meta">
            <p class="name">${ad.ad}</p>
            <p class="preview">${ad.category}</p>
        </div>
    </div>
    </li>    
    
    `

}
function getadkey(forAdKey,bID){
    
    localStorage.removeItem('secondaryadkey')
    localStorage.setItem('secondaryadkey',forAdKey);
    localStorage.removeItem('secondarybuyerID');
    localStorage.setItem('secondarybuyerID',bID);
    chatData();
   

}

function chatData(){
    var sKey = localStorage.getItem('secondaryadkey');
    var bID = localStorage.getItem('secondarybuyerID'); 
    chat.innerHTML='';
    firebase.database().ref().child(`chat/seller/${currentUser}/${bID}/${sKey}/sellerMessages/`).on('child_added',snapshot => {
        chat.innerHTML+=`
        <li class="replies">
        <img src="http://emilcarlsson.se/assets/harveyspecter.png" alt="" />
                    <p>${snapshot.val().message}</p>
                    </li>
        `
    });
    firebase.database().ref().child(`chat/buyer/${bID}/${sKey}/buyerMessages/`).on('child_added',snapshot => {
        chat.innerHTML+=`
        <li class="sent">
        <img src="http://emilcarlsson.se/assets/harveyspecter.png" alt="" />
                    <p>${snapshot.val().message}</p>
                    </li>
        `
    });
    
}



//*******on click on left ads open its buyer data *******
function genID(bID, key) {
    
    var table1 = document.getElementById('data1');
    firebase.database().ref().child(`userData/`).on('child_added', snapshot => {
        if(bID==snapshot.key){
            db.ref(`userData/${bID}`).on('child_added',snapshot =>{
            table1.innerHTML = fill(snapshot.val());
        });
        }
   

    });
    function fill( ad){
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
    var bID = localStorage.getItem('secondarybuyerID');
    var sellerRef=firebase.database().ref(`chat/seller/${currentUser}/${bID}/${sKey}/sellerMessages/`);
    sellerRef.push().set({
        message: msg_text.value,
        time: date.getTime()
    }).then(chatData());

    var buyerRef =firebase.database().ref(`chat/buyer/${bID}/${sKey}/sellerMessages/`);
    buyerRef.push().set({
        message: msg_text.value,
        time: date.getTime()
    }).then(chatData());
    
    
    inputbox.value='';

}