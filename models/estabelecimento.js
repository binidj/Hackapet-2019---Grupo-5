let axios = require('axios')

let ests = []

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
            notaADM: 0.0,
            notaPub: 0.0,
            votos: 0
        },
        cnpj: estInfo.cnpj
    }
    ests.push(est)
}

function getEst(loja) {
    let foundLoja = ests.filter(function(est) {
        return ests.loja == loja
    })
}

function getTypeEst(tipo) {
    let foundLoja = ests.filter(function(est) {
        return ests.tipo == tipo
    })
}

function getEstNoteEquals(nota) {
    let foundLoja = ests.filter(function(est) {
        return ests.nota == nota
    })
}

function getAllEst() {
    return ests
}

function putNota(nota,cnpj) {
    let foundLoja = ests.filter(function(est) {
        return ests.cnpj == cnpj
    })
    if (foundLoja) {
        if(foundLoja.nota.votos == 0) {
            foundLoja.nota.votos = 1
            foundLoja.nota.notaPub = nota
        } else {
            foundLoja.nota.votos += 1
            foundLoja.nota.notaPub = (foundLoja.nota.notaPub+nota)/2
        }
        return foundLoja
    }
    return null
}

function putNotaAdm(nota,cnpj) {
    let foundLoja = ests.filter(function(est) {
        return ests.cnpj == cnpj
    })
    if (foundLoja) {
        foundLoja.nota.notaADM = nota
        return foundLoja
    }
    return null
}

function putDados(infoEst) {
    let foundLoja = ests.filter(function(est) {
        return ests.cnpj == infoEst.cnpj
    })
    if (foundLoja) {
        foundLoja.loja = infoEst.loja
        foundLoja.endereco.rua= infoEst.endereco.rua
        foundLoja.endereco.cidade = infoEst.endereco.cidade
        return foundLoja
    }
    return null
}

function delEst(cnpj) {
    let foundLoja = ests.filter(function(est) {
        return ests.cnpj == cnpj
    })
    if (foundLoja) {
        return ests.splice(foundLoja,1)
    } 
    return null
}

module.exports = {
    createEst,
    getEst,
    getAllEst,
    getEstNoteEquals,
    getTypeEst,
    putDados,
    putNota,
    putNotaAdm,
    delEst
}