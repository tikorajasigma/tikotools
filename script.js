const API_KEY = "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"; // Ganti dengan API key milikmu

async function sendMessage() {
    const userInput = document.getElementById("userInput");
    const chatbox = document.getElementById("chatbox");
    const userMessage = userInput.value.trim();

    if (!userMessage) return;
    
    // Tampilkan pesan pengguna
    chatbox.innerHTML += `<p><strong>Anda:</strong> ${userMessage}</p>`;
    userInput.value = "";

    try {
        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${API_KEY}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                model: "deepseek/deepseek-r1:free",
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