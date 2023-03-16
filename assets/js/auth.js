let user;

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

          const signOutBtn = document.getElementById("sign-out"); // Get the sign-out button
          const signInBtnGoogle = document.getElementById("sign-in-google"); // Get the sign-in with Google button

          signUpForm.addEventListener("submit", (e) => {
            // Add a submit event listener to the sign-up form
            e.preventDefault(); // Prevent the form from submitting

            const user = userEmailSignup.value.trim();
            const password = userPasswordSignup.value.trim();

            fireAuth
              .createUserWithEmailAndPassword(auth, email, password)
              .then((userCredential) => {
                user = userCredential.user;
                console.log(user);
                signOutBtn.style.display = "block"; // Show the sign-out button
              })
              .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage);
              });
          });

          signInForm.addEventListener("submit", (e) => {
            // Add a submit event listener to the sign-in form
            e.preventDefault(); // Prevent the form from submitting
            const email = userEmail.value.trim();
            const password = userPassword.value.trim();

            fireAuth
              .signInWithEmailAndPassword(auth, email, password)
              .then((userCredential) => {
                user = userCredential.user;

                console.log(user);
                signOutBtn.style.display = "block"; // Show the sign-out button
              })
              .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage);
              });
          });

          const provider = new fireAuth.GoogleAuthProvider(); // Create a Google provider object

          signInBtnGoogle.addEventListener("click", () => {
            // Add a click event listener to the sign-in button
            fireAuth
              .signInWithPopup(auth, provider)
              .then((result) => {
                // Sign in with the Google provider object
                user = result.user; // Get the signed-in user from the result

                console.log(user);
                signOutBtn.style.display = "block"; // Show the sign-out button
              })
              .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.error(errorCode, errorMessage);
              });
          });

          signOutBtn.addEventListener("click", () => {
            // Add a click event listener to the sign-out button
            fireAuth.signOut(auth).then(() => {
              // Sign out
              console.log("User signed out");
              user = null;
              signOutBtn.style.display = "none"; // Hide the sign-out button
              location.replace("index.html");
            });
          });
        }
      );
    }
  );
}

loadFirebase();
