// import mongoose from "mongoose";

// // Connection state tracker
// let isConnected = false;

// export async function connect() {
//   // Check if the connection is already established
//   if (isConnected) {
//     console.log("Already connected to MongoDB.");
//     return;
//   }

//   // Ensure that the MONGO_URI is set in the environment variables
//   const mongoUri = process.env.MONGO_URI;
//   if (!mongoUri) {
//     console.error("MongoDB URI is not defined in the environment variables.");
//     process.exit(1);
//   }
//   console.log(mongoUri,' mongoUri')

//   try {
//     // Establish a new MongoDB connection
//     const db = await mongoose.connect(mongoUri, {
//       serverApi:
//       {
//         version: '1',
//         strict: true,
//         deprecationErrors: true
//       }
//     });

//     // Set the connection state
//     isConnected = db.connections[0].readyState === 1;

//     // Log connection success
//     if (isConnected) {
//       console.log("MongoDB is connected");
//     }

//     // Handle connection error events
//     db.connection.on("error", (error) => {
//       console.error("MongoDB connection error:", error);
//       process.exit(1); // Exit process on error
//     });

//   } catch (error) {
//     console.error("Error connecting to MongoDB:", error);
//     // process.exit(1); // Exit process if connection fails
//   }
// }



import mongoose from 'mongoose'

const MONGODB_URI = process.env.MONGO_URI

if (!MONGODB_URI) {
    throw new Error(
        'Please define the MONGODB_URI environment variable inside .env.local',
    )
}

let cached = global.mongoose

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null }
}

export async function connect() {
    if (cached.conn) {
        return cached.conn
    }
    if (!cached.promise) {
        const opts = {
            bufferCommands: false,
        }
        cached.promise = mongoose.connect(MONGODB_URI, opts).then(mongoose => {
            console.log('Db connected')
            return mongoose
        })
    }
    try {
        cached.conn = await cached.promise
    } catch (e) {
        cached.promise = null
        throw e
    }

    return cached.conn
}