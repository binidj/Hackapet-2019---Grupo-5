let axios = require('axios')
let crypto = require('crypto')

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
        id: persId++
    }
    let genSalt = saltPassword(perInfo.password)
    newPer.salt = genSalt.salt
    newPer.hash = genSalt.passwordData
    pers.push(newPer)
    return newPer
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
        return per.nome == nome
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
        return per.age == age
    })
    if (foundPer) {
        return foundPer
    } else return null
}

function findPersById (id) {
    return pers.find(function(per) {
        return per.id == id
    })
}

function getPersById (id) {
    let foundPer = findPersById(id)

    if (foundPer) {
        return foundPer
    } else return null
}

function findPersByCpf (cpf) {
    return pers.find(function(per) {
        return per.cpf == cpf
    })
}

function getPersByCpf (cpf) {
    let foundPer = findPersByCpf(cpf)

    if (foundPer) {
        return foundPer
    } else return null
}

function findPersByEmail (email) {
    return pers.find(function(per) {
        return per.email == email
    })
}

function getPersByEmail (email) {
    let foundPer = findPersByEmail(email)

    if (foundPer) {
        return foundPer
    } else return null
}

function changePass (id, newPass) {
    let toBeUpdated = pers.find(function (per) {
        return per.id == id
    })
    if (toBeUpdated) {
        toBeUpdated.password = newPass
        return toBeUpdated
    } else return null
}

function changeName (id, newName) {
    let toBeUpdated = pers.find(function (per) {
        return per.id == id
    })
    if (toBeUpdated) {
        toBeUpdated.name = newName
        return toBeUpdated
    } else return null
}

function login (password, salt, hash, resultPer) {
    let verify = sha512(password, salt)
    if (verify.passwordHash == hash) { 
        logged.push(resultPer)
        return resultPer
    } else return null
}

function logout (id) {
    let perIndex = logged.findIndex(function (per) {
        return per.id == id
    })

    if (perIndex != -1) {
        return logged.splice(perIndex, 1)
    } else return null
}

function randomString (length) {
    return crypto.randomBytes(Math.ceil(length/2)).toString('hex').slice(0, length)
}

function sha512 (password, salt){
    let hash = crypto.createHmac('sha512', salt)
    hash.update(password)
    let value = hash.digest('hex')
    return {
        salt:salt,
        passwordHash:value
    };
};

function saltPassword (userPassword) {
    let salt = randomString(16)
    let passwordData = sha512(userPassword, salt)
    return {salt: salt, passwordData: passwordData.passwordHash}
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
    logout,
    getPersByCpf,
    getPersByEmail
}