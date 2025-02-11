const API_KEY = "33428e555143e8d4f9c3fecf00628a4e98bd57c6b45bf6b2c3bb201c87b6b5e7"; // Ganti dengan API key milikmu

async function sendMessage() {
    const userInput = document.getElementById("userInput");
    const chatbox = document.getElementById("chatbox");
    const userMessage = userInput.value.trim();

    if (!userMessage) return;

    // Tampilkan pesan pengguna
    chatbox.innerHTML += `<p><strong>Anda:</strong> ${userMessage}</p>`;
    userInput.value = "";

    try {
        const response = await fetch("https://api.together.xyz/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${API_KEY}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                model: "mistralai/mistral-7b-instruct", // Model gratis di Together AI
                messages: [{ role: "user", content: userMessage }]
            })
        });

        const data = await response.json();

        if (data.choices && data.choices.length > 0) {
            const botReply = data.choices[0].message.content;
            chatbox.innerHTML += `<p><strong>Bot:</strong> ${botReply}</p>`;
        } else {
            chatbox.innerHTML += `<p><strong>Bot:</strong> Maaf, saya tidak dapat merespons saat ini.</p>`;
        }
    } catch (error) {
        console.error("Error:", error);
        chatbox.innerHTML += `<p><strong>Bot:</strong> Terjadi kesalahan, coba lagi nanti.</p>`;
    }
}