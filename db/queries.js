import { ObjectId } from 'mongodb';

import { client } from './client.js';

const database = client.db('Inventory');

export async function getAllItems(collection, { category, scale, brand }) {
  const filter = {};

  if (category) {
    filter.category_id = new ObjectId(category);
  }
  if (scale) {
    filter.scale_id = new ObjectId(scale);
  }
  if (brand) {
    filter.brand_id = new ObjectId(brand);
  }

  return await database.collection(collection).find(filter).toArray();
}

export async function getItemById(collection, id) {
  return await database
    .collection(collection)
    .findOne({ _id: new ObjectId(id) });
}

export async function getCategoriesByType(item) {
  return await database.collection(`${item}_categories`).find({}).toArray();
}

export async function getAllScales() {
  return await database.collection('scales').find({}).toArray();
}

export async function getAllBrands() {
  return await database.collection('brands').find({}).toArray();
}
