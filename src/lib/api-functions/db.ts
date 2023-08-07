import mongoose from "mongoose";

const { NEXT_PUBLIC_DB_URL = "mongodb://127.0.0.1:27017/noteTaker" } = process.env;

main().catch((err) => console.error(err));

async function main() {
  try {
    await mongoose.connect(NEXT_PUBLIC_DB_URL);
  } catch (err) {
    console.error(err);
  }
}