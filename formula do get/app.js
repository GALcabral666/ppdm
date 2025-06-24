const express = require("express")
const app = express()
const porta = 8080


app.set("view.engine", "ejs")

app.get("/", (req, res) => {
    req.prependListener("conta")
})

app.get("/resultado", (req, res) => {
    let nmr = Number(req.query.numero)
    let total = nmr**2
    res.render('resultado', {total})
})

app.listen(porta, () =>{
    console.log(`servidor aberto na agina https://localhost:${posta}`)
})