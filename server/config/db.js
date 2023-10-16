const mongoose = require("mongoose");
const { MONGO_URL, PORT } = process.env;

const connectDB = async () => {
try{
const conn = await mongoose.connect(MONGO_URL);
console.log(`MongoDB is  connected successfully on ${ conn.connection.host} `);
}
catch(error){
    console.error((err) => console.error(`Error ${error.message}`));
    process.exit(1);
}
  
}


module.exports = {connectDB}