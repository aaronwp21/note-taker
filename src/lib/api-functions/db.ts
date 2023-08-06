import mongoose from "mongoose";

const { DB_URL = "mongodb://127.0.0.1:27017/noteTaker" } = process.env;

main().catch((err) => console.error(err));

console.log(DB_URL)

async function main() {
  try {
    await mongoose.connect(DB_URL);
    console.log('DB Connected')
  } catch (err) {
    console.error(err);
  }
}