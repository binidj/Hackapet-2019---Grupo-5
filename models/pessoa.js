let axios = require('axios')

let pers = []
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
    let foundPer = pers.find(function (per){
        per.id == id
    })
    if (foundPer) {
        return foundPer
    } else return null
}

function updatePer (id, perInfo) {
    let toBeUpdated = pers.find(function (per) {
        per.id == id
    })
    if (toBeUpdated) {
        toBeUpdated.name = perInfo.name
        toBeUpdated.email = perInfo.email
        toBeUpdated.password = perInfo.password
    } else return null
}

module.exports = {
    findPersByName,
    getPersById,
    findPersById,
    getAllPers,
    getPersByAge,
    getPersByName,
    updatePer,
    createPer,
    deletePer
}