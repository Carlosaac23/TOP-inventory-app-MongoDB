import { client } from './client.js';

const database = client.db('Inventory');

export async function addTrain(train) {
  await database.collection('trains').insertOne(train);
}

export async function addBrand(brand) {
  await database.collection('brands').insertOne(brand);
}

export async function getAllBrands() {
  return database.collection('brands').find({}).toArray();
}
