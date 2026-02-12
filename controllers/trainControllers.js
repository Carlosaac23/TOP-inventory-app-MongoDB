import {
  getAllItems,
  getItemById,
  getCategoriesByType,
  getAllScales,
  getAllBrands,
} from '../db/queries.js';

export async function getAllTrainsController(req, res) {
  const { category, scale, brand } = req.query;

  const trains = await getAllItems('trains', { category, scale, brand });
  const categories = await getCategoriesByType('train');
  const scales = await getAllScales();
  const brands = await getAllBrands();

  res.render('pages/items-collection', {
    itemNamePlural: 'Trains',
    itemNameSingular: 'Train',
    path: 'trains',
    items: trains,
    categories,
    scales,
    brands,
    filters: { category, scale, brand },
  });
}

export async function getTrainByIdController(req, res) {
  const { trainID } = req.params;
  const train = await getItemById('trains', trainID);

  const categories = await getCategoriesByType('train');
  const scales = await getAllScales();
  const brands = await getAllBrands();

  res.render('pages/item-info', {
    itemNamePlural: 'Trains',
    itemNameSingular: 'Train',
    path: 'trains',
    item: train,
    categories,
    scales,
    brands,
  });
}
