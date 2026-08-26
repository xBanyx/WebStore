/* ========================================================
   CLOUD SYNC SETUP (Firebase — free plan only) — fill this in once,
   then forget about it.

   WHY THIS FILE EXISTS
   ---------------------
   admin.html and index.html used to store the menu with localStorage.
   localStorage lives inside ONE browser on ONE device — it isn't
   shared between visitors, even on the same website. That's why
   editing the menu in admin only ever changed it for the admin's own
   browser, and every other visitor kept seeing the built-in defaults.

   Filling in the values below connects both pages to a small Firebase
   project instead, so every visitor reads the same live menu.

   This setup uses ONLY Firestore (Firebase's free "Spark" plan, no
   credit card required). It deliberately does NOT use Firebase
   Storage for photos, because Firebase now requires the paid Blaze
   plan (a linked billing account) just to create a Storage bucket.
   Uploaded photos are compressed in the browser and stored directly
   inside the Firestore document instead — smaller files, no billing
   account needed, stays free.

   HOW TO GET THESE VALUES (~5 minutes, free, no credit card)
   ---------------------------------------------
   1. Go to https://console.firebase.google.com and create a project
      (any name, Google Analytics can be turned off).
   2. In the project, click the "</>" (Web) icon to add a web app.
      Give it any nickname and click "Register app". Firebase will
      show you a firebaseConfig object — copy those values into
      FIREBASE_CONFIG below.
   3. In the left sidebar, open "Build > Firestore Database" and click
      "Create database". Choose the "(default)" database ID, then set
      the rules to test mode / "allow read, write: if true;" (the
      admin password already isn't real security either, so this
      matches the site's existing security level).
   4. Save this file and re-upload/redeploy the site.

   If you leave the placeholder "YOUR_..." values below untouched, both
   pages automatically fall back to the old local-only behavior — the
   site still works, it just won't sync across devices/visitors.
   ======================================================== */
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBuGtpK7B3ypJi3Gp-kBlBoEb72XXRLlGA",
  authDomain: "webstore-36d31.firebaseapp.com",
  projectId: "webstore-36d31",
  storageBucket: "webstore-36d31.firebasestorage.app",
  messagingSenderId: "114596936869",
  appId: "1:114596936869:web:30bb4f71dc2bd2e382214c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);