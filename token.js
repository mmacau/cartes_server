const jwt = require("jwt-simple");
//importem moment 
const moment = require("moment");
module.exports = {
createToken(user) {
    let payload = {
        userId: user.ID,
        userEmail: user.email,
        createdAt: moment().unix(),
        expiresAt: moment().add(60,'m').unix()
    }
    console.log(payload);
    return jwt.encode(payload, process.env.TOKEN_KEY);
},
checkToken(req, res, next){
   let token = req.headers['user_token'];
   
    //mirem si hi ha el token enviat per headers
    if(!token){
         return res.send("error: 'no tens token");
    }else{
        //hi ha token posem el payload
        let payload = null
        try {
            //comprovem que el token coincideix
            payload = jwt.decode(token, process.env.TOKEN_KEY)
            
        } catch(err){
            return res.json({error: 'No tens Token'});
        } //comprovem que el token es vigent
            if(moment().unix() > payload.expiresAt){
                return res.json({error: 'Expired token'});
             }else{
                 next();
                return true;
        }
    }
    
}
}
