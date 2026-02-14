import { ObjectId } from 'mongodb';

import { client } from './client.js';
import { validateCategoryType, validateCollectionName } from './safeQuery.js';

const database = client.db('Inventory');

export async function getAllItems(collection, { category, scale, brand }) {
  validateCollectionName(collection);
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
  validateCollectionName(collection);

  return await database
    .collection(collection)
    .findOne({ _id: new ObjectId(id) });
}

export async function getCategoriesByType(item) {
  validateCategoryType(item);

  return await database.collection(`${item}_categories`).find({}).toArray();
}

export async function getBrandsAndScales() {
  const [scales, brands] = await Promise.all([
    database.collection('scales').find({}).toArray(),
    database.collection('brands').find({}).toArray(),
  ]);
  return { scales, brands };
}

export async function addItem(collection, itemData) {
  validateCollectionName(collection);

  await database.collection(collection).insertOne(itemData);
}

export async function addBrand(brandData) {
  await database.collection('brands').insertOne(brandData);
}

export async function addScale(scaleData) {
  await database.collection('scales').insertOne(scaleData);
}

export async function deleteItemById(collection, itemID) {
  validateCollectionName(collection);

  await database
    .collection(collection)
    .deleteOne({ _id: new ObjectId(itemID) });
}

export async function updateItemById(collection, itemID, updates) {
  validateCollectionName(collection);

  return await database
    .collection(collection)
    .updateOne({ _id: new ObjectId(itemID) }, { $set: updates });
}
