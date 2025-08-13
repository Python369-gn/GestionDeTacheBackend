const mongoose = require('mongoose')

//connextion 

const connectDB = (async (uri)=>{
    try{
        await mongoose.connect(uri);

        console.log('MongoDB connecté')

    }
    catch(err){
        console.err('Erreur de connexion ' , err.message )
        process.exit(1);
    }
})

module.exports = connectDB ;