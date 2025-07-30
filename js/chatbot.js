const chatBody = document.querySelector('.chat-body')
const messageInput = document.querySelector('.message-input')
const sendMessageButton = document.querySelector('#send-message')
const chatNow = document.querySelector('.chatNow')
const chatBot = document.querySelector('.chatBot')
const closeChatbot = document.querySelector('#close-chatbot')
const headerChatLive = document.querySelector('.headerChatLive')

const API_KEY = "AIzaSyD6T9ehrmBjBa8GKGPLZMCdj02COwQCkB4"
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`

const userData = {
    message: null
}

const createMessageElement = (content, ...classes) => {
    const div = document.createElement('div')
    div.classList.add('message', ...classes)
    div.innerHTML = content
    return div
}

const generateBotResponse = async (incomingMessageDiv) => {
    const messageElement = incomingMessageDiv.querySelector('.message-text')

    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            contents: [{
                parts: [{text: userData.message}]
            }]
        })
    }

    try {
        const response = await fetch(API_URL, requestOptions)
        const data = await response.json()
        if(!response.ok) throw new Error(data.error.message)

        const apiResponseText = data.candidates[0].content.parts[0].text.trim()
        messageElement.innerText = apiResponseText
    }catch (err) {
        console.log(data)
    }finally {
        incomingMessageDiv.classList.remove('thinking')
    }
}

const handleOutgoingMessage = (e) => {
    e.preventDefault()
    userData.message = messageInput.value.trim()
    messageInput.value = ""

    const messageContent = `<div class="message-text"></div>`
    const outgoingMessageDiv = createMessageElement(messageContent, 'user-message')
    outgoingMessageDiv.querySelector('.message-text').textContent = userData.message
    chatBody.appendChild(outgoingMessageDiv)

    setTimeout(() => {
        const messageContent = `<img src="img/person.svg" alt="person" class="chatBotPerson">
                    <div class="message-text">
                        <div class="thinking-indicatotr">
                            <div class="dot"></div>
                            <div class="dot"></div>
                            <div class="dot"></div>
                        </div>
                    </div>`
        const incomingMessageDiv = createMessageElement(messageContent, 'bot-message', 'thinking')
        chatBody.appendChild(incomingMessageDiv)
        generateBotResponse(incomingMessageDiv)
    }, 600)
}

messageInput.addEventListener('keydown', (e) => {
    const userMessage = e.target.value.trim()
    if(e.key === 'Enter' && userMessage){
        handleOutgoingMessage(e)
    }
})

sendMessageButton.addEventListener('click', (e) => handleOutgoingMessage(e))

chatNow.addEventListener('click', () => {
    chatBot.style.display = 'flex'
})

headerChatLive.addEventListener('click', () => {
    chatBot.style.display = 'flex'
})

closeChatbot.addEventListener('click', () => {
    chatBot.style.display = 'none'
})