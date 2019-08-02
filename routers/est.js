let express = require("express")
let router = express.Router()
let estModel = require('../models/estabelecimento.js')

router .post("/est", function(req,res) {
    let data = req.body
    if (data.loja && data.endereco.rua && data.endereco.cidade && data.email && data.tipo && data.cnpj) {
        let again = estModel.findEst(data.cnpj)
        if (!again) {
            let newEst = estModel.createEst(data)
            res.send({message:"Estabelecimento cadastrado"})
            res.send(newEst)
        } else {
            res.status(403).send({message: "Estabelecimento ja cadastrado"})
        }
    } else {
        res.status(400).send({message: "Dados Invalidos ou nao preenchidos no cadastro"})
    }
})

router .get("/est", function(req,res) {
    let option = req.query.option
    let note = req.query.note
    if (option == 'visao' || option == 'audicao' || option == 'idoso' || option == 'cadeirante') {
        ests = estModel.getTypeEst(option)
        if (note >= 0) {
            ests = estModel.getEstNoteEquals(note)
        }
    } else {
        ests = estModel.getAllEst()
        if (note >= 0) {
            ests = estModel.getEstNoteEquals(note)
        }
    }
    res.send(ests)
})

router .get("/est/:estCNPJ", function(req,res)  {
    let cnpj = req.params.estCNPJ
    let foundEst = estModel.getEst(cnpj)
    if (foundEst.length != 0) {
        res.send(foundEst)
    } else {
        res.status(404).send({message: "Estabelecimento nao cadastrado"})
    }
})

router .put("/est/:estCNPJ/nota",function(req,res) {
    let cnpj = req.params.estCNPJ
    let nota = req.body.nota
    let foundLoja = estModel.putNota(nota,cnpj)
    if (foundLoja) {
        res.send(foundLoja)
    } else {
        res.status(404).send({message: "Estabelecimento nao cadastrado"})
    }
})

router .put("/est/:estCNPJ/notaADM",function(req,res) {
    let cnpj = req.params.estCNPJ
    let nota = req.body.nota
    let foundLoja = estModel.putNotaAdm(nota,cnpj)
    if (foundLoja.length != 0) {
        res.send(foundLoja)
    } else {
        res.status(404).send({message: "Estabelecimento nao cadastrado"})
    }
})

router .put("/est/:estCNPJ", function(req,res) {
    let cnpj = req.params.estCNPJ
    let infoEst = req.body
    if (infoEst.loja || infoEst.endereco.rua || infoEst.endereco.cidade) {
        let foundLoja = estModel.putDados(infoEst,cnpj)
        if (foundLoja.length != 0) {
            res.send(foundLoja)
        } else {
            res.status(404).send({message: "Estabelecimento nao cadastrado"})
        }
    } else {
        res.status(400).send({message: "Dados Invalidos ou nao preenchidos no cadastro"})
    }
})

router .delete("/est/:estCNPJ", function(req,res) {
    let cnpj = req.params.estCNPJ
    let deleteEst = estModel.delEst(cnpj)
    if (deleteEst.length != 0) {
        res.send("Estabelecimento deletado")
    } else {
        res.status(404).send({message: "Estabelecimento nao cadastrado"})
    }
})

module.exports = router;