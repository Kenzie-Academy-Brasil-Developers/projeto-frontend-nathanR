import { login } from "./requests.js"

async function moveToHome (){
    const button =  document.querySelector(".home")
     button.addEventListener("click", ()=>{
        window.location.replace("/pages/index.html")
    })
    }
     moveToHome()
    
    function moveToRegister(){
        const button = document.querySelector(".register")
        button.addEventListener("click", ()=>{
            window.location.replace("/pages/cadastro.html")
        })
    
    }
    moveToRegister()

    function moveToRegisterFromForm (){
        const button = document.querySelector(".register-form")
        button.addEventListener("click", (event)=>{
            event.preventDefault()
            console.log("oi")
            window.location.replace("/pages/cadastro.html")
        })
    
    }
    moveToRegisterFromForm()

 
    

     function getLoginData(){
    const email = document.querySelector(".input-email")
    const password = document.querySelector(".input-password")
    const form = document.querySelector(".form")
   
    form.addEventListener("submit", async (event)=>{
        event.preventDefault()
        
        const userInfo = {
            email: email.value,
            password: password.value
        }
        await login(userInfo)
    })
    }

    getLoginData()
    
   