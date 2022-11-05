
import { getLocalStorage } from "./localStorage.js"
import { createToastfyFailed, createToastfySuccess } from "./toastfy.js"

const baseURL = "http://localhost:6278/"

async function getCompanies (){
    try{
        const request = await fetch(baseURL + "companies",{
            method: "GET"
        })
        const response = request.json()
        return response 
    } catch (err){
        console.log(err)
    }
}

async function verifyUser(token){
try{
    const request = await fetch(baseURL +  "auth/validate_user",{ 
        method: "GET",
        headers:{
            "Authorization": `Bearer ${token}`
        }
    })
    const response = await request.json()
    return response.is_admin

} catch(err){
    console.log(err)
}
}

async function login (body){
    try{
        const request = await fetch(baseURL + "auth/" + "login" , {
        method: "POST",
        headers: {
            "Content-Type": "application/json" 
        },
        body: JSON.stringify(body)
        })
        const response = await request.json()
        

        if(request.ok){
            localStorage.setItem("userAuthorization",JSON.stringify(response))
            const isAdmin = await verifyUser(response.token)
            if(isAdmin){
            setTimeout(() =>{window.location.replace("/pages/adminPage.html")},1000)
            } else { 
            setTimeout(() =>{window.location.replace("/pages/userpage.html")},1000)
            }
        } else{
            wrongData ()
        }
    } catch(err){
        console.log(err)
    }
}

async function register (body){

    try{
        const request = await fetch(baseURL + "auth/" + "register" , {
        method: "POST",
        headers: {
            "Content-Type": "application/json" 
        },
        body: JSON.stringify(body)
        
        })
    
        if(request.ok){
            const body = document.querySelector("body")
            body.appendChild(createToastfySuccess("usuário criado com sucesso"))
           setTimeout(() =>{window.location.replace("/pages/login.html")},4000)
        } else{
            const body = document.querySelector("body")
            body.appendChild(createToastfyFailed("algo deu errado"))
        }
    } catch(err){
        console.log(err)
    }

}

function wrongData(){
    const message = document.querySelector(".wrong-data")
    message.innerHTML  = "email ou senha incorretos"
}

async function getDataloggedUser(){ 

const localStorageData = getLocalStorage()

try{ 
    const request = await fetch(baseURL + "users/profile", {
        method: "GET",
        headers:{
            "Authorization": `Bearer ${localStorageData.token}`
    }
})
const response = request.json()

return response

} catch(err){
    console.log("error")
}
}

async function getCoWorksUser (){

const localStorageData = getLocalStorage()
try {
    const request = await fetch(baseURL + "users/departments/coworkers", {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${localStorageData.token}`
        }
        
    })
    const response = request.json()
    return response
    
} catch (error) {
    console.log(error)
}

}

async function getCompanyName(id){
   const companies = await getCompanies()
   const comapanyFound = companies.find(element => element.uuid === id)

   return comapanyFound
}

async function editUserOnApi(body){
   
    const localStorageData = getLocalStorage()

    try {
        const request = await fetch(baseURL + "users", {
            method: "PATCH",
            headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorageData.token}`
                    },
            body: JSON.stringify(body)
            })

        if(request.ok){
            const body = document.querySelector("body")
            body.appendChild(createToastfySuccess("usuário alterado com sucesso"))
            return request

        } else{
            const body = document.querySelector("body")
            body.appendChild(createToastfyFailed("Algo deu errado"))
        }
        
    } catch (error) {
        console.log(error)
    }

}

async function getDepartmentsList(token){
    try {
        const request = await fetch(baseURL + "departments", {
            method: "GET",
            headers: {
                    "Authorization": `Bearer ${token}`
                    },
            })
        const response = request.json()
        return response
                
        
    } catch (error) {
        console.log(error)
    }
}

async function getAllUsers(token){
    try {
        const request = await fetch(baseURL + "users", {
            method: "GET",
            headers: {
                    "Authorization": `Bearer ${token}`
                    },
            })
        const response = request.json()
        return response
                
        
    } catch (error) {
        console.log(error)
    }

}

