import mongoose from "mongoose";

async function databaseConnection(){
  mongoose.connect(process.env.MONGO_CONNECTION_STRING);

  return mongoose.connection;
} 

export default databaseConnection;
