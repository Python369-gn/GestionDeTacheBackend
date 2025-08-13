require('dotenv').config();
console.log("🔍 PORT =", process.env.PORT);
console.log("🔍 MONGO_URI =", process.env.MONGO_URI);

const connectDB = require('./src/config/db');
const app = require('./app');

const PORT = process.env.PORT || 3000 ;

//Connextion a MONGODB et run le server 

(async()=>{
    try{
        await connectDB(process.env.MONGO_URI);
        app.listen(PORT, ()=>{
            console.log( `le server run  sur le http://localhost:${PORT }`)
        })
    }

    catch (err){
        console.log("erreur de connexion " , err.message )
        process.exit(1);
    }
})();