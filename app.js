import path from 'node:path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

import express from 'express';
import methodOverride from 'method-override';

import connectDB from './db/client.js';
import { generalRoute } from './routes/generalRoutes.js';
import { trainRoutes } from './routes/trainRoutes.js';
import { wagonRoutes } from './routes/wagonRoutes.js';

connectDB();
const app = express();
const PORT = 8080;
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const assetsPath = path.join(__dirname, 'public');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(assetsPath));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use((req, res, next) => {
  res.locals.currentPath = req.path;
  next();
});

app.use('/', generalRoute);
app.use('/trains', trainRoutes);
app.use('/wagons', wagonRoutes);

app.listen(PORT, error => {
  if (error) throw error;
  console.log(`Running at http://localhost:${PORT}`);
});
