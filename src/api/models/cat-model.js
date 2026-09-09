import promisePool from '../../utils/database.js';

const getCats = async () => {
  const [rows] = await promisePool.query(`
    SELECT
      wsk_cats.*,
      wsk_users.name AS owner_name
    FROM wsk_cats
    JOIN wsk_users ON wsk_cats.owner = wsk_users.user_id
  `);

  return rows;
};

const getCatById = async (id) => {
  const [rows] = await promisePool.execute(
    `
    SELECT
      wsk_cats.*,
      wsk_users.name AS owner_name
    FROM wsk_cats
    JOIN wsk_users ON wsk_cats.owner = wsk_users.user_id
    WHERE wsk_cats.cat_id = ?
    `,
    [id],
  );

  if (rows.length === 0) {
    return false;
  }

  return rows[0];
};

const getCatsByUserId = async (userId) => {
  const [rows] = await promisePool.execute(
    `
    SELECT
      wsk_cats.*,
      wsk_users.name AS owner_name
    FROM wsk_cats
    JOIN wsk_users ON wsk_cats.owner = wsk_users.user_id
    WHERE wsk_cats.owner = ?
    `,
    [userId],
  );

  return rows;
};

const addCat = async (cat) => {
  const { cat_name, weight, owner, filename, birthdate } = cat;

  const sql = `
    INSERT INTO wsk_cats (cat_name, weight, owner, filename, birthdate)
    VALUES (?, ?, ?, ?, ?)
  `;

  const params = [cat_name, weight, owner, filename, birthdate];

  const [result] = await promisePool.execute(sql, params);

  if (result.affectedRows === 0) {
    return false;
  }

  return { cat_id: result.insertId };
};

const modifyCat = async (cat, id, owner, role) => {
  let sql;

  if (role === 'admin') {
    sql = promisePool.format('UPDATE wsk_cats SET ? WHERE cat_id = ?', [
      cat,
      id,
    ]);
  } else {
    sql = promisePool.format(
      'UPDATE wsk_cats SET ? WHERE cat_id = ? AND owner = ?',
      [cat, id, owner],
    );
  }

  const [result] = await promisePool.query(sql);

  if (result.affectedRows === 0) {
    return false;
  }

  return { message: 'Cat updated successfully' };
};

const removeCat = async (id, owner, role) => {
  let result;

  if (role === 'admin') {
    [result] = await promisePool.execute(
      'DELETE FROM wsk_cats WHERE cat_id = ?',
      [id],
    );
  } else {
    [result] = await promisePool.execute(
      'DELETE FROM wsk_cats WHERE cat_id = ? AND owner = ?',
      [id, owner],
    );
  }

  if (result.affectedRows === 0) {
    return false;
  }

  return { message: 'Cat deleted successfully' };
};

export { getCats, getCatById, getCatsByUserId, addCat, modifyCat, removeCat };
