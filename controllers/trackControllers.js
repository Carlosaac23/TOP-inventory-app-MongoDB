import { ObjectId } from 'mongodb';

import {
  getAllItems,
  getCategoriesByType,
  getItemById,
  getBrandsAndScales,
  addItem,
  updateItemById,
  deleteItemById,
} from '../db/queries.js';

export async function getAllTracksController(req, res) {
  try {
    const { category, scale, brand } = req.query;

    const tracks = await getAllItems('tracks', { category, scale, brand });
    const categories = await getCategoriesByType('track');
    const { scales, brands } = await getBrandsAndScales();

    res.render('pages/items-collection', {
      itemNamePlural: 'Tracks',
      itemNameSingular: 'Track',
      path: 'tracks',
      items: tracks,
      categories,
      scales,
      brands,
      filters: { category, scale, brand },
    });
  } catch (error) {
    console.error('Controller error:', error);
    res.status(500).render('error', {
      message: 'Unable to load tracks',
      error: process.env.NODE_ENV === 'development' ? error : {},
    });
  }
}

export async function getTrackByIdController(req, res) {
  try {
    const { trackID } = req.params;
    const track = await getItemById('tracks', trackID);

    if (!track) {
      return res.status(404).render('error', {
        message: 'Track not found',
        error: { details: `No track found with ID ${trackID}` },
      });
    }

    const categories = await getCategoriesByType('track');
    const { scales, brands } = await getBrandsAndScales();

    res.render('pages/item-info', {
      itemNamePlural: 'Tracks',
      itemNameSingular: 'Track',
      path: 'tracks',
      item: track,
      categories,
      scales,
      brands,
    });
  } catch (error) {
    console.error('Controller error:', error);
    res.status(500).render('error', {
      message: 'Unable to load track',
      error: process.env.NODE_ENV === 'development' ? error : {},
    });
  }
}

export async function getAddFormController(req, res) {
  try {
    const categories = await getCategoriesByType('track');
    const { scales, brands } = await getBrandsAndScales();

    res.render('forms/addForm', {
      title: 'Track',
      path: 'tracks',
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

    await addItem('tracks', {
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

    return res.redirect('/tracks');
  } catch (error) {
    console.error('Controller error:', error);
    res.status(500).render('error', {
      message: 'Error adding track',
      error: process.env.NODE_ENV === 'development' ? error : {},
    });
  }
}

export async function getUpdateFormController(req, res) {
  try {
    const { trackID } = req.params;
    const track = await getItemById('tracks', trackID);

    if (!track) {
      return res.status(404).render('error', {
        message: 'Track not found',
        error: { details: `Cannot update - track ${trackID} does not exist` },
      });
    }

    const categories = await getCategoriesByType('track');
    const { scales, brands } = await getBrandsAndScales();

    res.render('forms/updateForm', {
      title: 'Track',
      item: track,
      path: 'tracks',
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
    const { trackID } = req.params;
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

    const updatedTrack = await updateItemById('tracks', trackID, {
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

    if (!updatedTrack) {
      return res.status(404).render('error', {
        message: 'Track not found',
        error: { details: `Cannot update - track ${trackID} does not exist` },
      });
    }

    return res.redirect(`/tracks/${trackID}`);
  } catch (error) {
    console.error('Controller error:', error);
    res.status(500).render('error', {
      message: 'Error updating track',
      error: process.env.NODE_ENV === 'development' ? error : {},
    });
  }
}

export async function deleteTrackController(req, res) {
  try {
    const { trackID } = req.params;
    await deleteItemById('tracks', trackID);

    return res.redirect('/tracks');
  } catch (error) {
    console.error('Controller error:', error);
    res.status(500).render('error', {
      message: 'Error deleting track',
      error: process.env.NODE_ENV === 'development' ? error : {},
    });
  }
}
