import mongoose from "mongoose";
import express from "express";

import { DB_NAME } from "../constants.js";

const connectDb = async () => {
  try {
    const connettionInstance = await mongoose.connect(
      `${process.env.MONGODB_URL}/${DB_NAME}`
    )
    console.log(`\n mongodb connected || db host ${connettionInstance.connection.host}`);
  } catch (error) {
    console.log("mongodb connection error");
    process.exit(1);
  }
};

export default connectDb