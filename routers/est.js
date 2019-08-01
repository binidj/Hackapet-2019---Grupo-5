let express = require("express")
let router = express.Router()
let estModel = require('../models/estabelecimento.js')

router .get("/est", function(req,res) {
    let ests = estModel.getAllEst()
    res.send(ests)
})

router .post("/est", function(req,res) {
    let data = req.body
    if (data.loja && data.endereco.rua && data.endereco.cidade && data.email && data.tipo && data.cnpj) {
        let newEst = estModel.createEst(data)
        res.send(newEst)
    } else {
        res.status(400).send({message: "Dados Invalidos ou nao preenchidos no cadastro"})
    }
})

router .delete("/est", function(req,res) {
    let cnpj = req.body.cnpj
    let deleteEst = estModel.delEst(cnpj)
    if (deleteEst) {
        res.send("Estabelecimento deletado")
    } else {
        res.send("Estabelecimento nao encontrado")
    }
})

module.exports = router;