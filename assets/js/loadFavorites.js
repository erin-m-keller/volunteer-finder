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

function showUsersOnMap(users) {
  const map = new google.maps.Map(mapDiv, {
    center: { lat: 0, lng: 0 },
    zoom: 2,
  });

  for (let i = 0; i < users.length; i++) {
    const lat = parseFloat(users[i].address.coordinates.lat);
    const lng = parseFloat(users[i].address.coordinates.lng);
    if (!isNaN(lat) && !isNaN(lng)) {
      const marker = new google.maps.Marker({
        position: { lat, lng },
        map,
      });
    }
  }
}

function retriveUser() {
  if (userObj) {
    document
      .querySelector(".container")
      .append(createUserCard(JSON.parse(userObj)));
  } else {
    location.replace("listUsersTesting.html"); // Redirect to the list page
  }
}

function loadPreferredUsers() {
  try {
    preferredUsers = JSON.parse(localStorage.getItem("preferredUsers"));
  } catch (error) {}
}

/**
 * @closeSuccessModal
 * Closes the success modal
 */
function closeSuccessModal () {
  // initialize variables
  let confirmModal = document.getElementById("success");
  // add class is-active
  confirmModal.style.display = "none";
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
  mediaLeft.setAttribute('id','media-avatar');

  let figure = document.createElement("figure");
  figure.classList.add("image");
  figure.classList.add("is-300x300");

  let img = document.createElement("img");
  img.src = cardData.avatar;
  img.alt = "Placeholder image";

  let mediaContent = document.createElement("div");
  mediaContent.classList.add("media-content");
  mediaContent.style.marginTop = "5rem";

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
  content.textContent = `${cardData.address.city}, ${cardData.address.state}`;
  //avatar: ${cardData.avatar}
  //avatar,  city/state, phone/

  let phone = document.createElement("div");
  phone.classList.add("content");
  phone.textContent = `Phone: ${cardData.phone_number}`;

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

  let successMsg = document.getElementById("success"),
      closeBtn = document.createElement("button"),
      successPara = document.createElement("p"),
      paraTxtNode = document.createTextNode("User added to favorites!");
  successPara.appendChild(paraTxtNode);
  successMsg.appendChild(successPara);
  closeBtn.classList.add("delete");
  closeBtn.setAttribute("aria-label","close");
  closeBtn.onclick = closeSuccessModal;
  successMsg.appendChild(closeBtn);
  successMsg.style.display = "none";

  let mapDiv = document.createElement("div");
  mapDiv.id = "map";
  mapDiv.style.width = "100%";
  mapDiv.style.height = "300px";

  mediaContent.append(title);
  mediaContent.append(subtitle);
  figure.append(img);
  mediaLeft.append(figure);
  media.append(mediaLeft);
  media.append(mediaContent);
  cardContent.append(media);
  mediaContent.append(content);
  mediaContent.append(phone);
  mediaContent.append(backBtn);
  mediaContent.append(button);
  cardContent.append(successMsg);
  cardContent.append(mapDiv);
  card.append(cardContent);

  // const mapDiv = document.getElementById("map"); // Get the map div

  // Attach your callback function to the `window` object
  function initMap() {
    // JS API is loaded and available

    const detail = JSON.parse(userObj); // Parse the user object
    const { lat, lng } = detail.address.coordinates; // Get the coordinates

    const map = new google.maps.Map(mapDiv, {
      center: { lat: lat, lng: lng },
      zoom: 8,
    });
    const cards = document.querySelectorAll(".card");

    for (let i = 0; i < cards.length; i++) {
      if (!isNaN(lat) && !isNaN(lng)) {
        const marker = new google.maps.Marker({
          position: { lat, lng },
          map,
        });
      }
    }
  }

  window.initMap = initMap;

  return card;
}

function savePreferredUsers() {
  let arr = [],
    userArr = JSON.parse(localStorage.getItem("preferredUsers"));
  if (!userArr) {
    arr.push(JSON.parse(userObj));
    localStorage.setItem("preferredUsers", JSON.stringify(arr));
  } else {
    userArr.push(JSON.parse(userObj));
    localStorage.setItem("preferredUsers", JSON.stringify(userArr));
  }
  loadPreferredUsers();
  // initialize variables
  let successMsg = document.getElementById("success");
  // show success message
  successMsg.style.display = "block";
}

function closeMsg() {
  // initialize variables
  let successMsg = document.getElementById("success");
  // hide success message
  successMsg.style.display = "none";
}

function toggleMobileMenu() {
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

function returnToLastPage() {
  window.location.href = window.history.back(1);
}

init();
