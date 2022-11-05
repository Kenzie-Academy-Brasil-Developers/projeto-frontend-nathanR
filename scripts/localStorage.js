

function getLocalStorage (){
    const user = JSON.parse(localStorage.getItem("userAuthorization")) || ""
    return user
}

export {getLocalStorage}