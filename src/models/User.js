import { getDB } from "../config/db.js";

export const User = {
  findOne: async (email) => {
    try {
      const db = await getDB();
      const [rows] = await db.execute(
        'SELECT * FROM users WHERE email = ?',
        [email]
      );
      return rows[0] || null
    } catch (err) {
      console.log(err)
    }

  },

  create: async (email, password) => {
    const db = await getDB();
    const [result] = await db.execute(
      'INSERT INTO users(email, password) VALUES (?, ?) RETURNING user_id',
      [email, password]
    );
    return result[0].user_id
  },




}