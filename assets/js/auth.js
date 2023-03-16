// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD_Q9AqRBFpGSbMloK-LtlnTpP4XMWyYsk",
  authDomain: "litestep-1242.firebaseapp.com",
  databaseURL: "https://litestep-1242.firebaseio.com",
  projectId: "litestep-1242",
  storageBucket: "litestep-1242.appspot.com",
  messagingSenderId: "988069859398",
  appId: "1:988069859398:web:78bb740bdcd02ffe573a47",
  measurementId: "G-5SLYKEN8J6",
};

function loadFirebase() {
  // Initialize Firebase
  import("https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js").then(
    (firebase) => {
      // Import the app module
      const app = firebase.initializeApp(firebaseConfig); // Initialize the app

      import(
        "https://www.gstatic.com/firebasejs/9.17.2/firebase-analytics.js"
      ).then((fireAnalytics) => {
        // Import the analytics module
        fireAnalytics.getAnalytics(app); // Initialize the analytics module
      });

      import("https://www.gstatic.com/firebasejs/9.17.2/firebase-auth.js").then(
        (fireAuth) => {
          // Import the auth module

          const auth = fireAuth.getAuth(app); // Get the auth object

          const signInForm = document.getElementById("sign-in-form"); // Get the sign-in form
          const userName = document.getElementById("user-name"); // Get the user name input
          const userEmail = document.getElementById("sign-in-user-email"); // Get the user email input
          const userPassword = document.getElementById("sign-in-user-password"); // Get the user password input

          const signOutBtn = document.getElementById("sign-out"); // Get the sign-out button
          const signInBtnGoogle = document.getElementById("sign-in-google"); // Get the sign-in with Google button

          const signInWithPassword = (email, password) => {
            fireAuth
              .signInWithEmailAndPassword(auth, email, password)
              .then((userCredential) => {
                const user = userCredential.user;
                return user;
              })
              .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage);
              });
          }; // Sign in with email and password

          signInForm.addEventListener("submit", (e) => {
            // Add a submit event listener to the sign-in form
            e.preventDefault(); // Prevent the form from submitting
            const user = signInWithPassword(
              userEmail.value.trim(),
              userPassword.value.trim()
            ); // Sign in with the email and password

            console.log(user);
            signOutBtn.style.display = "block"; // Show the sign-out button
          });

          const provider = new fireAuth.GoogleAuthProvider(); // Create a Google provider object

          signInBtnGoogle.addEventListener("click", () => {
            // Add a click event listener to the sign-in button
            fireAuth.signInWithPopup(auth, provider).then((result) => {
              // Sign in with the Google provider object
              const user = result.user; // Get the signed-in user from the result

              console.log(user);
              signInBtnGoogle.style.display = "none"; // Hide the sign-in button
              signOutBtn.style.display = "block"; // Show the sign-out button
            });
          });

          signOutBtn.addEventListener("click", () => {
            // Add a click event listener to the sign-out button
            fireAuth.signOut(auth).then(() => {
              // Sign out
              console.log("User signed out");
              signInBtn.style.display = "block"; // Show the sign-in button
              signOutBtn.style.display = "none"; // Hide the sign-out button
            });
          });
        }
      );
    }
  );
}

loadFirebase();
