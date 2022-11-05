import { getCompanies } from "./requests.js"



function moveToLogin (){
const button = document.querySelector(".login")
button.addEventListener("click", ()=>{
    window.location.replace("/pages/login.html")

})
}
moveToLogin()

function moveToRegister(){
    const button = document.querySelector(".register")
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




