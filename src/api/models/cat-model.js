const cats = [
  {
    cat_id: 1,
    name: 'Misu',
    birthdate: '2022-05-10',
    weight: 4.5,
    owner: 'John',
  },
  {
    cat_id: 2,
    name: 'Luna',
    birthdate: '2021-08-15',
    weight: 5,
    owner: 'Sara',
  },
];

const getCats = () => {
  return cats;
};

const getCatById = (id) => {
  return cats.find((cat) => cat.cat_id == id);
};

const addCat = (cat) => {
  cats.push(cat);
  return cat;
};

export { getCats, getCatById, addCat };
