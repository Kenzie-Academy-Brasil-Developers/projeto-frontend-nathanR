import { register } from "./requests.js"

function moveToHome (){
    const button = document.querySelector(".home")
    button.addEventListener("click", ()=>{
        window.location.replace("/pages/index.html")
    })
    }
    moveToHome()
    
    function moveToLogin(){
        const button = document.querySelector(".login")
        button.addEventListener("click", ()=>{
            window.location.replace("/pages/login.html")
        })
    
    }
    moveToLogin()


    function goBack(){
        const button = document.querySelector(".go-back")
        button.addEventListener("click", (event)=>{
            event.preventDefault()
            window.location.replace("/pages/login.html")
        })
    }
    goBack()


    function getRegisterData (){

        const user = document.querySelector(".input-name")
        const email = document.querySelector(".input-email")
        const password = document.querySelector(".input-password")
        const select = document.querySelector(".select-level")
        const form = document.querySelector(".form")
       
        form.addEventListener("submit", async (event)=>{
            event.preventDefault()
        
            
            const userInfo = {
                username: user.value,
                password: password.value,
                email: email.value,
                professional_level: select.options[select.selectedIndex].value,
            
            }
    
             register(userInfo)
        })
    }
    
    getRegisterData()