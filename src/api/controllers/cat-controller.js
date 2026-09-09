import {
  getCats,
  getCatById,
  getCatsByUserId,
  addCat,
  modifyCat,
  removeCat,
} from '../models/cat-model.js';

const getAllCats = async (req, res) => {
  const cats = await getCats();
  res.json(cats);
};

const getOneCat = async (req, res) => {
  const cat = await getCatById(req.params.id);

  if (!cat) {
    res.status(404).json({ message: 'Cat not found' });
    return;
  }

  res.json(cat);
};

const getCatsByUser = async (req, res) => {
  const cats = await getCatsByUserId(req.params.userId);
  res.json(cats);
};

const postCat = async (req, res) => {
  console.log('body:', req.body);
  console.log('file:', req.file);

  const catData = {
    ...req.body,
    filename: req.file.filename,
    owner: res.locals.user.user_id,
  };

  const result = await addCat(catData);

  if (!result) {
    res.status(500).json({ message: 'Could not add cat' });
    return;
  }

  res.status(201).json(result);
};

const putCat = async (req, res) => {
  const result = await modifyCat(
    req.body,
    req.params.id,
    res.locals.user.user_id,
    res.locals.user.role,
  );

  if (!result) {
    res.status(404).json({ message: 'Cat not found' });
    return;
  }

  res.json(result);
};

const deleteCat = async (req, res) => {
  const result = await removeCat(
    req.params.id,
    res.locals.user.user_id,
    res.locals.user.role,
  );

  if (!result) {
    res.status(404).json({ message: 'Cat not found' });
    return;
  }

  res.json(result);
};

export { getAllCats, getOneCat, getCatsByUser, postCat, putCat, deleteCat };
