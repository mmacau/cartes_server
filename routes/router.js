// importem express i el router express
var express = require('express');
var router = require ('express').Router();
// importem el model usuaris
const userModel = require("../models/userModel");
//importem el modul bcrytp
const bcrypt = require("bcrypt");
//importem el token jwt
const jwt = require("jwt-simple");
//importem moment 
const moment = require("moment");
// importem el create token
const token = require('../token');
const { checkToken } = require('../token');
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
.get('/user/:id', async (req, res, next)=>{
    const id = req.params.id;
    console.log(id);
    await userModel.getById(id)
    .then(usuari => {
        if(usuari){
            //console.log(usuari[0].password);
            res.json({usuari});
        }else{
            res.status(500).send("No hi ha cap usuari/a amb aquest ID")
        }
    })
            
    .catch(err => {
                return res.status(500).send('Usuari Inexistent');
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
.post('/update', async (req, res, next)=> {
    const nom = req.body.nom;
    const email = req.body.email;
    const password = req.body.password;
    const id =  req.body.id;
    var role = req.body.role;
    if(!nom || !email || !password){
        res.status(500).send("faltaen paramentres");
    }
    userModel.updateUser(id, nom, email, password, role)
    .then(user =>{
        console.log(id+ "actualitzat");
        res.send("Usuari Actualitzat");
    })
    .catch(err => {
        return res.status(500).send("Error al actualitar Usuari");
    } )   
})   
.get('/eliminar/:id', (req, res, next)=> {
    const id = req.params.id;
    userModel.deleteUser(id)
    .then(user => {
        res.json("Usuari Eliminat")
    })
    .catch(err => {
        return res.status(500).send('no sha pogut eliminar');
    })
})
.get('/login', async (req,res, next)=>{
    const email = req.body.email;
    const password = req.body.password;
    const user = await userModel.getByEmail(email)
    if(user === undefined){
        res.json({error: 'user not exists'});
    }else{
        //comparem passwords retorna true/fals
        const equals = bcrypt.compareSync(password, user[0].password);
        if(!equals){
            res.json({error: 'password incorrecte'});
        }else{
            res.json({
                done: 'login ok',
                token: token.createToken(user[0])
                    })        
        }
    }
    
})
.get('/main', (req,res)=>{
    token.checkToken(req, res);
})




module.exports = router