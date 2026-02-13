import { ObjectId } from 'mongodb';

import {
  getAllItems,
  getItemById,
  getCategoriesByType,
  getAllScales,
  getAllBrands,
  addItem,
  updateItemById,
  deleteItemById,
} from '../db/queries.js';

export async function getAllTrainsController(req, res) {
  try {
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
  } catch (error) {
    console.error('Controller error:', error);
    res.status(500).render('error', {
      message: 'Unable to load trains',
      error: process.env.NODE_ENV === 'development' ? error : {},
    });
  }
}

export async function getTrainByIdController(req, res) {
  try {
    const { trainID } = req.params;
    const train = await getItemById('trains', trainID);

    if (!train) {
      return res.status(404).render('error', {
        message: 'Train not found',
        error: { details: `No train found with ID ${trainID}` },
      });
    }

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
  } catch (error) {
    console.error('Controller error:', error);
    res.status(500).render('error', {
      message: 'Unable to load train',
      error: process.env.NODE_ENV === 'development' ? error : {},
    });
  }
}

export async function getAddFormController(req, res) {
  try {
    const categories = await getCategoriesByType('train');
    const scales = await getAllScales();
    const brands = await getAllBrands();

    res.render('forms/addForm', {
      title: 'Train',
      path: 'trains',
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

    await addItem('trains', {
      model,
      model_id,
      description,
      category_id: new ObjectId(category_id),
      scale_id: new ObjectId(scale_id),
      brand_id: new ObjectId(brand_id),
      price: Number(price),
      stock_quantity: Number(stock_quantity),
      image_url,
    });

    return res.redirect('/trains');
  } catch (error) {
    console.error('Controller error:', error);
    res.status(500).render('error', {
      message: 'Error adding train',
      error: process.env.NODE_ENV === 'development' ? error : {},
    });
  }
}

export async function getUpdateFormController(req, res) {
  try {
    const { trainID } = req.params;
    const train = await getItemById('trains', trainID);

    if (!train) {
      return res.status(404).render('error', {
        message: 'Train not found',
        error: { details: `Cannot update - train ${trainID} does not exist` },
      });
    }

    const categories = await getCategoriesByType('train');
    const scales = await getAllScales();
    const brands = await getAllBrands();

    res.render('forms/updateForm', {
      title: 'Train',
      item: train,
      path: 'trains',
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
    const { trainID } = req.params;
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

    const updatedTrain = await updateItemById('trains', trainID, {
      model,
      model_id,
      description,
      category_id: new ObjectId(category_id),
      scale_id: new ObjectId(scale_id),
      brand_id: new ObjectId(brand_id),
      price: Number(price),
      stock_quantity: Number(stock_quantity),
      image_url,
    });

    if (!updatedTrain) {
      return res.status(404).render('error', {
        message: 'Train not found',
        error: { details: `Cannot update - train ${trainID} does not exist` },
      });
    }

    return res.redirect(`/trains/${trainID}`);
  } catch (error) {
    console.error('Controller error:', error);
    res.status(500).render('error', {
      message: 'Error updating train',
      error: process.env.NODE_ENV === 'development' ? error : {},
    });
  }
}

export async function deleteTrainController(req, res) {
  try {
    const { trainID } = req.params;
    await deleteItemById('trains', trainID);

    return res.redirect('/trains');
  } catch (error) {
    console.error('Controller error:', error);
    res.status(500).render('error', {
      message: 'Error deleting train',
      error: process.env.NODE_ENV === 'development' ? error : {},
    });
  }
}
