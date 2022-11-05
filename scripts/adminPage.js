import { 
    modalCreateDepartment, 
    ModaleditUserFromAdmin, 
    ModalRemoveUserFromAdmin,
    ModalDeleteDepartmentFromAdmin, 
    modalEditDepartment,
    modalViewDepartment, 
    removeEmployee
} from "./modais.js"

import { 
    verifyUser,
    getDepartmentsList,
    getAllUsers,
    createDepartment,
} from "./requests.js"

import {getLocalStorage} from "./localStorage.js"

function logout(){
    const button = document.querySelector(".logout")
    button.addEventListener("click", ()=>{
        localStorage.setItem("userAuthorization", JSON.stringify(""))
        window.location.replace("/pages/login.html")
    })
}
logout()   

async function isAllowed (){
    const token = getLocalStorage()
    const validation = await verifyUser(token.token)
    if(validation === false || token == "" ){
        window.location.replace("/pages/login.html")
    }
}
isAllowed()

async function renderDepartaments (departmentList){
    
    const token = await getLocalStorage()
    const departmentsCompleteList = await getDepartmentsList(token.token)
    const ulToRender = document.querySelector(".departments-list")
    ulToRender.innerHTML = ""

    let departments 

    if(departmentList== undefined || departmentList.length == 0){
        
        departments = departmentsCompleteList
    } else{
        departments = departmentList
    }
    departments.forEach(element =>{ 

    const cardsDepartments = document.createElement("li") 
    const divCardDescription = document.createElement("div")
    const departmentName = document.createElement("p")  
    const departmentDescription = document.createElement("p")  
    const companyName = document.createElement("p")  
    const divCardButtons = document.createElement("div")
    const viewDepartment = document.createElement("img")  
    const editDepartment = document.createElement("img")  
    const removeDepartment = document.createElement("img")  
      
    departmentName.innerText = element.name
    departmentDescription.innerText = element.description
    companyName.innerText = element.companies.name
    viewDepartment.src = "/assets/view.svg"
    editDepartment.src = "/assets/editPenBlack.svg"
    removeDepartment.src = "/assets/trash.svg"

    viewDepartment.id = element.uuid
    editDepartment.id = element.uuid
    removeDepartment.id = element.uuid

    cardsDepartments.classList.add("department-card")
    divCardDescription.classList.add("card-description")
    divCardButtons.classList.add("card-buttons")
    departmentName.classList.add("name")
    viewDepartment.classList.add("view-department")
    editDepartment.classList.add("edit-department")
    removeDepartment.classList.add("delete-department")

    divCardDescription.append(departmentName, departmentDescription, companyName)
    divCardButtons.append(viewDepartment,editDepartment,removeDepartment)
    cardsDepartments.append(divCardDescription,divCardButtons)
    
    ulToRender.append(cardsDepartments)
    
    })
    
    viewDepartment()
    callEditDepartment()
    callDeleteDepartment()
}

async function renderUsers(){
    
    const token = await getLocalStorage()
    const users = await getAllUsers (token.token)
    const ulToRender = document.querySelector(".users-list")
    const departments = await getDepartmentsList(token.token)

   

   departments.forEach(element => {
    
    
   });

    users.forEach(async (element) => {
   
    const userDeparment = departments.find(department => department.uuid == element.department_uuid)

    if(element.username !== "ADMIN") {

    const cardsUsers = document.createElement("li") 
    const divCardInfo = document.createElement("div")
    const username = document.createElement("p")  
    const userLevel = document.createElement("p")  
    const companyName = document.createElement("p")  
    const divCardButtons = document.createElement("div") 
    const editUser = document.createElement("img")  
    const removeUser = document.createElement("img")  
      
    username.innerText = element.username
    userLevel.innerText = element.professional_level || ""
    if(userDeparment !== undefined){ 
    companyName.innerText = userDeparment.companies.name || ""
    } 
    editUser.src = "/assets/editPenBlack.svg"
    removeUser.src = "/assets/trash.svg"
    
  
    editUser.id = element.uuid
    removeUser.id = element.uuid

    cardsUsers.classList.add("users-card")
    divCardInfo.classList.add("users-info")
    divCardButtons.classList.add("card-buttons")
    username.classList.add("name")
    editUser.classList.add("edit-user")
    removeUser.classList.add("remove-user")
    

    divCardInfo.append(username, userLevel, companyName)
    divCardButtons.append(editUser,removeUser)
    cardsUsers.append(divCardInfo,divCardButtons)
    ulToRender.append(cardsUsers)
    
    }
    })
    callEditUsers()
    callremoveUser()
}
renderUsers()


