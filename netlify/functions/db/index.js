import 'dotenv/config'
import { MongoClient, ServerApiVersion } from 'mongodb';

// Connection URI
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.v8usw.mongodb.net/?retryWrites=true&w=majority`;

let cachedDb = null;

async function connectToDatabase() {
  // Create a MongoClient with a MongoClientOptions object to set the Stable API version
  const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });

  if (cachedDb) {
    return cachedDb;
  }

  await client.connect();
  const db = client.db(process.env.DB_NAME);
  cachedDb = db;
  return db
}

export const handler = async function (event = {}, context = {}) {

  const db = await connectToDatabase();

  const groupUnits = event.body
    ? JSON.parse(event.body)
    : [];

  groupUnits.items.forEach((item, i) => {
    if (item.price) {
      groupUnits.items[i].price = Number(item.price.replace(/[^0-9.-]+/g, ""));
    }
    groupUnits.items[i].total = Number(item.total.replace(/[^0-9.-]+/g, ""));
  });

  const collectionUnits = db.collection(process.env.COLLECTION_UNITS);
  const collectionGroup = db.collection(process.env.COLLECTION_GROUP);

  const cu = await collectionUnits.insertMany(groupUnits.items);
  const cg = await collectionGroup.insertOne({
    "id": "b871487c-71ab-4f02-b284-274444cfde4d",
    "products_ids": groupUnits.items.map((pr) => pr.ids ? pr.ids : pr.id),
    "date": new Date(),
    "state": "Guanajuato",
    "county": "Guanajuato",
    "user_id": "4moe",
  });

  console.log(cu, cg);

  console.log(event.multiValueHeaders)

  return {
    headers: {
      "Access-Control-Allow-Origin": "*",
      // "Content-Type": "application/pdf",
    },
    statusCode: 200,
    body: JSON.stringify({ message: "Noice" })
  };
}