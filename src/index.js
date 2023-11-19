// Import functions into index.js file
import { changeRoute } from "./model.js";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth"; // look for the auth folder
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAauj-zBAp9ewpyD6J7IGH5zjJPaQjRWSI",
  authDomain: "n315-pi.firebaseapp.com",
  projectId: "n315-pi",
  storageBucket: "n315-pi.appspot.com",
  messagingSenderId: "301611833853",
  appId: "1:301611833853:web:2fc92b7326a5fab7d9e194",
  measurementId: "G-FWVH83GF36",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

//  Url Listener
function initURLListener() {
  $(window).on("hashchange", changeRoute);
  changeRoute();
}

// Listensters only works on elements inside "Index.html" file
function initListeners() {
  // Hamburger Menu
  // Using Jquery
  $(".hamburger-menu").on("click", function () {
    $(this).toggleClass("open");
  });
}

// Form Listerners
export function addFormListeners() {
  // Use Console to see if function works
  // $(".signinBTN").on("click", function () {
  //   console.log($(".signinBTN"));
  // });

  // Login / Sign
  // Create Account
  $(".signinBTN").on("click", function (e) {
    e.preventDefault();
    console.log("Sign In");
    console.log($("signinBTN"));

    // Variables for inputs
    let fName = $("#fName").val();
    let lName = $("#lName").val();
    let email = $("#email_Reg").val();
    let pword = $("#pword_Reg").val();

    createUserWithEmailAndPassword(auth, email, pword)
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user;
        // ...
        console.log(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
        alert("Error: " + errorMessage);
      });
    //   Print to Console name
    console.log("Name: " + fName + " " + lName);
  });

  // Login
  $(".loginBTN").on("click", function (e) {
    e.preventDefault();
    console.log("Sign In");
    let email = $("#email").val();
    let pword = $("#pword").val();

    signInWithEmailAndPassword(auth, email, pword)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // ...
        alert("You have just Logged In!");
        console.log(user);
        changeRoute();
        if (user) {
          // Toggle class and changed Text
          $(".login a").text("Log Out");
          $(".login").addClass("logOut");
          // $(".loginBTN").addClass("logOut");
        }
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        alert("Error Message " + errorMessage);
      });
    console.log("Logged In");
  });

  // Sign Out
  $(".logOut").on("click", function (e) {
    // console.log($(".logOut"));
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        // Print to Console
        console.log("Sign Out");
        console.log(auth);

        alert("You have Logged out!");
        $(".login").removeClass("logOut");
        $(".login a").text("Login");
        changeRoute();
      })
      .catch((error) => {
        // An error happened.
        const errorMessage = error.message;
        // ..
        alert("Error Message " + errorMessage);
      });
  });
}

$(document).ready(function () {
  initURLListener();
  initListeners();
});
