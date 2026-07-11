import { MongoClient } from "mongodb";

const uri = process.env.MONGO_DB_URI!;
const options = {};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (!uri) {
  throw new Error("Please add your MONGODB_URI to .env.local");
}

if (process.env.NODE_ENV === "development") {
  // 'any' ছাড়া গ্লোবাল অবজেক্টকে টাইপ কাস্টিং করার একদম স্ট্যান্ডার্ড নিয়ম
  const globalRef = globalThis as typeof globalThis & {
    _mongoClientPromise?: Promise<MongoClient>;
  };

  if (!globalRef._mongoClientPromise) {
    client = new MongoClient(uri, options);
    globalRef._mongoClientPromise = client.connect();
  }
  clientPromise = globalRef._mongoClientPromise;
} else {
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;
