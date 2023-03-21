/* Logic goes here */
let preferredUsers = [];
let savedPreferredUsers = [];
let user;
const signOutBtn = document.getElementById("sign-out"); // Get the sign-out button
const myAccountBtn = document.getElementById("my-account"); // Get the my-account button
const mapDiv = document.getElementById("map"); // Get the map div

// Attach your callback function to the `window` object
function initMap () {
  // JS API is loaded and available
  const map = new google.maps.Map(mapDiv, {
    center: { lat: 0, lng: 0 },
    zoom: 2,
  });
  const cards = document.querySelectorAll(".card");

  for (let i = 0; i < cards.length; i++) {
    const lat = parseFloat(cards[i].dataset.lat);
    const lng = parseFloat(cards[i].dataset.lng);
    console.log(lat);
    console.log(lng);
    if (!isNaN(lat) && !isNaN(lng)) {
      const marker = new google.maps.Marker({
        position: { lat, lng },
        map,
      });
    }
  }
};

function init() {

  window.addEventListener('scroll',()=>{
    const {
      scrollTop,
      scrollHeight,
      clientHeight
    } = document.documentElement;

    if (scrollTop + clientHeight >= scrollHeight -5) {
      
      retriveUsers(12); // this will return and array of obj's

    }

  })



  retriveUsers(12); // this will return and array of obj's
  getUserFromLocalStorage(); // Get the user object from local storage
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
//   const map = new google.maps.Map(mapDiv, {
//     center: { lat: 0, lng: 0 },
//     zoom: 2,
//   });

//   for (let i = 0; i < users.length; i++) {
//     const lat = parseFloat(users[i].address.coordinates.lat);
//     const lng = parseFloat(users[i].address.coordinates.lng);
//     if (!isNaN(lat) && !isNaN(lng)) {
//       const marker = new google.maps.Marker({
//         position: { lat, lng },
//         map,
//       });
//     }
//   }
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

function retriveUsers(numHowManyUsersYouWant) {
  let requestUrl = `https://random-data-api.com/api/v2/users?size=${numHowManyUsersYouWant}&response_type=json`;

  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      //do some thing with your data
      //maybe give it a card

      for (let index = 0; index < data.length; index++) {
        //appendChild form the methond that has the card
        document
          .querySelector(".container")
          .append(createUserCard(data[index]));
        // let currentUser = createUserCard(data[index]);
      }
      showUsersOnMap(data);
    });
}

function loadPreferredUsers() {
  try {
    savedPreferredUsers = JSON.parse(
      localStorage.getItem("SomethingWeDecideOn")
    );
  } catch (error) {}
}
//create a element for the dom - card for the list of users generated from random-data-api
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
  button.textContent = "More Info";
  button.addEventListener("click", function () {
    moreDetails(cardData);
});

  mediaContent.append(title);
  mediaContent.append(subtitle);
  figure.append(img);
  mediaLeft.append(figure);
  media.append(mediaLeft);
  media.append(mediaContent);
  cardContent.append(media);
  mediaContent.append(content);
  mediaContent.append(button);
  card.append(cardContent);

  return card;
}

function moreDetails(cardData) {
  localStorage.setItem("more-detail", JSON.stringify(cardData));
  location.href = "more-detail.html";
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
