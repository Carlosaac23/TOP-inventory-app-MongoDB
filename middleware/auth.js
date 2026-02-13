export function adminPassword(req, res, next) {
  const password = req.body?.adminPassword;
  if (password === process.env.ADMIN_PASSWORD) return next();
  return res.status(403).send('Incorrect password');
}
