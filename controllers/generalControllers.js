import { getAllBrands } from '../db/queries.js';

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
  const brands = await getAllBrands();

  res.render('pages/brands', { brands });
}
