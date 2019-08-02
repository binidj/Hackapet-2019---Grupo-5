let axios = require('axios')

let pers = []
let logged = []
let persId = 0

function getAllPers () {
    return pers
}

function createPer(perInfo) {
    let newPer = {
        nome: perInfo.nome,
        idade: perInfo.idade,
        cpf: perInfo.cpf,
        email: perInfo.email,
        password: perInfo.password,
        id: persId++
    } 
    pers.push(newPer)
}

function deletePer (id) {
    let perIndex = pers.findIndex(function (per) {
        return per.id == id
    })

    if (perIndex != -1) {
        return pers.splice(perIndex, 1)
    } else return null
}

function findPersByName (nome) {
    return pers.find(function(per) {
        per.nome == nome
    })
}

function getPersByName(nome) {
    let foundPer = findPersByName(nome)

    if (foundPer) {
        return foundPer
    } else return null
}

function getPersByAge (age) {
    let foundPer = pers.filter(function (per){
        per.age == age
    })
    if (foundPer) {
        return foundPer
    } else return null
}

function findPersById (id) {
    return pers.find(function(per) {
        per.id == id
    })
}

function getPersById (id) {
    let foundPer = findPersById(id)

    if (foundPer) {
        return foundPer
    } else return null
}

function changePass (id, newPass) {
    let toBeUpdated = pers.find(function (per) {
        per.id == id
    })
    if (toBeUpdated) {
        toBeUpdated.password = newPass
    } else return null
}

function changeName (id, newName) {
    let toBeUpdated = pers.find(function (per) {
        per.id == id
    })
    if (toBeUpdated) {
        toBeUpdated.name = newName
    } else return null
}

function login (body) {
    let foundPer = findPersById(body.id)
    if (foundPer) {
        //crypto
        logged.push(foundPer)
    } else return
}

function logout (id) {
    let perIndex = logged.findIndex(function (per) {
        return per.id == id
    })

    if (perIndex != -1) {
        return logged.splice(perIndex, 1)
    } else return null
}

module.exports = {
    findPersByName,
    changePass,
    getPersById,
    changeName,
    findPersById,
    getAllPers,
    getPersByAge,
    getPersByName,
    createPer,
    deletePer,
    login,
    logout
}