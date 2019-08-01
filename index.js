let express = require('express')
let app = express()
let bodyParser = require('body-parser')
let currentId = 1
app.use(bodyParser.json())


app.get("/hello",function(request,response) {
    response.send("Hello word")
});

let dvds = [
    {
        title : "Senhor dos aneis",
        year : 2000,
        id : currentId,
        rent : {
            status : false,
            renter : ""
        }
    }
]


/*app.get("/dvds",function(request,response) {
    let year = request.query.year
    let status = request.query.status
    let filteredDvds = dvds
    if (year) {
        response.send(
            dvds.filter(function(dvd) {
                return dvd.year == year
            })
        )
    } else {
        response.send(dvds)
    }

})*/

app.get("/dvds",function(req,res) {
    let alugado = req.query.rent
    if (alugado == "rented") {
        res.send(
            dvds.filter(function(dvd) {
                return dvd.rent.status == true;
            })
        )
    } else {
        res.send(dvds)
    }
})

app.get("/dvds/:dvdId",function(req,res) {
    let id = req.params.dvdId
    let foundDvd = dvds.find(function(dvd) {
        return dvd.id == id
    })
    if (foundDvd) {
        res.send(foundDvd)
    } else {
        res.status(404).send( { message: "Dvd nao Encontrado"})
    }
})

app.put("/dvds/:dvdId",function(req,res) {
    let id = req.params.dvdId
    let data = req.body
    let foundDvd = dvds.find(function(dvd) {
        return dvd.id == id
    })
    if (foundDvd) {
        foundDvd.title = data.title
        foundDvd.year = data.year
        res.send(foundDvd)
    } else {
        res.status(404).send ( {message : "Dvd nao encontrado"})
    }
})

app.post("/dvds", function(req,res) {
    let data = req.body
    if (data.title && data.year) {
        currentId += 1
        dvds.push(
            {
            title : data.title,
            year : data.year,
            id: currentId,
            rent : {
                status: false,
                renter: ""
            }
        })
        res.send(data)
    } else {
        res.status(400).send( {message : "Dvd Invalido"})
    }
})

app.delete("/dvds/",function(req,res) {
    let id = req.body.id
    let foundDvdINdex = dvds.findIndex(function(dvd) {
        return dvd.id == id
    })
    if (foundDvdINdex != -1) {
        dvds.splice(foundDvdINdex, 1)
        currentId -= 1
        res.send("Deletado")
    } else {
        res.status(404).send({ message : "Dvd nao encontrado"})
    }

})

app.put("/dvds/:dvdId/rent", function(req,res){
    let id = req.params.dvdId
    let userName = req.body.userName
    let foundDvd = dvds.find(function(dvd) {
        return dvd.id == id
    })
    if (foundDvd.rent.status) {
        res.status(400).send({message: "Já alugado"})
    } else {
        foundDvd.rent.status = true
        foundDvd.rent.renter = userName
        res.send("Ok")
    }
})

app.listen(3000, function() {
    console.log("Hello")
})