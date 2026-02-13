import { MongoClient } from 'mongodb';

export const client = new MongoClient(process.env.MONGO_URI);

export default async function connectDB() {
  try {
    await client.connect();

    console.log(
      'Pinged your deployment. You successfully connected to MongoDB!'
    );
  } catch (error) {
    console.error(error);
  }
}
