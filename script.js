const API_KEY = "sk-1d165ea1b37d4205a5c3ba5c370efd58"; // Ganti dengan API Key Anda
const API_URL = "https://api.deepseek.com/v1/chat/completions";

async function sendMessage() {
    let userInput = document.getElementById("user-input").value;
    if (!userInput.trim()) return;

    appendMessage("Anda", userInput);
    document.getElementById("user-input").value = "";

    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${API_KEY}`
            },
            body: JSON.stringify({
                model: "deepseek-chat",
                messages: [{ role: "user", content: userInput }]
            })
        });

        const data = await response.json();
        const botReply = data.choices[0].message.content;
        appendMessage("AI", botReply);
    } catch (error) {
        appendMessage("AI", "Terjadi kesalahan, coba lagi nanti.");
    }
}

function appendMessage(sender, message) {
    let chatBox = document.getElementById("chat-box");
    let msgDiv = document.createElement("div");
    msgDiv.innerHTML = `<strong>${sender}:</strong> ${message}`;
    chatBox.appendChild(msgDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
}

function handleKeyPress(event) {
    if (event.key === "Enter") sendMessage();
}