
/**
 * @init
 * Runs on page load
 */
function init () {
  // initialize variables
  let userObj = JSON.parse(localStorage.getItem("user")),
      updatedUserObj = JSON.parse(localStorage.getItem("updatedUser"));
  // if the user has previously updated their data
  if (updatedUserObj) {
    buildUserProfile(updatedUserObj);
  } 
  // else use login user object
  else {
    buildUserProfile(userObj);
  }
}

/**
 * @toggleMobileMenu
 * Toggles the mobile menu and
 * hamburger on click
 */
function toggleMobileMenu () {
  // initialize variables
  let burgerBtn = document.getElementById("burger-btn"),
      navMenu = document.getElementById("nav-menu");
  // if active, remove classes
  if (burgerBtn.classList.contains("is-active")) {
    burgerBtn.classList.remove("is-active");
    navMenu.classList.remove("is-active");
  } 
  // else add is-active class
  else {
    burgerBtn.classList.add("is-active");
    navMenu.classList.add("is-active");
  }
}

/**
 * @displayConfirmModal
 * Displays a confirm modal to the user
 */
function displayConfirmModal () {
  // initialize variables
  let confirmModal = document.getElementById("confirm-modal");
  // add class is-active
  confirmModal.classList.add("is-active");
}

/**
 * @closeConfirmModal
 * Closes the confirm modal
 */
function closeConfirmModal () {
  // initialize variables
  let confirmModal = document.getElementById("confirm-modal");
  // add class is-active
  confirmModal.classList.remove("is-active");
}

/**
 * @closeMsg
 * Closes the success message
 * on the page
 */
function closeMsg() {
  // initialize variables
  let successMsg = document.getElementById("success-msg");
  // hide success message
  successMsg.style.display = "none";
}

/**
 * @buildUserProfile
 * Grabs user data from local storage to 
 * initially populate the page
 */
function buildUserProfile (userObj) {
  // initialize variables
  let userImg = document.getElementById("user-image"),
      userName = document.getElementById("user-name"),
      userEmail = document.getElementById("user-email"),
      userBusn = document.getElementById("user-business");
  // if there is an image url, use that image
  if (userObj.photo) {
    userImg.src = userObj.photo;
  } 
  // otherwise use a placeholder image
  else {
    userImg.src = "./assets/images/placeholder.jpeg";
  }
  // update the inputs on the page
  userName.value = userObj.name;
  userEmail.value = userObj.email;
  userBusn.value = userObj.businessName;
}

/**
 * @updateUserProfile
 * Updates the users details in local
 * storage, shows a success message, 
 * and closes the confirm modal
 */
function updateUserProfile () {
  // initialize variables
  let userName = document.getElementById("user-name").value,
      userEmail = document.getElementById("user-email").value,
      userBusn = document.getElementById("user-business").value,
      userImg = document.getElementById("user-image").src,
      successMsg = document.getElementById("success-msg"),
      updatedUserObj = {
        "name": userName,
        "email": userEmail,
        "photo": userImg,
        "businessName": userBusn,
      };
  // create an updated user obj in local storage
  localStorage.setItem("updatedUser",JSON.stringify(updatedUserObj));
  // show success message
  successMsg.style.display = "block";
  // close modal
  closeConfirmModal();
}

// runs on page load
init();