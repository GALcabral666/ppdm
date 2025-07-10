const express = require("express")
const app = express()
const porta = 8080

app.set("view engine", "ejs")
app.get("/",(req,res)=>{
    res.render("index")
})

app.get("/resultado", (req,res)=>{
   
let opera = req.query.operacao
let num1 = Number(req.query.num1)
let num2 = Number(req.query.num2)
 if(opera=="+"){
    total = num1 + num2
 }
 else if(opera=="-"){
    total = num1 - num2
 }
 else if (opera=="*"){
    total = num1 * num2
 }
 else if (opera=="/"){
    total = num1 / num2
 }
 res.render("resultado", {total})
})

app.listen(porta)
