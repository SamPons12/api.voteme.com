import { getDB } from "../config/db.js"

export const Category = {
  getAll: async () => {
    try {
      const db = await getDB();

      const [categories] = await db.execute(
        'SELECT * FROM categories'
      )

      return categories
    } catch (err) {
      console.log(err)
    }
  }
}