/* Logic goes here */
let preferredUsers = [];
let savedPreferredUsers = [];
let user;
const signOutBtn = document.getElementById("sign-out"); // Get the sign-out button
const myAccountBtn = document.getElementById("my-account"); // Get the my-account button

function init() {

signOutBtn.addEventListener("click", () => {
    // Add a click event listener to the sign-out button
    location.replace("index.html"); // Redirect to the home page
  });
}

function toggleMobileMenu () {
    let burgerBtn = document.getElementById("burger-btn"),
        navMenu = document.getElementById("nav-menu");
    if (burgerBtn.classList.contains("is-active")) {
      burgerBtn.classList.remove("is-active");
      navMenu.classList.remove("is-active");
    } else {
      burgerBtn.classList.add("is-active");
      navMenu.classList.add("is-active");
    }
  }
  
  
init();
