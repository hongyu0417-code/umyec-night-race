// populate-firebase.js
// 1. Install Node.js if you haven't already.
// 2. Run: npm install firebase
// 3. Add your config below.
// 4. Run: node populate-firebase.js

import { initializeApp } from "firebase/app";
import { getDatabase, ref, set } from "firebase/database";

// ==========================================
// FIREBASE CONFIGURATION
// PASTE YOUR CONFIG OBJECT HERE
// ==========================================
const firebaseConfig = {
    apiKey: "AIzaSyD7c10uTojI4F8YHC7fVCLv2bORSeRlJ0I",
    authDomain: "umyec-night-race-1d68f.firebaseapp.com",
    databaseURL: "https://umyec-night-race-1d68f-default-rtdb.asia-southeast1.firebasedatabase.app/",
    projectId: "umyec-night-race-1d68f",
    storageBucket: "umyec-night-race-1d68f.firebasestorage.app",
    messagingSenderId: "86919039535",
    appId: "1:86919039535:web:839c9b8c59cdb4f070d4da",
    measurementId: "G-GPQHPNQ6FD"
};

async function populateDatabase() {
    try {
        console.log("Initializing Firebase...");
        const app = initializeApp(firebaseConfig);
        const db = getDatabase(app);

        // Define the initial data structure
        const initialData = {};

        for (let i = 1; i <= 10; i++) {
            // This structure matches `teams/teamX/tokens` used in index.html & admin.html
            initialData[`team${i}`] = {
                tokens: 5
            };
        }

        console.log("Writing initial data to Realtime Database...");

        // Write the data payload to the root 'teams' node
        const teamsRef = ref(db, 'teams');
        await set(teamsRef, initialData);

        console.log("✅ Successfully populated database with 10 teams (5 tokens each)!");
        console.log("Details:");
        console.log(JSON.stringify({ teams: initialData }, null, 2));

        // process.exit is needed because Firebase might keep the Node process alive
        process.exit(0);

    } catch (error) {
        console.error("❌ Error populating database:", error);
        process.exit(1);
    }
}

// Run the script
populateDatabase();
