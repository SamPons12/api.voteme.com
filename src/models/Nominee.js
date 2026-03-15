import { getDB } from "../config/db.js"

export const Nominee = {
  getAll: () => {

  },

  getNomineesByCategoryId: async (categoryId) => {
    try {
      const db = await getDB();
      const [nominees] = await db.execute(
        `SELECT nc.nominee_category_id, n.*
         FROM nominees_categories AS nc
         INNER JOIN nominees AS n
         ON nc.nominee_id = n.nominee_id
         WHERE category_id = ? `,
         [categoryId]
      )

      return nominees;
    } catch (err) {
      console.log(err)
    }
  }
}