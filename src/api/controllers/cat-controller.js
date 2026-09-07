import { getCats, getCatById, addCat } from '../models/cat-model.js';

const getAllCats = (req, res) => {
  res.json(getCats());
};

const getOneCat = (req, res) => {
  const cat = getCatById(req.params.id);
  res.json(cat);
};

const postCat = (req, res) => {
  const cat = addCat(req.body);
  res.json(cat);
};

const putCat = (req, res) => {
  res.json({ message: 'Cat item updated.' });
};

const deleteCat = (req, res) => {
  res.json({ message: 'Cat item deleted.' });
};

export { getAllCats, getOneCat, postCat, putCat, deleteCat };
