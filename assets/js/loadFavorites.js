/* Logic goes here */
let user;
let preferredUsers = [];

const signOutBtn = document.getElementById("sign-out"); // Get the sign-out button
const myAccountBtn = document.getElementById("my-account"); // Get the my-account button

const userObj = localStorage.getItem("more-detail");

function init() {
  // this will return and array of obj's
  getUserFromLocalStorage(); // Get the user object from local storage
  retriveUser(); // this will return and array of obj's
}

function getUserFromLocalStorage() {
  // Get the user object from local storage
  const userString = localStorage.getItem("user"); // Get the user object from local storage
  if (userString) {
    user = JSON.parse(userString); // Parse the user object
    signOutBtn.style.display = "block"; // Show the sign-out button
  } else {
    location.href = "index.html"; // Redirect to the list users page
  }
}

signOutBtn.addEventListener("click", () => {
  // Add a click event listener to the sign-out button
  location.replace("index.html"); // Redirect to the home page
});

function retriveUser() {
  if (userObj) {
    document
      .querySelector(".container")
      .append(createUserCard(JSON.parse(userObj)));
  } else {
    location.replace("volunteer-list.html"); // Redirect to the list page
  }
}

function loadPreferredUsers() {
  try {
    preferredUsers = JSON.parse(localStorage.getItem("preferredUsers"));
  } catch (error) {}
}


function createUserCard(cardData) {
  let card = document.createElement("div");
  card.classList.add("card");
  card.dataset.lat = cardData.address.coordinates.lat;
  card.dataset.lng = cardData.address.coordinates.lng;

  let cardContent = document.createElement("div");
  cardContent.classList.add("card-content");

  let media = document.createElement("div");
  media.classList.add("media");

  let mediaLeft = document.createElement("div");
  mediaLeft.classList.add("media-left");

  let figure = document.createElement("figure");
  figure.classList.add("image");
  figure.classList.add("is-300x300");

  let img = document.createElement("img");
  img.src = cardData.avatar;
  img.alt = "Placeholder image";

  let mediaContent = document.createElement("div");
  mediaContent.classList.add("media-content");

  let title = document.createElement("p");
  title.classList.add("title");
  title.classList.add("is-2");
  title.textContent = `${cardData.first_name} ${cardData.last_name}`;

  let subtitle = document.createElement("p");
  subtitle.classList.add("subtitle");
  subtitle.classList.add("is-4");
  subtitle.textContent = `${cardData.email}`;
  //subtitle.href=`mailto:${cardData.email}`;

  let content = document.createElement("div");
  content.classList.add("content");
  content.textContent = ` ${cardData.address.city}, ${cardData.address.state} - Phone: ${cardData.phone_number}`;
  //avatar: ${cardData.avatar}
  //avatar,  city/state, phone/

  let button = document.createElement("button");
  button.classList.add("button");
  button.classList.add("is-primary");
  button.classList.add("details-btn");
  button.textContent = "Add to Favorites";
  button.addEventListener("click", function () {
    savePreferredUsers(cardData);
  });

  let backBtn = document.createElement("button");
  backBtn.classList.add("button");
  backBtn.classList.add("is-link");
  backBtn.classList.add("details-btn");
  backBtn.textContent = "< Go Back";
  backBtn.addEventListener("click", function () {
    history.go(-1);
  });

  mediaContent.append(title);
  mediaContent.append(subtitle);
  figure.append(img);
  mediaLeft.append(figure);
  media.append(mediaLeft);
  media.append(mediaContent);
  cardContent.append(media);
  cardContent.append(content);
  cardContent.append(backBtn);
  cardContent.append(button);
  card.append(cardContent);

  return card;
}

function savePreferredUsers() {
  let arr = [],
      userArr = JSON.parse(localStorage.getItem('preferredUsers'));
  if(!userArr) {
      arr.push(JSON.parse(userObj));
      localStorage.setItem('preferredUsers', JSON.stringify(arr));
  } else {
      userArr.push(JSON.parse(userObj));
      localStorage.setItem('preferredUsers', JSON.stringify(userArr));
  }
  loadPreferredUsers();
  let notification = document.createElement("div");
  notification.classList.add("notification");
  notification.classList.add("is-primary");
  notification.textContent = "User added to favorites";
  document.querySelector(".container").append(notification);
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

function returnToLastPage () {
  window.location.href = window.history.back(1);
}

init();
