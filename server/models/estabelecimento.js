let axios = require('axios')
let ests = [
    {
    loja: "Restaurante amoroso",
        endereco: {
            localizacao : "Rua josé aníbal",
            cidade: "recife"
        },
        email: "andre@gmail.com",
        tipo: "visao",
        estabelecimento: "restaurante",
        valor: "50",
        nota: {
            votos: 0,
            notaADM: 0.0,
            notaSomatorio: 0.0,
            notaPub: 0.0
        },
        cnpj: 400
},
{
    loja: "Restaurante de marcos",
        endereco: {
            localizacao : "Rua josé aníbal",
            cidade: "recife"
        },
        email: "andre@gmail.com",
        tipo: "audicao",
        estabelecimento: "restaurante",
        valor: "50",
        nota: {
            votos: 0,
            notaADM: 0.0,
            notaSomatorio: 0.0,
            notaPub: 0.0
        },
        cnpj: 401
},
{
    loja: "Restaurante do amor",
        endereco: {
            localizacao : "Rua josé aníbal",
            cidade: "recife"
        },
        email: "andre@gmail.com",
        tipo: "cadeirante",
        estabelecimento: "restaurante",
        valor: "50",
        nota: {
            votos: 0,
            notaADM: 0.0,
            notaSomatorio: 0.0,
            notaPub: 0.0
        },
        cnpj: 402
},
{
    loja: "Restaurante Gucci",
        endereco: {
            localizacao : "Rua josé aníbal",
            cidade: "recife"
        },
        email: "andre@gmail.com",
        tipo: "idoso",
        estabelecimento: "restaurante",
        valor: "50",
        nota: {
            votos: 0,
            notaADM: 0.0,
            notaSomatorio: 0.0,
            notaPub: 0.0
        },
        cnpj: 403215
},
{
    loja: "Museu do amor",
        endereco: {
            localizacao : "Rua josé aníbal",
            cidade: "recife"
        },
        email: "andre@gmail.com",
        tipo: "idoso",
        estabelecimento: "museu",
        valor: "50",
        nota: {
            votos: 0,
            notaADM: 0.0,
            notaSomatorio: 0.0,
            notaPub: 0.0
        },
        cnpj: 40321
},
{
    loja: "Escola amor",
        endereco: {
            localizacao : "Rua josé Martelo",
            cidade: "recife"
        },
        email: "andre@gmail.com",
        tipo: "idoso",
        estabelecimento: "escola",
        valor: "50",
        nota: {
            votos: 0,
            notaADM: 0.0,
            notaSomatorio: 0.0,
            notaPub: 0.0
        },
        cnpj: 40344
},
{
    loja: "Parque dos idosos",
        endereco: {
            localizacao : "Rua josé Transmarco",
            cidade: "recife"
        },
        email: "andre@gmail.com",
        tipo: "idoso",
        estabelecimento: "parque",
        valor: "15",
        nota: {
            votos: 0,
            notaADM: 0.0,
            notaSomatorio: 0.0,
            notaPub: 0.0
        },
        cnpj: 40232
},
{
    loja: "Universidade do amor",
        endereco: {
            localizacao : "Rua josé aníbal",
            cidade: "recife"
        },
        email: "andre@gmail.com",
        tipo: "audicao",
        estabelecimento: "escola",
        valor: "50",
        nota: {
            votos: 0,
            notaADM: 0.0,
            notaSomatorio: 0.0,
            notaPub: 0.0
        },
        cnpj: 4056
},
{
    loja: "Parque dos deficientes visuais",
        endereco: {
            localizacao : "Rua Marcelo Veloso",
            cidade: "recife"
        },
        email: "andre@gmail.com",
        tipo: "visao",
        estabelecimento: "parque",
        valor: "10",
        nota: {
            votos: 0,
            notaADM: 0.0,
            notaSomatorio: 0.0,
            notaPub: 10
        },
        cnpj: 4010
}

]
    
function media(notaGeral,votos) {
    return (notaGeral)/votos
}

function createEst(estInfo) {
    let est = {
        loja: estInfo.loja,
        endereco: {
            localizacao : estInfo.endereco.localizacao,
            cidade: estInfo.endereco.cidade
        },
        email: estInfo.email,
        tipo: estInfo.tipo,
        estabelecimento: estInfo.estabelecimento,
        valor: estInfo.valor,
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

function getEstType(estabelecimento) {
    let foundLoja = ests.filter(function(est) {
        return est.estabelecimento == estabelecimento
    })
    return foundLoja
}

function getEstType2(tipo, estabelecimento) {
    let foundLoja = ests.filter(function(est) {
        return (est.estabelecimento == estabelecimento && est.tipo == tipo)
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
        foundLoja[0].endereco.localizacao= infoEst.endereco.localizacao
        foundLoja[0].endereco.cidade = infoEst.endereco.cidade
        foundLoja[0].valor = infoEst.valor
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
    getEstType,
    getEstByName,
    getEstType2,
    getAllEst,
    getEstNoteEquals,
    getTypeEst,
    putDados,
    putNota,
    putNotaAdm,
    delEst,
    findEst
}