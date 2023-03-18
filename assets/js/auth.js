let user; // Create a user object

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDWBrlLNdOjRZy3IiLXPi1dVf4F1beGYT4",
  authDomain: "project-one-72d51.firebaseapp.com",
  projectId: "project-one-72d51",
  storageBucket: "project-one-72d51.appspot.com",
  messagingSenderId: "44015512234",
  appId: "1:44015512234:web:83de504174f820c4187ed3",
  measurementId: "G-S5PEL5HZ9T",
};

function deleteUserFromLocalStorage() {
  // Delete the user object from local storage
  localStorage.removeItem("user"); // Delete the user object from local storage
}
// deleteUserFromLocalStorage();

function getUserFromLocalStorage() {
  // Get the user object from local storage
  const userString = localStorage.getItem("user"); // Get the user object from local storage
  if (userString) {
    user = JSON.parse(userString); // Parse the user object
    return true;
  }
  return false;
}

function setUserToLocalStorage() {
  // Set the user object to local storage
  localStorage.setItem("user", JSON.stringify(user)); // Stringify the user object and set it to local storage
}

function loadFirebase() {
  // Initialize Firebase
  import("https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js").then(
    (firebase) => {
      // Import the app module
      const app = firebase.initializeApp(firebaseConfig); // Initialize the app

      import("https://www.gstatic.com/firebasejs/9.17.2/firebase-auth.js").then(
        (fireAuth) => {
          // Import the auth module

          const auth = fireAuth.getAuth(app); // Get the auth object

          const signInForm = document.getElementById("sign-in-form"); // Get the sign-in form
          const signUpForm = document.getElementById("sign-up-form"); // Get the sign-up form
          const userName = document.getElementById("user-name"); // Get the user name input
          const userEmail = document.getElementById("sign-in-user-email"); // Get the user email input
          const userPassword = document.getElementById("sign-in-user-password"); // Get the user password input
          const userEmailSignup = document.getElementById("sign-up-user-email"); // Get the user email input
          const userPasswordSignup = document.getElementById(
            "sign-up-user-password"
          ); // Get the user password input
          const firstNameSignup = document.getElementById("first-name"); // Get the first name input
          const lastNameSignup = document.getElementById("last-name"); // Get the last name input
          const businessNameSignup = document.getElementById("business-name"); // Get the business name input

          const signOutBtn = document.getElementById("sign-out"); // Get the sign-out button
          const myAccountBtn = document.getElementById("my-account"); // Get the my-account button
          const signInBtnGoogle = document.getElementById("sign-in-google"); // Get the sign-in with Google button

          signUpForm.addEventListener("submit", (e) => {
            // Add a submit event listener to the sign-up form
            e.preventDefault(); // Prevent the form from submitting

            const email = userEmailSignup.value.trim(); // Get the user email
            const password = userPasswordSignup.value.trim(); // Get the user password

            fireAuth
              .createUserWithEmailAndPassword(auth, email, password) // Create a user with the email and password
              .then((userCredential) => {
                // If the user is successfully created
                userData = userCredential.user; // Get the user object

                user = {
                  // Create a user object
                  name: `${firstNameSignup.value.trim()} ${lastNameSignup.value.trim()}`, // Get the user's name
                  email: userData.email, // Get the user's email
                  photo: "", // Get the user's photo
                  businessName: businessNameSignup.value.trim(), // Get the user's business name
                  uid: userData.uid, // Get the user's uid
                  savedVolunteers: [], // Get the user's volunteer array
                };

                setUserToLocalStorage(); // Set the user object to local storage

                signOutBtn.style.display = "block"; // Show the sign-out button
              })
              .catch((error) => {
                // If there is an error
                const errorCode = error.code; // Get the error code
                const errorMessage = error.message; // Get the error message
                console.log(errorCode, errorMessage); // Log the error
              });
          });

          signInForm.addEventListener("submit", (e) => {
            // Add a submit event listener to the sign-in form
            e.preventDefault(); // Prevent the form from submitting
            const email = userEmail.value.trim(); // Get the user email
            const password = userPassword.value.trim(); // Get the user password

            fireAuth
              .signInWithEmailAndPassword(auth, email, password) // Sign in with the email and password
              .then((userCredential) => {
                // If the user is successfully signed in
                const userData = userCredential.user; // Get the user object

                const userFromStorage = getUserFromLocalStorage(); // Get the user object from local storage

                if (userFromStorage) {
                  user = userFromStorage; // Set the user object to the user object from local storage
                  if (user.uid === userData.uid) {
                    location.href = "listUsersTesting.html"; // Redirect to the list users page
                  } else {
                    user = {
                      // Create a user object
                      name: "", // Set the user's name
                      email: userData.email, // Get the user's email
                      photo: "", // Get the user's photo
                      businessName: "", // Get the user's business name
                      uid: userData.uid, // Get the user's uid
                      savedVolunteers: [], // Get the user's volunteer array
                    };

                    setUserToLocalStorage(); // Set the user object to local storage
                  }
                } else {
                  user = {
                    // Create a user object
                    name: "", // Set the user's name
                    email: userData.email, // Get the user's email
                    photo: "", // Get the user's photo
                    businessName: "", // Get the user's business name
                    uid: userData.uid, // Get the user's uid
                    savedVolunteers: [], // Get the user's volunteer array
                  };

                  setUserToLocalStorage(); // Set the user object to local storage
                }

                location.href = "listUsersTesting.html"; // Redirect to the list users page

                signOutBtn.style.display = "block"; // Show the sign-out button
              })
              .catch((error) => {
                // If there is an error
                const errorCode = error.code; // Get the error code
                const errorMessage = error.message; // Get the error message
                console.log(errorCode, errorMessage);
              });
          });

          const provider = new fireAuth.GoogleAuthProvider(); // Create a Google provider object

          signInBtnGoogle.addEventListener("click", () => {
            // Add a click event listener to the sign-in button
            fireAuth
              .signInWithPopup(auth, provider) // Sign in with a popup window
              .then((result) => {
                // Sign in with the Google provider object
                const userData = result.user; // Get the signed-in user from the result

                const userFromStorage = getUserFromLocalStorage(); // Get the user object from local storage
                console.log("userFromStorage", userFromStorage);
                if (userFromStorage) {
                  user = userFromStorage;
                  if (user.uid === userData.uid) {
                    location.href = "listUsersTesting.html"; // Redirect to the list users page
                  } else {
                    user = {
                      // Create a user object
                      name: userData.displayName, // Get the user's name
                      email: userData.email, // Get the user's email
                      photo: userData.photoURL, // Get the user's photo
                      businessName: "", // Get the user's business name
                      uid: userData.uid, // Get the user's uid
                      savedVolunteers: [], // Get the user's volunteer array
                    };

                    setUserToLocalStorage(); // Set the user object to local storage
                  }
                } else {
                  user = {
                    // Create a user object
                    name: userData.displayName, // Get the user's name
                    email: userData.email, // Get the user's email
                    photo: userData.photoURL, // Get the user's photo
                    businessName: "", // Get the user's business name
                    uid: userData.uid, // Get the user's uid
                    savedVolunteers: [], // Get the user's volunteer array
                  };

                  setUserToLocalStorage(); // Set the user object to local storage
                }

                location.href = "listUsersTesting.html"; // Redirect to the list users page

                signOutBtn.style.display = "block"; // Show the sign-out button
              })
              .catch((error) => {
                // If there is an error
                const errorCode = error.code; // Get the error code
                const errorMessage = error.message; // Get the error message
                console.error(errorCode, errorMessage); // Log the error
              });
          });

          signOutBtn.addEventListener("click", () => {
            // Add a click event listener to the sign-out button
            fireAuth.signOut(auth).then(() => {
              // Sign out
              console.log("User signed out");
              user = null; // Set the user object to null
              signOutBtn.style.display = "none"; // Hide the sign-out button
              myAccountBtn.style.display = "none"; // Hide the my-account button
              location.replace("index.html"); // Redirect to the home page
            });
          });
        }
      );
    }
  );
}

loadFirebase();
