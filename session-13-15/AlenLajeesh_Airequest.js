const fetch = require('node-fetch');

const API_KEY = "AIzaSyDJbmgui8Rz1QOV1MVVo1eH2pjY01AKd00";
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`;

const PROMPT = "Hello nice to meet u";

const headers = {
    "Content-Type": "application/json"
};

const data = {
    contents: [{
        parts: [{ text: PROMPT }]
    }]
};

async function callGeminiAPI() {
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(data)
        });

        const reply = await response.json();

        // Check if the request was successful
        if (response.ok && reply.candidates) {
            console.log(reply.candidates[0].content.parts[0].text);
        } else {
            console.log("Error:", reply.error?.message || 'Unknown error');
        }
    } catch (error) {
        console.log("Network error:", error.message);
    }
}

callGeminiAPI();