function callCreateDepartment(){
const formModalCreate =  document.querySelector(".form")
const inputNameDepartment = document.querySelector(".input-name")
const inputDescription = document.querySelector(".input-description")
const select = document.querySelector(".select")

formModalCreate.addEventListener("submit", (event)=>{
    event.preventDefault()  
    const body = {
        name: inputNameDepartment.value,
        description: inputDescription.value,
        company_uuid: select.options[select.selectedIndex].id
    }
    
    createDepartment(body)
})
}

function callModalCreateDepartment (){
    
    const body = document.querySelector("body")
    const button = document.querySelector(".create-department")
    button.addEventListener("click", async ()=>{
        const modal = await modalCreateDepartment()
        body.appendChild(modal)
        closeModal()
        callCreateDepartment()

    })
}
callModalCreateDepartment()


function closeModal(){
    const modal = document.querySelector(".div-cover")
    const button = document.querySelector(".close-modal")
    button.addEventListener("click", ()=>{
        modal.remove()
    })

}

 function viewDepartment(){
    const body = document.querySelector("body")
    const button = document.querySelectorAll(".view-department")
    button.forEach(element => {
        element.addEventListener("click", async ()=>{
                const modal = await modalViewDepartment(element.id)
                body.appendChild(modal)
                closeModal()
                removeEmployee()
        })
    })
}

 function callEditDepartment(){
    const body = document.querySelector("body")
    const button = document.querySelectorAll(".edit-department")

    button.forEach(element => {
        element.addEventListener("click", async ()=>{
                const modal = await modalEditDepartment(element.id)
                body.appendChild(modal)
                closeModal()
        })
    })
   
}

 function callDeleteDepartment(){
    const body = document.querySelector("body")
    const button = document.querySelectorAll(".delete-department")
    button.forEach(element => {
        element.addEventListener("click", async ()=>{
                const modal = await ModalDeleteDepartmentFromAdmin(element.id)
                body.appendChild(modal)
                closeModal()
        })
    })
}

function callEditUsers(){
    const body = document.querySelector("body")
    const button = document.querySelectorAll(".edit-user")
    button.forEach(element => {
        element.addEventListener("click", ()=>{
                const modal = ModaleditUserFromAdmin(element.id)
                body.appendChild(modal)
                closeModal()
        })
    })
}

function callremoveUser(){
    const body = document.querySelector("body")
    const button = document.querySelectorAll(".remove-user")
    button.forEach(element => {
        element.addEventListener("click", async ()=>{
                const modal = await ModalRemoveUserFromAdmin(element.id)
                body.appendChild(modal)
                closeModal()
        })
    })
}

async function filterDepartments(){
    const token = await getLocalStorage()
    const departments = await getDepartmentsList(token.token)

    const select = document.querySelector("#filter-companies")
    select.innerHTML = ""
    const optionDefault = document.createElement("option")
    optionDefault.innerText = "Selecionar Empresa"
    select.append(optionDefault)
    
    departments.forEach(element => {
        const optionCompany = document.createElement("option")
        optionCompany.innerText = element.companies.name
        select.append(optionCompany)
        });


    select.addEventListener("change", (event) => {
        let valueToFilter  = event.target.value
        if(valueToFilter == "Selecionar empresa"){
            renderDepartaments(departments)  
        }
        else{ 
            const companiesFiltered = departments.filter(element => element.companies.name == valueToFilter)
            renderDepartaments(companiesFiltered)
        }
    })  
    renderDepartaments()
    }
 
    filterDepartments()