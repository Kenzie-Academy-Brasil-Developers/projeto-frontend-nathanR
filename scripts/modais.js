import { getLocalStorage } from "./localStorage.js"
import { 
    getAllUsers, 
    getCompanies, 
    getDepartmentsList, 
    deleteUserRegistered, 
    editUsers, 
    deleteDepartmentRegistered,
    editDepartmentRegistered,
    hireUserFromModal,
    dismissEmployee,
    getCompanyName,
    getUnemployedUsers
    } from "./requests.js"

function ModaleditUser(){
const divCover = document.createElement("div")
const divModal = document.createElement("div")
const closeModal = document.createElement("button")
const h1 = document.createElement("h1")
const form = document.createElement("form")
const inputName = document.createElement("input")
const inputMail = document.createElement("input")
const inputPassword = document.createElement("input")
const editarButton = document.createElement("button")


closeModal.innerText = "x"
h1.innerText = "Editar Perfil"
inputName.placeholder = "Seu nome"
inputMail.placeholder = "Seu e-mail"
inputPassword.placeholder = "Sua senha"
editarButton.innerText = "Editar Perfil"

divCover.classList.add("div-cover")
divModal.classList.add("div-modal")
closeModal.classList.add("close-modal")
form.classList.add("form")
inputName.classList.add("input-name")
inputMail.classList.add("input-mail")
inputPassword.classList.add("input-password")
editarButton.classList.add("editar-button")

editarButton.type ="submit"
inputMail.type = "email"
inputPassword.type = "password"

form.append(inputName,inputMail,inputPassword, editarButton)
divModal.append(closeModal,h1,form)
divCover.appendChild(divModal)

return divCover
}

async function modalCreateDepartment(){
const companies =  await getCompanies ()
const divCover = document.createElement("div")
const divModal = document.createElement("div")
const closeModal = document.createElement("button")
const h1 = document.createElement("h1")
const form = document.createElement("form")
const inputName = document.createElement("input")
const inputMail = document.createElement("input")
const selectComapny = document.createElement("select")
const optionDefault = document.createElement("option")
const editarButton = document.createElement("button")

companies.forEach(element => {
    const optionCompany = document.createElement("option")
    optionCompany.innerText = element.name
    optionCompany.id = element.uuid
    selectComapny.append(optionCompany)
    
    });


closeModal.innerText = "x"
h1.innerText = "Criar Departamento"
inputName.placeholder = "Nome do departamento"
inputMail.placeholder = "Descrição"
optionDefault.innerText = "Selecionar Empresa"
editarButton.innerText = "Criar Departamento"

divCover.classList.add("div-cover")
divModal.classList.add("div-modal")
closeModal.classList.add("close-modal")
form.classList.add("form")
inputName.classList.add("input-name")
inputMail.classList.add("input-description")
selectComapny.classList.add("select")
editarButton.classList.add("create-department")

editarButton.type ="submit"


selectComapny.append(optionDefault)
form.append(inputName,inputMail,selectComapny, editarButton)
divModal.append(closeModal,h1,form)
divCover.appendChild(divModal)

return divCover

}

