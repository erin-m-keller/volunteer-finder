/* Logic goes here */
let preferredUsers = [];
let savedPreferredUsers = [];

function init() {
    
    // this will return and array of obj's
    retriveUsers(10);   


}

function retriveUsers(numHowManyUsersYouWant){
    let requestUrl = `https://random-data-api.com/api/v2/users?size=${numHowManyUsersYouWant}&response_type=json`;

    fetch(requestUrl)
      .then(function(response){
        return response.json();
      })
      .then(function(data){
        //do some thing with your data
        //maybe give it a card
        let currentUser;
        for (let index = 0; index < data.length; index++) {
            
        }
      });


}

function loadPreferredUsers(){

try {
    savedPreferredUsers = JSON.parse(localStorage.getItem('SomethingWeDecideOn'));
} catch (error) {
    
}

}

function savePreferredUsers(userObj){

    try {
        preferredUsers = JSON.parse(localStorage.getItem('SomethingWeDecideOn'));
    } catch (error) {
        
    }  
    
    localStorage.setItem()

}

init();
function switchLogin(evt, tabName) {
  var i, x, tablinks;
  x = document.getElementsByClassName("content-tab");
  for (i = 0; i < x.length; i++) {
      x[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tab");
  for (i = 0; i < x.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" is-active", "");
  }
  document.getElementById(tabName).style.display = "block";
  evt.currentTarget.className += " is-active";
}
