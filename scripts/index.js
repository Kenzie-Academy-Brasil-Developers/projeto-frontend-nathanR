import { getCompanies, register } from "./requests.js"



function moveToLogin (classe){
const button = document.querySelector(classe||".login")
button.addEventListener("click", ()=>{
    window.location.replace("/pages/login.html")

})
}
moveToLogin()

function moveToRegister(classe){
    const button = document.querySelector(classe||".register")
    button.addEventListener("click", ()=>{
        window.location.replace("/pages/cadastro.html")
    })

}
moveToRegister()

async function createFilter (){
    const companies = await getCompanies()
    const divFilter = document.querySelector(".companies-filter")

    companies.forEach(element => {
        const option = document.createElement("option")
        option.innerText = element.sectors.description
        option.value = element.sectors.description
    

        divFilter.append(option)
    })
    
    filterCompanies(companies)
}
createFilter()



function filterCompanies(companies){

const select = document.querySelector(".companies-filter")

renderCompanies(companies)

select.addEventListener("change", (event) => {
    let valueToFilter  = event.target.value
    if(valueToFilter == "todos"){
        renderCompanies(companies)  
    }
    else{ 
        const companiesFiltered = companies.filter(element => element.sectors.description == valueToFilter)
        renderCompanies(companiesFiltered)
    }
})  
}



function renderCompanies (companies){
    
    const ul = document.querySelector(".companies-list")
    ul.innerHTML = ""
    companies.forEach(element => {
        const li = document.createElement("li")
        const companyName = document.createElement("p")
        const companyOpening = document.createElement("p")
        const companySector = document.createElement("p")

        li.classList.add("company-card")
        companyName.classList.add("card-company-name")
        companyOpening.classList.add("card-company-hours")
        companySector.classList.add("card-company-sector")

        companyName.innerText = element.name
        companyOpening.innerText = element.opening_hours
        companySector.innerText = element.sectors.description

        li.append(companyName, companyOpening, companySector)
        ul.appendChild(li)
        
    });
}


function openMenu (){
    const menu = document.querySelector(".sanduiche")
    menu.addEventListener("click", () =>{
      const body  =   document.querySelector("body")
      const divCover = document.createElement("div")
      const divModal = document.createElement("div")
      const divButtons = document.createElement("div")
      const register = document.createElement("button")
      const login = document.createElement("button")

      register.classList.add("register-modal")
      login.classList.add("login-modal")
      divButtons.classList.add("div-buttons-header")
      divCover.classList.add("div-cover")  
      divModal.classList.add("div-modal")
      
      register.innerText = "Register"
      login.innerText = "login"

      divButtons.append(register, login)
      divModal.append(divButtons)
      divCover.appendChild(divModal)
      body.appendChild(divCover)

      moveToRegister (".register-modal")
      moveToLogin(".login-modal")
      
    } )
  
}
openMenu()



