// initialize variables
let userObj = JSON.parse(localStorage.getItem("user")),
    updatedUserObj = JSON.parse(localStorage.getItem("updatedUser")),
    preferredVolunteers = JSON.parse(localStorage.getItem("preferredUsers"));

/**
 * @init
 * Runs on page load
 */
function init () {
  // if the user has previously updated their data
  if (updatedUserObj) {
    buildUserProfile(updatedUserObj);
  } 
  // else use login user object
  else {
    buildUserProfile(userObj);
  }
  // if the user has added preferred volunteers, load volunteers list
  if (preferredVolunteers && preferredVolunteers.length > 0) {
    loadVolunteers(preferredVolunteers);
  } else {
    document.getElementById("panel-msg").style.display = "block";
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

/**
 * @deletePreferredVolunteer
 * Delete the selected volunteer from
 * the preferred volunteers list
 */
function deletePreferredVolunteer (uid) {
  // initialize variables
  let selectedVolunteer = preferredVolunteers.findIndex((elem) => elem.id === uid);
  // if the selected index is found
  if (selectedVolunteer > -1) {
    // remove the selected volunteer from the array
    preferredVolunteers.splice(selectedVolunteer, 1);
    // update local storage
    localStorage.setItem("preferredUsers", JSON.stringify(preferredVolunteers));
    // get the new storage array
    let newStorage = JSON.parse(localStorage.getItem("preferredUsers"));
    // load the new list of volunteers
    loadVolunteers(newStorage);
  }
}

/**
 * @loadVolunteers
 * Load the user's preferred volunteers
 */
function loadVolunteers (list) {
  // initialize variables
  let link,
      volunteerList = list,
      mainWrapper = document.getElementById("volunteer-list");
  // clear any previous contents
  mainWrapper.innerHTML = "";
  // show message if list is empty
  if (volunteerList.length === 0) { 
    document.getElementById("panel-msg").style.display = "block"; 
  }
  // loop through list and create an anchor element of each volunteer
  for (let i = 0; i < volunteerList.length; i++) {
    let div = document.createElement("div"),
        anchor = document.createElement("a"),
        trashAnchor = document.createElement("a"),
        span = document.createElement("span"),
        icon = document.createElement("i"),
        trashIcon = document.createElement("i"),
        firstName = volunteerList[i].first_name,
        lastName = volunteerList[i].last_name,
        uid = volunteerList[i].id;
    link = document.createTextNode(firstName + " " + lastName);
    // create the elements to append to the panel
    div.className = "panel-block";
    span.className = "panel-icon";
    icon.className = "fas fa-circle-user";
    trashIcon.className = "fas fa-trash-can";
    anchor.appendChild(span);
    anchor.appendChild(icon);
    anchor.appendChild(link);
    trashAnchor.className = "trash-anchor";
    trashAnchor.appendChild(trashIcon);
    trashAnchor.addEventListener("click", () => deletePreferredVolunteer(uid));
    anchor.addEventListener("click", () => moreDetails(volunteerList[i]));
    div.appendChild(anchor);
    div.appendChild(trashAnchor);
    mainWrapper.appendChild(div);
  }
}

/**
 * @moreDetails
 * Load more data about the selected volunteer
 */
function moreDetails(cardData) {
  // set the user data to local storage
  localStorage.setItem("more-detail", JSON.stringify(cardData));
  // redirect to the more-detail page
  location.href = "more-detail.html";
}

/**
 * @signOut
 * Redirects user to index.html
 */
function signOut () {
  location.replace("index.html");
}

// runs on page load
init();