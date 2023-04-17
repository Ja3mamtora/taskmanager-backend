const mongoose=require('mongoose');


const connectDB=(uri)=>{
    return mongoose.connect(uri).then(()=>{
        try{
            console.log("DB connected"); 
        }
        catch(error){
            console.log(error);
        }
        
    })
}



module.exports=connectDB
