import { getDB } from "../config/db.js"

export const Vote = {
  getAllVotes: async () => {
    const db = await getDB();
    const [result] = await db.execute(
      `SELECT 
        v.vote_id,
        v.user_id,
        u.email as user_email,
        ecn.nominee_id,
        n.name as nominee_name,
        c.category_id,
        c.name as category_name,
        e.edition_id,
        e.name as edition_name,
        v.created_at as voted_at
       FROM votes AS v
       INNER JOIN editions_categories_nominees AS ecn
       ON v.edition_category_nominee_id = ecn.id
       INNER JOIN nominees AS n
       ON ecn.nominee_id = n.nominee_id
       INNER JOIN editions_categories AS ec
       ON ecn.edition_category_id = ec.edition_category_id
       INNER JOIN categories AS c
       ON ec.category_id = c.category_id
       INNER JOIN editions AS e
       ON ec.edition_id = e.edition_id
       INNER JOIN users AS u
       ON v.user_id = u.user_id
       ORDER BY v.created_at DESC`
    )
    return result;
  },
  saveVotes: async (userId, votes) => {
    const db = await getDB();
    for (const [categoryId, edition_category_nominee_id] of Object.entries(votes)){
      const [result] = await db.execute(
        'INSERT INTO votes(edition_category_nominee_id, user_id) VALUES (?, ?)',
        [edition_category_nominee_id, userId]
      )
      if (result.affectedRows === 0) {
        throw Error("Vote could not be saved");
      }
    }
  },
  getUserVotes: async (userId) => {
    const db = await getDB();
    const [result] = await db.execute(
      `SELECT 
        v.vote_id,
        n.name as nominee_name,
        c.name as category_name,
        e.name as edition_name,
        v.created_at as voted_at
       FROM votes AS v
       INNER JOIN editions_categories_nominees AS ecn
       ON v.edition_category_nominee_id = ecn.id
       INNER JOIN nominees AS n
       ON ecn.nominee_id = n.nominee_id
       INNER JOIN editions_categories AS ec
       ON ecn.edition_category_id = ec.edition_category_id
       INNER JOIN categories AS c
       ON ec.category_id = c.category_id
       INNER JOIN editions AS e
       ON ec.edition_id = e.edition_id
       WHERE v.user_id = ?
       ORDER BY v.created_at DESC`,
       [userId]
    )
    return result;
  },
  hasUserVoted: async (userId) => {
    const db = await getDB();
    const [result] = await db.execute(
      `SELECT v.user_id
       FROM votes AS v
       INNER JOIN editions_categories_nominees AS ecn
       ON v.edition_category_nominee_id = ecn.id
       INNER JOIN editions_categories AS ec
       ON ecn.edition_category_id = ec.edition_category_id
       INNER JOIN editions AS e
       ON ec.edition_id = e.edition_id
       WHERE v.user_id = ? AND e.status = 'open'`, 
       [userId]
    )
    return result;
  }
}