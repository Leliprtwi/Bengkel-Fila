// Import Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyCJ2fwQ4iaMVEybwi6XB8ZIvlycFKMTUCM",
  authDomain: "project-pw-63b79.firebaseapp.com",
  databaseURL: "https://project-pw-63b79-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "project-pw-63b79",
  storageBucket: "project-pw-63b79.appspot.com",
  messagingSenderId: "665275542376",
  appId: "1:665275542376:web:d203788344157961a9c4dd",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
// Get DOM elements
const loginForm = document.getElementById("loginForm");
const loginSuccess = document.getElementById("loginSuccess");
const loginButton = document.querySelector(".login-button");
// Create Google login button
const googleBtn = document.createElement("button");
googleBtn.type = "button";
googleBtn.className = "google-login-button";
googleBtn.innerHTML = "Login with Google";
loginForm.insertBefore(googleBtn, loginForm.querySelector(".remember-forgot"));
// login with Google
async function signInWithGoogle() {
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    //pesan sukses login
    loginSuccess.style.display = "block";
    loginSuccess.textContent = "Login successful! Redirecting...";
    // waktu masuk ke index2.html
    setTimeout(() => {
      window.location.href = "index2.html";
    }, 2000);
  } catch (error) {
    console.error("Error during Google sign in:", error);
    if (error.code === "auth/popup-blocked") {
      alert("Please allow popups for this website");
    }
  }
}
// Setelah login berhasil
sessionStorage.setItem("isLoggedIn", "true");
// logout
async function handleSignOut() {
  try {
    await signOut(auth);
    // After signing out, redirect to login page
    window.location.href = "index.html";
  } catch (error) {
    console.error("Error signing out:", error);
  }
}
onAuthStateChanged(auth, (user) => {
  if (user) {
    if (window.location.pathname.includes("index.html")) {
      window.location.href = "index2.html";
    }
  } else {
    if (window.location.pathname.includes("index2.html")) {
      window.location.href = "index.html";
    }
  }
});
googleBtn.addEventListener("click", signInWithGoogle);
loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  alert("Please use Google Sign In to continue");
});
