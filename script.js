const API_KEY = "33428e555143e8d4f9c3fecf00628a4e98bd57c6b45bf6b2c3bb201c87b6b5e7";
const MODEL = "meta-llama/Llama-3.3-70B-Instruct-Turbo-Free"; 

async function sendMessage() {
    const userInput = document.getElementById("user-input");
    const chatBox = document.getElementById("chat-box");

    if (!userInput.value.trim()) return;

    // Tampilkan pesan pengguna
    chatBox.innerHTML += `<div><strong>Anda:</strong> ${userInput.value}</div>`;
    chatBox.scrollTop = chatBox.scrollHeight;

    const userMessage = userInput.value;
    userInput.value = "";

    try {
        const response = await fetch("https://api.together.xyz/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${API_KEY}`
            },
            body: JSON.stringify({
                model: MODEL,
                messages: [{ role: "user", content: userMessage }]
            })
        });

        const data = await response.json();
        const botReply = data.choices[0].message.content;

        chatBox.innerHTML += `<div><strong>Bot:</strong> ${botReply}</div>`;
        chatBox.scrollTop = chatBox.scrollHeight;
    } catch (error) {
        chatBox.innerHTML += `<div style="color:red;"><strong>Bot:</strong> Error, coba lagi!</div>`;
    }
}

function handleKeyPress(event) {
    if (event.key === "Enter") {
        sendMessage();
    }
}