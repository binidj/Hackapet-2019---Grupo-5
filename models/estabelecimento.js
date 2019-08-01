let axios = require('axios')

let ests = []

function createEst(estInfo) {
    let est = {
        loja: estInfo.loja,
        endereco: {
            rua : estInfo.endereco.rua,
            tel: estInfo.endereco.tel,
            cidade: estInfo.endereco.cidade
        },
        email: estInfo.email,
        tipo: estInfo.tipo,
        nota: {
            notaADM: 0.0,
            notaPub: 0.0
        },
        votos: 0,
        cnpj: estInfo.cnpj
    }
    ests.push(newEst)
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
        if(foundLoja.votos == 0) {
            foundLoja.votos = 1
            foundLoja.nota = nota
        } else {
            foundLoja.votos += 1
            foundLoja.nota = (foundLoja.nota+nota)/2
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
        foundLoja.endereco.tel = infoEst.endereco.tel
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

modules.export = {
    createEst,
    getAllEst,
    getEst,
    getEstNoteEquals,
    getTypeEst,
    putDados,
    putNota,
    putNotaAdm,
    delEst
}