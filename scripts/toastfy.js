function createToastfySuccess(message){
const div = document.createElement("div")
const pMessage = document.createElement("p")

pMessage.innerText = message
div.classList.add("div-toasty-sucess")

div.append(pMessage)

return div
}

function createToastfyFailed(message){
const div = document.createElement("div")
const pMessage = document.createElement("p")
pMessage.innerText = message

div.classList.add("div-toasty-failed")

div.append(pMessage)

return div
}

export {
    createToastfySuccess,
    createToastfyFailed
}