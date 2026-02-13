export function validateCollectionName(collection) {
  const allowedCollections = ['trains', 'wagons', 'tracks'];
  if (!allowedCollections.includes(collection)) {
    throw new Error(
      `Invalid collection name: ${collection}. Allowed collections: ${allowedCollections.join(', ')}`
    );
  }
}

export function validateCategoryType(type) {
  const allowedTypes = ['train', 'wagon', 'track'];
  if (!allowedTypes.includes(type)) {
    throw new Error(
      `Invalid category type: ${type}. Allowed types: ${allowedTypes.join(', ')}`
    );
  }
}
