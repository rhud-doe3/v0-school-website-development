import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";
import { firebaseConfig } from "./firebase.js";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Configure the reCAPTCHA
window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
  'size': 'normal',
  'callback': (response) => {
    // reCAPTCHA solved, allow signInWithPhoneNumber.
    console.log("reCAPTCHA solved!");
  },
  'expired-callback': () => {
    // Response expired. Ask user to solve reCAPTCHA again.
    console.log("reCAPTCHA expired.");
  }
});

// Render the reCAPTCHA
window.recaptchaVerifier.render();

// Example function to trigger the SMS
const phoneNumber = "+254116335366"; // Use your test number here
const appVerifier = window.recaptchaVerifier;

signInWithPhoneNumber(auth, phoneNumber, appVerifier)
    .then((confirmationResult) => {
      // SMS sent. Prompt user to type the code from the message.
      window.confirmationResult = confirmationResult;
      console.log("SMS sent!");
    }).catch((error) => {
      // Error; SMS not sent
      console.error("Error during signInWithPhoneNumber", error);
    });