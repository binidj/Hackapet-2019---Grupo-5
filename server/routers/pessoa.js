let express = require("express")
let router = express.Router()
let pessoaModel = require("../models/pessoa")

router.get("/users", function (req, res) {
    let ageFilter = req.query.idade
    try {
        if (ageFilter) {
            res.send(pessoaModel.getPersByAge(ageFilter)) 
        } else res.send(pessoaModel.getAllPers())
    } catch (err) {
        res.status(500).send({message: "server error"})
    }  
})

router.get("/users/:usersId", async function (req, res) {
    let id = req.params.usersId
    try {
        let resultPer = await pessoaModel.getPersById(id)

        if (resultPer) {
            res.send(resultPer)
        } else res.status(404).send({message: "Pessoa não encontrada"})
    } catch (err) {
        res.status(500).send({message: "server error"})
    }
})

router.post("/users", async function (req, res) {
    let body = req.body
    try {
        if (body.nome && body.cpf && body.email && body.idade && body.password) {
            if (pessoaModel.getPersByCpf(body.cpf) == null && pessoaModel.getPersByEmail(body.email) == null) {
                let newPer = await pessoaModel.createPer(body)
                res.send(newPer)
            } else res.status(403).send({message: "Pessoa já cadastrada"})
        }  else res.status(400).send({message: "Pessoa invalida"})
    } catch (err) {
        res.status(500).send({message: "server error"})
    }
})

router.put("/users/:usersId/changePassword", async function (req, res) {
    let id = req.params.usersId
    let newPass = req.body.newPass
    try {
        let resultPer = await pessoaModel.changePass(id, newPass)

        if (resultPer) {
            res.send(resultPer)
        } else res.status(404).send({message: "Pessoa não encontrada"})
    } catch (err) {
        res.status(500).send({message: "server error"})
    }
})

router.put("/users/:usersId/changeName", async function (req, res) {
    let id = req.params.usersId
    let newName = req.body.newName
    try {
        let resultPer = await pessoaModel.changeName(id, newName)

        if (resultPer) {
            res.send(resultPer)
        } else res.status(404).send({message: "Pessoa não encontrada"})
    } catch (err) {
        res.status(500).send({message: "server error"})
    }
})

router.post("/login", async function (req, res) {
    let body = req.body
    try {
        let resultPer = await pessoaModel.getPersByEmail(body.email)
        if (resultPer) {
            let check = pessoaModel.login(body.password, resultPer.salt, resultPer.hash, resultPer)
            if (check) {
                res.send(resultPer)
            } else return res.status(403).send({message: "Usuário ou senha incorretos"})
        } else res.status(404).send({message: "Pessoa não encontrada"})
    } catch (err) {
        console.log(err)
        res.status(500).send({message: "server error"})
    }
})

router.delete("/login/:usersId", async function (req, res) {
    try {
        let id = req.params.usersId
        let deletePer = await pessoaModel.logout(id)
        if (deletePer) {
            res.send(deletePer)
        } else res.status(404).send({message: "Pessoa não encontrada"})
    } catch (err) {
        res.status(500).send({message: "server error"})
    }
})

router.delete("/users/:usersId", async function (req, res) {
    try {
        let id = req.params.usersId
        let deletePer = await pessoaModel.deletePer(id)
        if (deletePer) {
            res.send(deletePer)
        } else res.status(404).send({message: "Pessoa não encontrada"})
    } catch (err) {
        res.status(500).send({message: "server error"})
    }
})

module.exports = router;