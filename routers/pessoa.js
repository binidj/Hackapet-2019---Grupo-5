let express = require("express")
let router = express.Router()
let pessoaModel = require("../models/pessoa")

router.get("/prs", function (req, res) {
    let ageFilter = req.query.idade
    try {
        if (ageFilter) {
            res.send(pessoaModel.getPersByAge(ageFilter)) 
        } else res.send(pessoaModel.getAllPers())
    } catch (err) {
        res.status(500).send({message: "server error"})
    }
    
})

router.get("/prs/:prsId", async function (req, res) {
    let id = req.params.perId
    try {
        let resultPer = await pessoaModel.getPersById(id)

        if (resultPer) {
            res.send(resultPer)
        } else res.status(404).send({message: "Pessoa não encontrada"})
    } catch (err) {
        res.status(500).send({message: "server error"})
    }
})

router.post("/prs", async function (req, res) {
    let body = req.body
    try {
        if (body.nome && body.cpf && body.email && body.idade) {
            let newPer = await pessoaModel.createPer(body)
            res.send(newPer)
        }  else res.status(400).send({message: "Pessoa invalida"})
    } catch (err) {
        res.status(500).send({message: "server error"})
    }
})

router.put("/prs/:prsId", async function (req, res) {
    let id = req.params.perId
    try {
        let resultPer = await pessoaModel.getPersById(id)

        if (resultPer) {
            res.send(resultPer)
        } else res.status(404).send({message: "Pessoa não encontrada"})
    } catch (err) {
        res.status(500).send({message: "server error"})
    }
})

router.delete("/prs/:prsId", async function (req, res) {
    try {
        let id = req.params.perId
        let deletePer = await pessoaModel.deletePer(id)
        if (deletePer) {
            res.send(deletePer)
        } else res.status(404).send({message: "Pessoa não encontrada"})
    } catch (err) {
        res.status(500).send({message: "server error"})
    }
})

module.exports = router;