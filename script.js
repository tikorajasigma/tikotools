const API_KEY = "33428e555143e8d4f9c3fecf00628a4e98bd57c6b45bf6b2c3bb201c87b6b5e7";
const API_URL = "https://api.together.xyz/v1/chat/completions";

async function sendMessage() {
    const userInput = document.getElementById("user-input").value;
    if (!userInput.trim()) return;

    const chatBox = document.getElementById("chat-box");

    // Tambahkan pesan pengguna ke chat
    const userMessage = document.createElement("div");
    userMessage.classList.add("message", "user-message");
    userMessage.textContent = userInput;
    chatBox.appendChild(userMessage);

    // Bersihkan input
    document.getElementById("user-input").value = "";
    chatBox.scrollTop = chatBox.scrollHeight;

    // Tampilkan loading
    const botMessage = document.createElement("div");
    botMessage.classList.add("message", "bot-message");
    botMessage.textContent = "Sedang berpikir...";
    chatBox.appendChild(botMessage);
    chatBox.scrollTop = chatBox.scrollHeight;

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

        const data = await response.json();
        botMessage.textContent = data.choices[0].message.content.trim();
    } catch (error) {
        botMessage.textContent = "Terjadi kesalahan. Coba lagi nanti.";
    }

    chatBox.scrollTop = chatBox.scrollHeight;
}