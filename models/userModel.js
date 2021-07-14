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
    },
    getById(id){
      return new Promise((resolve, reject)=> {
            connection.query('SELECT * FROM `User` WHERE id = ?',
            [id],
            (err, resultats)=> {
                console.log(resultats);
                if(err) reject(err);
                else resolve(resultats);
            }
             )
        })
    },
    getByEmail(email){
        return new Promise((resolve, reject)=> {
              connection.query('SELECT * FROM `User` WHERE email = ?',
              [email],
              (err, resultats)=> {
                  //console.log(resultats);
                  if(err) reject(err);
                  else resolve(resultats);
              }
               )
          })
      },
    updateUser(id, nom, email, password, role){
        return new Promise((resolve, reject)=> {
            connection.query(`update User set nom = ?, email = ?, password = ?, role = ? where ID = ?`,
            [nom, email, password, role, id],
            (err)=> {
                if (err) reject(err)
                else resolve();
            });
        
        }) 
    },
    deleteUser(id){
        return new Promise((resolve, reject)=>{
            connection.query(`delete from User where id = ?`, [id],
            (err)=> {
                if(err) reject(err);
                else resolve();
            })

        })
    }
}