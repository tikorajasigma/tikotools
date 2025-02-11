const API_URL = "https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct";

async function sendMessage() {
    let userInput = document.getElementById("user-input").value;
    if (!userInput.trim()) return;

    appendMessage("Anda", userInput);
    document.getElementById("user-input").value = "";

    updateDebug("Mengirim permintaan ke API...");

    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ inputs: userInput })
        });

        updateDebug(`Status HTTP: ${response.status}`);

        if (!response.ok) {
            throw new Error(`Server mengembalikan status: ${response.status}`);
        }

        const data = await response.json();
        updateDebug(`Respon API:\n${JSON.stringify(data, null, 2)}`);

        if (Array.isArray(data) && data.length > 0) {
            appendMessage("AI", data[0].generated_text || "Tidak ada respon.");
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