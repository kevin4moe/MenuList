import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
import { pbkdf2Sync, randomBytes } from 'crypto';
import { connectToDatabase } from "../db";

export const handler = async function (event = {}, context = {}) {
  const db = await connectToDatabase();
  const collectionUsers = db.collection(process.env.COLLECTION_UNITS);

  const user = JSON.parse(event.body);
  console.log(user)
  user.email = user.email;
  const salt = randomBytes(16).toString('hex');

  const cg = await collectionUsers.insertOne({
    "id": uuidv4(),
    "errands_ids": [],
    "email": user.email,
    "password": pp(user.password, salt),
    "country": user.country,
    "state": user.state,
    "city": user.city,
    "salt": salt
  });

  console.log(cg);

  return {
    headers: {
      "Access-Control-Allow-Origin": "*",
      // "Content-Type": "application/pdf",
    },
    statusCode: 200,
    body: JSON.stringify({ message: "Noice" })
  };
}

function pp(key, salt) {
  return pbkdf2Sync(key, salt, 100000, 32, 'sha256').toString('hex');
}