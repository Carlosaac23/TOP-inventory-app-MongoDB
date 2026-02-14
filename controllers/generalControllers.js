import { addBrand, addScale, getBrandsAndScales } from '../db/queries.js';

export function getHomepage(req, res) {
  res.render('index');
}

export function getAboutPage(req, res) {
  res.render('pages/about');
}

export function getShippingPage(req, res) {
  res.render('pages/shipping');
}

export function getContactPage(req, res) {
  res.render('pages/contact');
}

export function getReturnsPage(req, res) {
  res.render('pages/returns');
}

export async function getBrandsPage(req, res) {
  const { _scales, brands } = await getBrandsAndScales();

  res.render('pages/brands', { brands });
}

export function getAddFormController(req, res) {
  res.render('forms/addBrandScaleForm');
}

export async function postAddFormController(req, res) {
  try {
    const {
      entityType,
      brandName,
      country,
      foundation,
      logo_url,
      scale,
      ratio,
      track_width,
    } = req.body;

    if (entityType === 'brand') {
      await addBrand({
        name: brandName,
        country,
        foundation: Number(foundation),
        logo_url,
      });
    }

    if (entityType === 'scale') {
      await addScale({
        scale,
        ratio,
        track_width,
      });
    }

    return res.redirect('/brands');
  } catch (error) {
    console.error('Controller error:', error);
    res.status(500).render('error', {
      message: 'Error adding brand or scale',
      error: process.env.NODE_ENV === 'development' ? error : {},
    });
  }
}
