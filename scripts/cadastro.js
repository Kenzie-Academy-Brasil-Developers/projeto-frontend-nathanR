import { register } from "./requests.js"

function moveToHome (classe){
    const button = document.querySelector(classe || ".home")
    button.addEventListener("click", ()=>{
        window.location.replace("/pages/index.html")
    })
    }
    moveToHome()
    
    function moveToLogin(classe){
        const button = document.querySelector(classe || ".login")
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

    function openMenu (){
        const menu = document.querySelector(".sanduiche")
        menu.addEventListener("click", () =>{
          const body  =   document.querySelector("body")
          const divCover = document.createElement("div")
          const divModal = document.createElement("div")
          const divButtons = document.createElement("div")
          const home = document.createElement("button")
          const login = document.createElement("button")

          home.classList.add("home-modal")
          login.classList.add("login-modal")
          divButtons.classList.add("div-buttons-header")
          divCover.classList.add("div-cover")  
          divModal.classList.add("div-modal")
          
          home.innerText = "Home"
          login.innerText = "login"

          divButtons.append(home, login)
          divModal.append(divButtons)
          divCover.appendChild(divModal)
          body.appendChild(divCover)

          moveToHome (".home-modal")
          moveToLogin(".login-modal")
          
        } )
      
    }
    openMenu()

 