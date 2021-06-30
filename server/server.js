const express=require('express');
const app=express();
const cors=require('cors');
const dotEnv=require('dotenv');
const mongoose=require('mongoose');
dotEnv.config({path:'./config/.env'});
app.use(cors());
app.use(express.json());
const port=process.env.PORT;
const hostName=process.env.HOST_NAME;
const mongoDbUrl=process.env.MONGO_DB_LOCAL_URL;
mongoose.connect(mongoDbUrl,{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then((response)=>{
    console.log('MongoDb Connected Succesfully.....');
}).catch((error)=>{
    console.error(error);
    process.exit(1);
});
app.use('/api',require('./router/productRouter'));
app.listen(port,hostName,() => {
   console.log(`Express Server Started At http://${hostName}:${port}`);
});
