let express = require("express")
let bodyParser = require("body-parser")

let app = express()

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    next();
  //rest of your app.get/post/whatevers
})


let PORT = 3000

let estRoutes = require("./routers/est.js")
let perRoutes = require("./routers/pessoa.js")

app.use(bodyParser.json())

app.use("/", estRoutes)
app.use("/", perRoutes)

app.listen(PORT, function() {
    console.log("Running app on port " + PORT)
})