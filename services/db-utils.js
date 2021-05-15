import { MongoClient } from "mongodb";

export async function connectDatabase() {
  const client = await MongoClient.connect(
    "mongodb+srv://kishan:kishan@cluster0.dtty4.mongodb.net/events?retryWrites=true&w=majority"
  );
  return client;
}

export async function insertDocument(client, collection, document) {
  const db = client.db();
  const result = await db.collection(collection).insertOne(document);
  return result;
}

export async function signUpEmail(client, document) {
  let status;
  const db = client.db();
  const user = await db.collection("emails").findOne(document);

  if (user) {
    status = 400;
  } else {
    await db.collection("emails").insertOne(document);
    status = 201;
  }
  return status;
}

export async function getAllDocuments(client, collection, sort, eventId) {
  const db = client.db();

  const documents = await db
    .collection(collection)
    .find({ eventId: eventId })
    .sort(sort)
    .toArray();

  return documents;
}
