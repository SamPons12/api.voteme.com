import { getDB } from "../config/db.js"

export const Edition = {
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