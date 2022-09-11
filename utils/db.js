import mongoose from "mongoose";

// Initialize an empty connection object
const connection = {};

async function connect() {
  if (connection.isConnected) {
    console.log("Server already connected");
    return;
  }

  // if mongoose has connections in connections queue
  if (mongoose.connections.length > 0) {
    connection.isConnected = mongoose.connections[0].readyState; // grab the first connection
    if (connection.isConnected === 1) {
      // already connected to database
      console.log("Use previous connection");
      return;
    }
    await mongoose.disconnect(); // not in connected mode
  }

  // otherwise, connect to database
  const db = await mongoose.connect(process.env.MONGO_URI);
  console.log("New connection");
  connection.isConnected = db.connections[0].readyState;
}

async function disconnect() {
  if (connection.isConnected) {
    // Only disconnect in production mode, not development
    // So we don't consume too much resources
    if (process.env.NODE_ENV === "production") {
      await mongoose.disconnect();
      connect.isConnected = false;
    } else {
      console.log("Not disconnected");
    }
  }
}

const db = { connect, disconnect };

export default db;
