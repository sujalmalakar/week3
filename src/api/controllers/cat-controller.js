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

const getOneCat = async (req, res, next) => {
  const cat = await getCatById(req.params.id);

  if (!cat) {
    const error = new Error('Cat not found');
    error.status = 404;
    return next(error);
  }

  res.json(cat);
};

const getCatsByUser = async (req, res) => {
  const cats = await getCatsByUserId(req.params.userId);
  res.json(cats);
};

const postCat = async (req, res, next) => {
  console.log('body:', req.body);
  console.log('file:', req.file);

  if (!req.file) {
    const error = new Error('Invalid or missing file');
    error.status = 400;
    return next(error);
  }

  const catData = {
    ...req.body,
    filename: req.file.filename,
    owner: res.locals.user.user_id,
  };

  const result = await addCat(catData);

  if (!result) {
    return next(new Error('Could not add cat'));
  }

  res.status(201).json(result);
};

const putCat = async (req, res, next) => {
  const result = await modifyCat(
    req.body,
    req.params.id,
    res.locals.user.user_id,
    res.locals.user.role,
  );

  if (!result) {
    const error = new Error('Cat not found');
    error.status = 404;
    return next(error);
  }

  res.json(result);
};

const deleteCat = async (req, res, next) => {
  const result = await removeCat(
    req.params.id,
    res.locals.user.user_id,
    res.locals.user.role,
  );

  if (!result) {
    const error = new Error('Cat not found');
    error.status = 404;
    return next(error);
  }

  res.json(result);
};

export { getAllCats, getOneCat, getCatsByUser, postCat, putCat, deleteCat };
