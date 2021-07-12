// importem express i el router express
var express = require('express');
var router = require ('express').Router();
// importem el model usuaris
const userModel = require("../models/userModel");
//importem el modul bcrytp
const bcrypt = require("bcrypt");
//importem el token jwt
const jwt = require("jwt-simple");

//Home
router .get('/', (req,res) =>{
    res.json({prova: "construint el server"});
} )
.get('/users', async (req,res, next)=>{
          await userModel.getAllUsers()
        .then(usuaris => res.json({usuaris}))
        .catch(err => {
             return res.status(500).send("Error amb la Base de Dades");

        })
    })
.post('/registrar',  async (req,res,next)=>{
        const nom = req.body.nom;
        const email = req.body.email;
        const password = req.body.password;
        const role = "user";
       if(!nom || !email || !password){
            res.sendStatus(500);
        }else{ 
            const password = bcrypt.hashSync(req.body.password, 10);
            
           await userModel.newUser(nom, email, password, role)
           .then(userId => {
               res.status(200).send("Usuari Creat");
               
               
           })
           .catch(err => {
               return res.status(500).send(err);
           })
         } 
        
})    
   
    




module.exports = router