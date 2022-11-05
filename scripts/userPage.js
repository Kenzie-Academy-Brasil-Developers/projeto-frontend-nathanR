import { ModaleditUser } from "./modais.js"
import { getLocalStorage} from "./localStorage.js"
import {getDataloggedUser, getCoWorksUser, editUserOnApi, verifyUser, getCompanyName} from "./requests.js"



function logout(){
    const button = document.querySelector(".logout")
    button.addEventListener("click", ()=>{
        localStorage.setItem("userAuthorization", JSON.stringify(""))
        window.location.replace("/pages/login.html")
    })
}
logout()

async function isAllowed (){
    const user = getLocalStorage()
    const validation = await verifyUser(user.token)
    if(validation || user == ""){
        window.location.replace("/pages/login.html")
    }
}
isAllowed()



function openEditUser(){
    const body =  document.querySelector("body")
    const edit = document.querySelector(".edit-pen")
    edit.addEventListener("click", ()=>{
        console.log("clicou")
       const modal =  ModaleditUser()
       body.appendChild(modal)
       closeModal()
       editUser ()
    })
}
openEditUser()

function closeModal(){
    const modal = document.querySelector(".div-cover")
    const button = document.querySelector(".close-modal")
    button.addEventListener("click", ()=>{
        console.log
        modal.remove()
    })
}

async function renderUserInfo(){
    const userInfos = await getDataloggedUser()
    const username = document.querySelector(".username-h1")
    const userMail = document.querySelector(".user-mail")
    const userLevel = document.querySelector(".user-level")
    const kindWork = document.querySelector(".kind-work")

   
    username.innerHTML = userInfos.username 
    userMail.innerHTML = userInfos.email 
    userLevel.innerHTML = userInfos.professional_level || "" 
    kindWork.innerHTML = userInfos.kind_of_work || "" 

}

renderUserInfo()


async function renderUserCoWorks (){
    const coWorkersDepartment = await getCoWorksUser()
    
    console.log(coWorkersDepartment)


    const companyData = document.querySelector(".company-data-div")
    const ul = document.querySelector(".employees-list")
    

    if(coWorkersDepartment.length === 0){
        
        const p = document.createElement("p")
        p.innerHTML = "Você ainda não foi contratado"
        companyData.remove()
        ul.appendChild(p)
    }
    else{
        const company = await getCompanyName(coWorkersDepartment[0].company_uuid)
        const h2Name = document.createElement ("h2")
        
        h2Name.innerText = ` ${company.name} -  ${coWorkersDepartment[0].description}`

        companyData.append(h2Name)

        coWorkersDepartment[0].users.forEach(element => {
            const li = document.createElement ("li")
            const pCoWorkName = document.createElement ("p")
            const pCoWorklevel = document.createElement ("p")
            pCoWorkName.innerText = element.username
            pCoWorklevel.innerText = element.professional_level
            li.classList.add("employee-card")
            pCoWorkName.classList.add("employee-name")
            li.append(pCoWorkName, pCoWorklevel)
            ul.appendChild(li)
        });
       
    }
}

renderUserCoWorks()


function editUser (){
const modal = document.querySelector(".div-cover")
const form =  document.querySelector(".form")
const inputName = document.querySelector(".input-name")
const inputMail = document.querySelector(".input-mail")
const inputPassword = document.querySelector(".input-password")

form.addEventListener("submit", async (event) =>{
    event.preventDefault()
    const body = {
        username: inputName.value,
        password: inputPassword.value,
        email: inputMail.value
    }
    console.log(body)
   const request = await editUserOnApi(body)
    if(request.ok){
        renderUserInfo()
        modal.remove()
    }

})

}

export {renderUserInfo}