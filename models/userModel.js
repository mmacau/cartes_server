const { promise } = require("../dbConnection");
const connection = require("../dbConnection");
module.exports = {
    getAllUsers(){
        return new Promise((resolve, reject)=> {
            connection.query('SELECT * FROM `User`',(err, resultats)=>{
                if(err) reject(err);
                else resolve(resultats);
            }
            )
        })
    },
    newUser(nom, email, password, role){
        return new Promise((resolve, reject)=> {
            connection.query(`insert into User
            (nom, email, password, role)
            values (?,?,?,?)`,
            [nom, email, password, role], (err, resultats)=> {
                if(err) reject(err);
                else resolve(resultats.insertId);
            })
        })
    }
}