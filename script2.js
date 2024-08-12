document.addEventListener("DOMContentLoaded", () => {
    const generateButton = document.getElementById("generateButton");
    const messageContainer = document.getElementById("messageContainer");

    const messages = [
        "나는 보노보노.",
        "길거리 생활 25년",
        "너는 누구냐!",
        "콜록콜록",
        "오늘은 몇월 며칠인가요?"
    ];

    function generateAIMessage() {
        const randomMessage = messages[Math.floor(Math.random() * messages.length)];
        const messageElement = document.createElement("div");
        messageElement.className = "message";
        messageElement.textContent = randomMessage;

        messageContainer.appendChild(messageElement);

        // 만약 선택된 메시지가 "콜록콜록"이라면 alert를 표시
        if (randomMessage === "콜록콜록") {
            alert('콜록콜록!');
        }
    }

    generateButton.addEventListener("click", generateAIMessage);
});
