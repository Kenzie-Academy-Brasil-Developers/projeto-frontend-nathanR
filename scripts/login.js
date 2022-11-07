import { login, register } from "./requests.js"

async function moveToHome (classe){
    
    const button =  document.querySelector(classe || ".home")
     button.addEventListener("click", ()=>{
        
        window.location.replace("/pages/index.html")

    })
    }
     moveToHome()
    
    function moveToRegister(classe){
        const button = document.querySelector(classe || ".register")
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
    
    function openMenu (){
        const menu = document.querySelector(".sanduiche")
        menu.addEventListener("click", () =>{
          const body  =   document.querySelector("body")
          const divCover = document.createElement("div")
          const divModal = document.createElement("div")
          const divButtons = document.createElement("div")
          const home = document.createElement("button")
          const register = document.createElement("button")

          home.classList.add("home-modal")
          register.classList.add("register-modal")
          divButtons.classList.add("div-buttons-header")
          divCover.classList.add("div-cover")  
          divModal.classList.add("div-modal")
          

          home.innerText = "Home"
          register.innerText = "Cadastro"

          divButtons.append(home, register)
          divModal.append(divButtons)
          divCover.appendChild(divModal)
          body.appendChild(divCover)

          moveToHome (".home-modal")
          moveToRegister(".register-modal")

        
        } )
      
    }
    openMenu()