function ModaleditUserFromAdmin(id){

const divCover = document.createElement("div")
const divModal = document.createElement("div")
const closeModal = document.createElement("button")
const h1 = document.createElement("h1")
const form = document.createElement("form")
const selectJobStyle = document.createElement("select")
const optionJobDefault = document.createElement("option")
const optionJobHomeOffice = document.createElement("option")
const optionJobLocal = document.createElement("option")
const selectProfessionalLevel = document.createElement("select")
const optionLevelDefault = document.createElement("option")
const optionJunior = document.createElement("option")
const optionPleno = document.createElement("option")
const optionSenior = document.createElement("option")

const editarButton = document.createElement("button")

closeModal.innerText = "x"
h1.innerText = "Editar Usuário"
optionJobDefault.innerText = "Selecionar modalidade de trabalho"
optionJobHomeOffice.innerText = "home office"
optionJobLocal.innerText = "presencial"
optionLevelDefault.innerText = "Selecionar nível professional"
optionJunior.innerText = "júnior"
optionPleno.innerText = "pleno"
optionSenior.innerText = "sênior"

editarButton.innerText = "Editar"

editarButton.type ="submit"

divCover.classList.add("div-cover")
divModal.classList.add("div-modal")
closeModal.classList.add("close-modal")
form.classList.add("form")
selectJobStyle.classList.add("select")
selectProfessionalLevel.classList.add("select")
editarButton.classList.add("editar-button")


form.addEventListener("submit", (event)=>{
    event.preventDefault()
    const body = { 
        kind_of_work: selectJobStyle.options[selectJobStyle.selectedIndex].value,
        professional_level: selectProfessionalLevel.options[selectProfessionalLevel.selectedIndex].value
    }

    editUsers(id,body)
})

selectJobStyle.append(optionJobDefault, optionJobHomeOffice, optionJobLocal)
selectProfessionalLevel.append(optionLevelDefault,optionJunior,optionPleno,optionSenior)
form.append(selectJobStyle,selectProfessionalLevel, editarButton)
divModal.append(closeModal,h1,form)
divCover.appendChild(divModal)

return divCover

}

async function ModalRemoveUserFromAdmin (id){
const token = await getLocalStorage()
const users = await getAllUsers (token.token)
const userSelected = users.find(element => element.uuid === id )

const divCover = document.createElement("div")
const divModal = document.createElement("div")
const closeModal = document.createElement("button")
const h1 = document.createElement("h1")
const deleteButton = document.createElement("button")

h1.innerText = `Realmente deseja remover o usuário ${userSelected.username}?`
closeModal.innerText = "X"
deleteButton.innerText = "Deletar"

divCover.classList.add("div-cover")
divModal.classList.add("div-modal-delete")
closeModal.classList.add("close-modal")
deleteButton.classList.add("confirm-delete")


divModal.append(closeModal,h1,deleteButton)
divCover.appendChild(divModal)


deleteButton.addEventListener("click", ()=>{
    deleteUserRegistered(id)
})

return divCover


}

async function ModalDeleteDepartmentFromAdmin(id){

const token = await getLocalStorage()
const departments = await getDepartmentsList(token.token)  
const departmentSelected = departments.find(element => element.uuid === id )  

console.log(departmentSelected)
const divCover = document.createElement("div")
const divModal = document.createElement("div")
const closeModal = document.createElement("button")
const h1 = document.createElement("h1")
const deleteButton = document.createElement("button")

h1.innerText = `Realmente deseja deletar o Departamento "${departmentSelected.name}" e demitir seus funcionários?`
closeModal.innerText = "X"
deleteButton.innerText = "Deletar"

divCover.classList.add("div-cover")
divModal.classList.add("div-modal-delete")
closeModal.classList.add("close-modal")
deleteButton.classList.add("confirm-delete")


divModal.append(closeModal,h1,deleteButton)
divCover.appendChild(divModal)

deleteButton.addEventListener("click", ()=>{
    deleteDepartmentRegistered(id)
})

return divCover

}

async function  modalEditDepartment(id){ 

const token = await getLocalStorage()
const departments = await getDepartmentsList(token.token)
const departmentSelected = departments.find(element => element.uuid === id )  

const divCover = document.createElement("div")
const divModal = document.createElement("div")
const closeModal = document.createElement("button")
const h1 = document.createElement("h1")
const form = document.createElement("form")
const inputDescription = document.createElement("textarea")
const editarButton = document.createElement("button")


closeModal.innerText = "x"
h1.innerText = "Editar Departamento"
inputDescription.placeholder = departmentSelected.description
editarButton.innerText = "Salvar alterações"

divCover.classList.add("div-cover")
divModal.classList.add("div-modal")
closeModal.classList.add("close-modal")
form.classList.add("form")
inputDescription.classList.add("input-descirption")
editarButton.classList.add("editar-button")


editarButton.type ="submit"


form.append(inputDescription, editarButton)
divModal.append(closeModal,h1,form)
divCover.appendChild(divModal)

form.addEventListener("submit", (event)=>{
    event.preventDefault()
    const body = {
        description: inputDescription.value
    }
    editDepartmentRegistered(id, body)
})
return divCover

}

