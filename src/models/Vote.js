import { getDB } from "../config/db.js"

export const Vote = {
  saveVotes: async (userId, votes) => {
    const db = await getDB();
    for (const [categoryId, nomineeCategoryId] of Object.entries(votes)){
      const [result] = await db.execute(
        'INSERT INTO votes(category_id, nominee_category_id, user_id) VALUES (?, ?, ?)',
        [categoryId, nomineeCategoryId, userId]
      )
      if (result.affectedRows === 0) {
        throw Error("Vote could not be saved");
      }
    }
  },
  hasUserVoted: async (userId) => {
    const db = await getDB();
    const [result] = await db.execute(
      `SELECT v.user_id
       FROM votes AS v
       INNER JOIN nominees_categories AS nc
       ON v.nominee_category_id = nc.nominee_category_id
       INNER JOIN voting_periods AS vp
       ON nc.voting_period_id = vp.voting_period_id
       WHERE v.user_id = ? AND vp.is_open = 1`, 
       [userId]
    )
    return result;
  }
}