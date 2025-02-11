const API_KEY = "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"; // Ganti dengan API Key Anda
const API_URL = "https://openrouter.ai/api/v1/chat/completions";

async function sendMessage() {
    let userInput = document.getElementById("user-input").value;
    if (!userInput.trim()) return;

    appendMessage("Anda", userInput);
    document.getElementById("user-input").value = "";

    updateDebug("Mengirim permintaan ke API...");

    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${API_KEY}`
            },
            body: JSON.stringify({
                model: "mistral-7b",
                messages: [{ role: "user", content: userInput }]
            })
        });

        updateDebug(`Status HTTP: ${response.status}`);

        if (!response.ok) {
            throw new Error(`Server mengembalikan status: ${response.status}`);
        }

        const data = await response.json();
        updateDebug(`Respon API:\n${JSON.stringify(data, null, 2)}`);

        if (data.choices && data.choices.length > 0) {
            appendMessage("AI", data.choices[0].message.content);
        } else {
            appendMessage("AI", "AI tidak memberikan respon yang valid.");
        }
    } catch (error) {
        console.error("Terjadi error:", error);
        updateDebug(`Error: ${error.message}`);
        appendMessage("AI", `Terjadi kesalahan: ${error.message}`);
    }
}

function appendMessage(sender, message) {
    let chatBox = document.getElementById("chat-box");
    let msgDiv = document.createElement("div");
    msgDiv.innerHTML = `<strong>${sender}:</strong> ${message}`;
    chatBox.appendChild(msgDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
}

function updateDebug(message) {
    document.getElementById("debug-box").textContent = message;
}

function handleKeyPress(event) {
    if (event.key === "Enter") sendMessage();
}