import mongoose from "mongoose";

const mongoURL: string = process.env.MONGODB_URI || "";

type connectionObject = {
  isConnected?: number;
}

const connection: connectionObject = {}

const connectDB = async (): Promise<void> => {
  if(connection.isConnected) {
    console.log("Already connected to database");
    return;
  }
  try {
    const db = await mongoose.connect(mongoURL, {});
    connection.isConnected = db.connections[0].readyState
    console.log("Database connected :: ", db.connection.host, db.connection.port, db.connection.name);
  } catch (error: any) {
    console.error("Database connection error :: ", error);
    throw new Error(`Error connecting to database`);
  }
};

export default connectDB;