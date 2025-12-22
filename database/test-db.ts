

import dotenv from "dotenv";

// explicitly load .env.local
dotenv.config({ path: ".env.local" });
import { connectToDatabase } from "./mongoose.ts";

const testDatabaseConnection = async () => {
  try {
    await connectToDatabase();
    console.log("Database test successful!");
    process.exit(0);
  } catch (error) {
    console.error("Database test failed:", error);
    process.exit(1);
  }
};

testDatabaseConnection();