async function createDepartment(body){
    const token = getLocalStorage()
    try{
        const request = await fetch(baseURL + "departments", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token.token}` 

        },
        body: JSON.stringify(body)
        
        })
    
        if(request.ok){
            const body = document.querySelector("body")
            body.appendChild(createToastfySuccess("departamento criado com sucesso"))
            setTimeout(() =>{window.location.replace("/pages/adminPage.html")},4000)
        } else{
            const bodyPage = document.querySelector("body")
            bodyPage.appendChild(createToastfyFailed("Algo deu errado"))
        }
    } catch(err){
        console.log(err)
    }
}

async function deleteUserRegistered(id, body){
console.log(id, body)
const token = await getLocalStorage()

    try{
        const request = await fetch(`${baseURL}admin/delete_user/${id}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${token.token}` 
        },
        })
        if(request.ok){
            const bodyPage = document.querySelector("body")
            bodyPage.appendChild(createToastfySuccess("usuário deletado com sucesso"))
            setTimeout(() =>{window.location.replace("/pages/adminPage.html")},4000)
        } else{
            const bodyPage = document.querySelector("body")
            bodyPage.appendChild(createToastfyFailed("Algo deu errado"))
        }
    } catch(err){
        console.log(err)
    }

}

async function editUsers(id, body){
        console.log(id, body)
        const token = await getLocalStorage()
        
            try{
                const request = await fetch(`${baseURL}admin/update_user/${id}`, {
                    method: "PATCH",
                    headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${token.token}`
                            },
                    body: JSON.stringify(body)
                    })
        
                if(request.ok){
                    const bodyPage = document.querySelector("body")
                     bodyPage.appendChild(createToastfySuccess("usuário alterado com sucesso"))
                    setTimeout(() =>{window.location.replace("/pages/adminPage.html")},4000)
        
                } else{
                    const body = document.querySelector("body")
                    body.appendChild(createToastfyFailed("Algo deu errado"))
                }
            } catch(err){
                console.log(err)
            }
        
}
        
async function deleteDepartmentRegistered(id){
    const token = await getLocalStorage()
        
    try{
        const request = await fetch(`${baseURL}departments/${id}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${token.token}` 
        },
        })
        if(request.ok){
            const bodyPage = document.querySelector("body")
            bodyPage.appendChild(createToastfySuccess("departamento deletado com sucesso"))
            setTimeout(() =>{window.location.replace("/pages/adminPage.html")},4000)
        } else{
            const bodyPage = document.querySelector("body")
            bodyPage.appendChild(createToastfyFailed("Algo deu errado"))
        }
    } catch(err){
        console.log(err)
    }
    
}

async function editDepartmentRegistered(id, body){
    const token = await getLocalStorage()
        
    try{
        const request = await fetch(`${baseURL}departments/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token.token}`
            },
        body: JSON.stringify(body)
        })
        
        if(request.ok){
            const bodyPage = document.querySelector("body")
            bodyPage.appendChild(createToastfySuccess("departamento editado com sucesso"))
            setTimeout(() =>{window.location.replace("/pages/adminPage.html")},4000)
        } else{
            const bodyPage = document.querySelector("body")
            bodyPage.appendChild(createToastfyFailed("Algo deu errado"))
        }
    } catch(err){
        console.log(err)
    }
    
}

async function hireUserFromModal(body){
    const token = await getLocalStorage()
        
    try{
        const request = await fetch(`${baseURL}departments/hire`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token.token}`
            },
        body: JSON.stringify(body)
        })
        
        if(request.ok){
            const bodyPage = document.querySelector("body")
            bodyPage.appendChild(createToastfySuccess("usuário contratado com sucesso"))
            setTimeout(() =>{window.location.replace("/pages/adminPage.html")},4000)
        } else{
            const bodyPage = document.querySelector("body")
            bodyPage.appendChild(createToastfyFailed("Algo deu errado"))
        }
    } catch(err){
        console.log(err)
    }
}

async function dismissEmployee(id){
    const token = await getLocalStorage()
        
    try{
        const request = await fetch(`${baseURL}departments/dismiss/${id}`, {
        method: "PATCH",
        headers: {
            "Authorization": `Bearer ${token.token}` 
        },
        })
        if(request.ok){
            const body = document.querySelector("body")
            body.appendChild(createToastfySuccess("usuário demetido com sucesso"))
            setTimeout(() =>{window.location.replace("/pages/adminPage.html")},4000)
        } else{
            const body = document.querySelector("body")
            body.appendChild(createToastfyFailed("Algo deu errado"))
        }
    } catch(err){
        console.log(err)
    }
    
}

async function getUnemployedUsers(token){
    try {
        const request = await fetch(baseURL + "admin/out_of_work", {
            method: "GET",
            headers: {
                    "Authorization": `Bearer ${token}`
                    },
            })
        const response = request.json()
        return response
                
        
    } catch (error) {
        console.log(error)
    }


}

export {
        getCompanies, 
        login, 
        register, 
        getDataloggedUser, 
        getCoWorksUser, 
        editUserOnApi, 
        verifyUser,
        getDepartmentsList,
        getAllUsers, 
        createDepartment,
        deleteUserRegistered,
        editUsers,
        deleteDepartmentRegistered,
        getCompanyName,
        editDepartmentRegistered,
        hireUserFromModal,
        dismissEmployee,
        getUnemployedUsers
     }

