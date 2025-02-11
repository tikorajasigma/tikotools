const chatBox = document.getElementById("chat-box");
const userInput = document.getElementById("user-input");
const sendButton = document.getElementById("send-button");

let chatHistory = []; // Menyimpan riwayat percakapan

// Fungsi untuk menambahkan pesan ke dalam UI
function appendMessage(sender, message) {
    const messageElement = document.createElement("div");
    messageElement.classList.add("message", sender === "user" ? "user-message" : "bot-message");
    messageElement.innerText = message;
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight; // Scroll otomatis ke bawah
}

// Fungsi untuk mengirim pesan ke AI
async function sendMessage() {
    const userMessage = userInput.value.trim();
    if (userMessage === "") return;

    appendMessage("user", userMessage);
    userInput.value = "";

    chatHistory.push({ role: "user", content: userMessage }); // Simpan pesan user

    try {
        const response = await fetch("https://api.together.xyz/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer 33428e555143e8d4f9c3fecf00628a4e98bd57c6b45bf6b2c3bb201c87b6b5e7" // Ganti dengan API key kamu
            },
            body: JSON.stringify({
                model: "meta-llama/Llama-3.3-70B-Instruct-Turbo-Free",
                messages: chatHistory, // Kirim seluruh riwayat percakapan
                temperature: 0.7
            })
        });

        const data = await response.json();
        const botMessage = data.choices[0].message.content;

        appendMessage("bot", botMessage);
        chatHistory.push({ role: "assistant", content: botMessage }); // Simpan pesan AI

    } catch (error) {
        appendMessage("bot", "Terjadi kesalahan, coba lagi nanti.");
        console.error("Error:", error);
    }
}

// Menjalankan sendMessage saat tombol diklik
sendButton.addEventListener("click", sendMessage);

// Menjalankan sendMessage saat Enter ditekan
userInput.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        sendMessage();
    }
});