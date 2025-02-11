const API_KEY = "33428e555143e8d4f9c3fecf00628a4e98bd57c6b45bf6b2c3bb201c87b6b5e7"; 
const API_URL = "https://api.together.xyz/v1/chat/completions";

async function sendMessage() {
    const userInput = document.getElementById("user-input").value.trim();
    if (!userInput) return;

    const chatBox = document.getElementById("chat-box");

    // Tambahkan pesan pengguna ke chat
    addMessage(userInput, "user-message");

    // Bersihkan input
    document.getElementById("user-input").value = "";
    chatBox.scrollTop = chatBox.scrollHeight;

    // Tambahkan loading text
    const botMessage = addMessage("Sedang berpikir...", "bot-message");

    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${API_KEY}`
            },
            body: JSON.stringify({
                model: "meta-llama/Llama-3.3-70B-Instruct-Turbo-Free",
                messages: [{ role: "user", content: userInput }]
            })
        });

        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

        const data = await response.json();
        console.log("API Response:", data); // Debugging output

        if (data.choices && data.choices.length > 0) {
            botMessage.textContent = data.choices[0].message.content.trim();
        } else {
            botMessage.textContent = "Tidak ada respons dari AI.";
        }
    } catch (error) {
        console.error("Error fetching AI response:", error);
        botMessage.textContent = "Terjadi kesalahan. Coba lagi nanti.";
    }

    chatBox.scrollTop = chatBox.scrollHeight;
}

// Fungsi untuk menambahkan pesan ke chat box
function addMessage(text, className) {
    const chatBox = document.getElementById("chat-box");
    const messageElement = document.createElement("div");
    messageElement.classList.add("message", className);
    messageElement.textContent = text;
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight;
    return messageElement;
}