import { getDB } from "../config/db.js";

export const User = {
  findOne: async (email) => {
    try {
      const db = await getDB();
      const [rows] = await db.execute(
        'SELECT * FROM users WHERE email = ? AND enabled = 1',
        [email]
      );
      return rows[0] || null
    } catch (err) {
      console.log(err)
    }

  },

  create: async (email, password, verificationToken) => {
    const db = await getDB();
    const [result] = await db.execute(
      'INSERT INTO users(email, password, verification_token) VALUES (?, ?, ?) RETURNING user_id',
      [email, password, verificationToken]
    );
    return result[0].user_id
  },
  findByVerificationToken: async (token) => {
    const db = await getDB();
    const [rows] = await db.execute(
      'SELECT * FROM users WHERE verification_token = ? AND enabled = 0',
      [token]
    );
    return rows[0] || null;
  },
  verifyEmail: async (userId) => {
    const db = await getDB();
    await db.execute(
      'UPDATE users SET verification_token = NULL, enabled = 1 WHERE user_id = ?',
      [userId]
    );
  }

}