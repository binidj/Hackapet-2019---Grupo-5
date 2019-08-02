let axios = require('axios')
let ests = []

function media(notaGeral,votos) {
    return (notaGeral)/votos
}

function createEst(estInfo) {
    let est = {
        loja: estInfo.loja,
        endereco: {
            rua : estInfo.endereco.rua,
            cidade: estInfo.endereco.cidade
        },
        email: estInfo.email,
        tipo: estInfo.tipo,
        nota: {
            votos: 0,
            notaADM: 0.0,
            notaSomatorio: 0.0,
            notaPub: 0.0
        },
        cnpj: estInfo.cnpj
    }
    ests.push(est)
}

function getEst(cnpj) {
    let foundLoja = ests.filter(function(est) {
        return est.cnpj == cnpj
    })
    return foundLoja
}

function getEstByName(loja) {
    let foundLoja = ests.filter(function(est) {
        return est.loja.includes(loja)
    })
    return foundLoja
}



function getTypeEst(tipo) {
    let foundLoja = ests.filter(function(est) {
        return est.tipo == tipo
    })
    return foundLoja
}

function getEstNoteEquals(nota) {
    let foundLoja = ests.filter(function(est) {
        return est.nota.notaPub >= nota
    })
    return foundLoja
}

function getAllEst() {
    return ests
}

function putNota(nota,cnpj) {
    let foundLoja = ests.filter((est) => {
        return est.cnpj == cnpj
    })
    if (foundLoja.length != 0) {
        if (foundLoja[0].nota.votos == 0) {
            foundLoja[0].nota.votos = 1
            foundLoja[0].nota.notaSomatorio = nota
            foundLoja[0].nota.notaPub = nota
        } else {
            foundLoja[0].nota.votos += 1
            foundLoja[0].nota.notaSomatorio += nota
            foundLoja[0].nota.notaPub = media(foundLoja[0].nota.notaSomatorio, foundLoja[0].nota.votos)
        }
        return foundLoja
    }
    return null
}

function putNotaAdm(nota,cnpj) {
    let foundLoja = ests.filter(function(est) {
        return est.cnpj == cnpj
    })
    if (foundLoja) {
        foundLoja[0].nota.notaADM = nota
        return foundLoja
    }
    return null
}

function putDados(infoEst,cnpj) {
    let foundLoja = ests.filter(function(est) {
        return est.cnpj == cnpj
    })
    if (foundLoja.length != 0) {
        foundLoja[0].loja = infoEst.loja
        foundLoja[0].endereco.rua= infoEst.endereco.rua
        foundLoja[0].endereco.cidade = infoEst.endereco.cidade
        return foundLoja
    }
    return null
}

function findEst(cnpj) {
    let foundLoja = ests.filter(function(est) {
        return est.cnpj == cnpj
    })
    if (foundLoja.length != 0) {
        return 1
    } else return 0
}

function delEst(cnpj) {
    let foundLoja = ests.filter(function(est) {
        return ests.cnpj == cnpj
    })
    if (foundLoja) {
        return ests.splice(foundLoja,1)
    } else return null
}

module.exports = {
    createEst,
    getEst,
    getEstByName,
    getAllEst,
    getEstNoteEquals,
    getTypeEst,
    putDados,
    putNota,
    putNotaAdm,
    delEst,
    findEst
}