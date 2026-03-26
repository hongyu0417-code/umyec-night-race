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
    apiKey: "AIzaSyB5_nwGNACrq7M01EsFFL-ZpQkbcqeARfE",
    authDomain: "umyec-night-race-219f6.firebaseapp.com",
    databaseURL: "https://umyec-night-race-219f6-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "umyec-night-race-219f6",
    storageBucket: "umyec-night-race-219f6.firebasestorage.app",
    messagingSenderId: "315048773537",
    appId: "1:315048773537:web:878d1280726c61ffb86de0",
    measurementId: "G-CF1RGK7LXQ"
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
