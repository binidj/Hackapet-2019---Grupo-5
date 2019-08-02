let express = require("express")
let bodyParser = require("body-parser")

let app = express()
let PORT = 3000

let estRoutes = require("./routers/est.js")
let perRoutes = require("./routers/pessoa.js")

app.use(bodyParser.json())

app.use("/", estRoutes)
app.use("/", perRoutes)

app.listen(PORT, function() {
    console.log("Running app on port " + PORT)
})