async function modalViewDepartment(id){
    
    const token = await getLocalStorage()
    const departments = await getDepartmentsList(token.token)
    const users = await getAllUsers(token.token)
    const unemployed = await getUnemployedUsers(token.token)
    console.log(unemployed)

    const departmentToView = departments.find(element => element.uuid === id)
    const userBelongsDepartment = users.filter(element => element.department_uuid === id)

    const company = await getCompanyName(departmentToView.companies.uuid)
    console.log(company)

    const divCover = document.createElement("div")
    const divModal = document.createElement("div")
    const closeModal = document.createElement("button")
    const h1 = document.createElement("h1")
    const divHeader = document.createElement("div")
    const divSubTitle = document.createElement("div")
    const pDescription = document.createElement("p")
    const pCompany = document.createElement("p")
    const divselectUser = document.createElement("div")
    const selectUser = document.createElement("select")
    const optionDefault = document.createElement("option")
    const hireUser = document.createElement("button")
    const ulEmployeesExisted = document.createElement("ul")
    const h2UlAlert = document.createElement("ul")
    
    closeModal.innerText = "x"
    h1.innerText = departmentToView.name
    pDescription.innerText = departmentToView.description
    pCompany.innerText = company.name
    hireUser.innerText = "Contratar"
    optionDefault.innerText = "Selecionar Usuário"
    

    divCover.classList.add("div-cover")
    divModal.classList.add("div-modal-view")
    closeModal.classList.add("close-modal")
    divHeader.classList.add("div-header")
    divSubTitle.classList.add("div-subtitle")
    pDescription.classList.add("description-company")
    divselectUser.classList.add("div-select-user")
    selectUser.classList.add("select-user")
    ulEmployeesExisted.classList.add("ul-employees")

    divSubTitle.append(pDescription,pCompany)
    selectUser.append(optionDefault)
    divselectUser.append(selectUser,hireUser)
    divHeader.append(divSubTitle,divselectUser)
    divModal.append(closeModal,h1,divHeader,ulEmployeesExisted)
    divCover.appendChild(divModal)
    
   


    unemployed.forEach(element=>{
        const optionUser = document.createElement("option")
    
        optionUser.innerText = element.username
        optionUser.id = element.uuid
        selectUser.appendChild(optionUser)
        
        })
        

        if(userBelongsDepartment.length == 0){
            h2UlAlert.innerText = "Nenhum empregado registrado nesse setor" 
            ulEmployeesExisted.appendChild(h2UlAlert)
        } else{ 

        userBelongsDepartment.forEach(element =>{
       
        const cardEmployeeExisted = document.createElement("li")
        const h2Username = document.createElement("h2")
        const pLevel = document.createElement("p")
        const pCompanyName = document.createElement("p")
        const removeEmployee = document.createElement("button")

        removeEmployee.id = element.uuid
    
        h2Username.innerText = element.username
        pLevel.innerText = element.professional_level
        pCompanyName.innerText = company.name
        removeEmployee.innerText ="Desligar"

        cardEmployeeExisted.classList.add("card-employees")
        removeEmployee.classList.add("remove-button")

        cardEmployeeExisted.append(h2Username,pLevel,pCompanyName,removeEmployee)
        ulEmployeesExisted.appendChild(cardEmployeeExisted)
        })
    }  

    hireUser.addEventListener("click", ()=>{
        const body = {
            user_uuid: selectUser.options[selectUser.selectedIndex].id,
            department_uuid: id
            }
        hireUserFromModal(body)
    })



    return divCover

}

function removeEmployee (){
    const buttonRemove = document.querySelectorAll(".remove-button")
   
    buttonRemove.forEach(element => { 
    element.addEventListener("click", ()=>{
        dismissEmployee(element.id)
        
    })
})
}

export {
    ModaleditUser, 
    modalCreateDepartment,
    ModaleditUserFromAdmin,
    ModalRemoveUserFromAdmin,
    ModalDeleteDepartmentFromAdmin,
    modalEditDepartment, 
    modalViewDepartment,
    removeEmployee
}