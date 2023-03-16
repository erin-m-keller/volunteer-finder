// Initialize global variables
let preferredUsers = [];
let savedPreferredUsers = [];

/**
 * @init
 * Runs on page load
 */
function init() {
  // this will return and array of obj's
  retriveUsers(10);   
}
init();

/**
 * @toggleLogin
 * Allows the user to toggle between the
 * login screen and create account screen
 */
function toggleLogin (elemId) {
  // initialize variables
  var tabContent = document.querySelectorAll('.tab-content');
  // loop through all elements with the class "tab-content"
  for (var i = 0; i < tabContent.length; i++) {
    // initialize variables
    var contentElement = tabContent[i],
        dataTarget = document.querySelector(`[data-target="${contentElement.id}"]`);
    // hide the tab content
    contentElement.style.display = contentElement.id === elemId ? 'block' : 'none';
    // switch the is-active class on the tabs
    dataTarget.classList[contentElement.id === elemId ? 'add' : 'remove']('is-active');
  }
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
