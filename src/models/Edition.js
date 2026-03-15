import { getDB } from "../config/db.js"

export const Edition = {
  deleteEdition: async (id) => {
    try {
      const db = await getDB();
      const [result] = await db.execute(
        'DELETE FROM voting_periods WHERE voting_period_id = ?',
        [id]
      );
      return result
    } catch (err) {
      console.log(err)
    }
  },
  updateEdition: async (id, data) => {
    try {
      const {name, startDate, endDate, isOpen} = data;
      
      const db = await getDB();

      const [result] = await db.execute(
        `UPDATE voting_periods
         SET name = ?,
             start_date = ?,
             end_date = ?,
             is_open = ?
         WHERE voting_period_id = ?;`,
         [name, startDate, endDate, isOpen, id]
      );

      return result
    } catch (err) {
      console.log(err)
    }
  },
  getAllEditions: async () => {
    try {
      const db = await getDB();
      const [result] = await db.execute(
        'SELECT * FROM voting_periods'
      );
      return result;
    } catch (err) {
      console.log(err)
    }
  },
  getActiveEditionCategories: async () => {
    try {
      const db = await getDB()
      const [result] = await db.execute(
        `SELECT DISTINCT(c.name), c.*
        FROM voting_periods AS vp
        INNER JOIN nominees_categories AS nc
        ON vp.voting_period_id = nc.voting_period_id
        INNER JOIN categories AS c
        ON nc.category_id = c.category_id
        WHERE vp.is_open = 1`
      );
      return result
    } catch (err) {
      console.log(err)
    }
  }
}