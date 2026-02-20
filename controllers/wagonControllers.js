import { ObjectId } from 'mongodb';

import {
  getAllItems,
  getCategoriesByType,
  getBrandsAndScales,
  addItem,
  getItemById,
  updateItemById,
  deleteItemById,
} from '../db/queries.js';

export async function getAllWagonsController(req, res) {
  try {
    const { category, scale, brand } = req.query;

    const wagons = await getAllItems('wagons', { category, scale, brand });
    const categories = await getCategoriesByType('wagon');
    const { brands, scales } = await getBrandsAndScales();

    res.render('pages/items-collection', {
      itemNamePlural: 'Wagons',
      itemNameSingular: 'Wagon',
      path: 'wagons',
      items: wagons,
      categories,
      scales,
      brands,
      filters: { category, scale, brand },
    });
  } catch (error) {
    console.error('Controller error:', error);
    res.status(500).render('error', {
      message: 'Unable to load wagons',
      error: process.env.NODE_ENV === 'development' ? error : {},
    });
  }
}

export async function getWagonByIdController(req, res) {
  try {
    const { wagonID } = req.params;
    const wagon = await getItemById('wagons', wagonID);

    if (!wagon) {
      return res.status(404).render('error', {
        message: 'Wagon not found',
        error: { details: `No wagon found with ID ${wagonID}` },
      });
    }

    const categories = await getCategoriesByType('wagon');
    const { brands, scales } = await getBrandsAndScales();

    res.render('pages/item-info', {
      itemNamePlural: 'Wagons',
      itemNameSingular: 'Wagon',
      path: 'wagons',
      item: wagon,
      categories,
      scales,
      brands,
    });
  } catch (error) {
    console.error('Controller error:', error);
    res.status(500).render('error', {
      message: 'Unable to load wagon',
      error: process.env.NODE_ENV === 'development' ? error : {},
    });
  }
}

export async function getAddFormController(req, res) {
  try {
    const categories = await getCategoriesByType('wagon');
    const { brands, scales } = await getBrandsAndScales();

    res.render('forms/addForm', {
      title: 'Wagon',
      path: 'wagons',
      categories,
      scales,
      brands,
    });
  } catch (error) {
    console.error('Controller error:', error);
    res.status(500).render('error', {
      message: 'Error loading add form',
      error: process.env.NODE_ENV === 'development' ? error : {},
    });
  }
}

export async function postAddFormController(req, res) {
  try {
    const {
      model,
      model_id,
      description,
      category_id,
      scale_id,
      brand_id,
      price,
      stock_quantity,
      image_url,
    } = req.body;

    await addItem('wagons', {
      model,
      model_id: Number(model_id),
      description,
      category_id: new ObjectId(category_id),
      scale_id: new ObjectId(scale_id),
      brand_id: new ObjectId(brand_id),
      price: Number(price),
      stock_quantity: Number(stock_quantity),
      image_url,
    });

    return res.redirect('/wagons');
  } catch (error) {
    console.error('Controller error:', error);
    res.status(500).render('error', {
      message: 'Error adding wagon',
      error: process.env.NODE_ENV === 'development' ? error : {},
    });
  }
}

export async function getUpdateFormController(req, res) {
  try {
    const { wagonID } = req.params;
    const wagon = await getItemById('wagons', wagonID);

    if (!wagon) {
      return res.status(404).render('error', {
        message: 'Wagon not found',
        error: { details: `Cannot update - wagon ${wagonID} does not exist` },
      });
    }

    const categories = await getCategoriesByType('wagon');
    const { brands, scales } = await getBrandsAndScales();

    res.render('forms/updateForm', {
      title: 'Wagon',
      item: wagon,
      path: 'wagons',
      categories,
      scales,
      brands,
    });
  } catch (error) {
    console.error('Controller error:', error);
    res.status(500).render('error', {
      message: 'Error loading update form',
      error: process.env.NODE_ENV === 'development' ? error : {},
    });
  }
}

export async function putUpdateFormController(req, res) {
  try {
    const { wagonID } = req.params;
    const {
      model,
      model_id,
      description,
      category_id,
      scale_id,
      brand_id,
      price,
      stock_quantity,
      image_url,
    } = req.body;

    const updatedWagon = await updateItemById('wagons', wagonID, {
      model,
      model_id: Number(model_id),
      description,
      category_id: new ObjectId(category_id),
      scale_id: new ObjectId(scale_id),
      brand_id: new ObjectId(brand_id),
      price: Number(price),
      stock_quantity: Number(stock_quantity),
      image_url,
    });

    if (!updatedWagon) {
      return res.status(404).render('error', {
        message: 'Wagon not found',
        error: { details: `Cannot update - wagon ${wagonID} does no exist` },
      });
    }

    return res.redirect(`/wagons/${wagonID}`);
  } catch (error) {
    console.error('Controller error:', error);
    res.status(500).render('error', {
      message: 'Error updating wagon',
      error: process.env.NODE_ENV === 'development' ? error : {},
    });
  }
}

export async function deleteWagonController(req, res) {
  try {
    const { wagonID } = req.params;
    await deleteItemById('wagons', wagonID);

    return res.redirect('/wagons');
  } catch (error) {
    console.error('Controller error:', error);
    res.status(500).render('error', {
      message: 'Error deleting wagon',
      error: process.env.NODE_ENV === 'development' ? error : {},
    });
  }
}
