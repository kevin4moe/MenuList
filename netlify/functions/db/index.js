import 'dotenv/config'
import { MongoClient, ServerApiVersion } from 'mongodb';

// Connection URI
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.v8usw.mongodb.net/?retryWrites=true&w=majority`;
console.log(uri)
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run(next) {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    const db = client.db(process.env.DB_NAME);
    console.log("You successfully connected to DB!");

    await next(db);

  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

export const handler = async function (event = {}, context = {}) {

  const groupUnits = event.body
    ? JSON.parse(event.body)
    : [{
      id: "b871487c-71ab-4f02-b284-274444cfde4d",
      name: "a",
      category: "Alimentos",
      unit: "kg",
      quantity: 2,
      price: 25,
      total: 50,
    }];

  groupUnits.items.forEach((item, i) => {
    if (item.price) {
      groupUnits.items[i].price = Number(item.price.replace(/[^0-9.-]+/g, ""));
    }
    groupUnits.items[i].total = Number(item.total.replace(/[^0-9.-]+/g, ""));
  });


  run(async (db) => {
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

  }).catch(console.dir);

  console.log(event.body, event)

  return {
    headers: {
      "Access-Control-Allow-Origin": "*",
      // "Content-Type": "application/pdf",
    },
    statusCode: 200,
    // body: body64.split(",")[1],
    // isBase64Encoded: true,
  };
}