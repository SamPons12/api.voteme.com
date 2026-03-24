import { getDB } from "../config/db.js"

export const Nominee = {
  getAll: async () => {
    try {
      const db = await getDB();
      const [nominees] = await db.execute(
        `SELECT nominee_id, name, description, image_url, enabled, 
         DATE_FORMAT(inserted_on, "%Y-%m-%d %H:%i:%s") AS inserted_on,
         DATE_FORMAT(updated_at, "%Y-%m-%d %H:%i:%s") AS updated_at
         FROM nominees
         ORDER BY name ASC`
      );
      return nominees;
    } catch (err) {
      console.log(err);
      throw err;
    }
  },

  getNomineeById: async (nomineeId) => {
    try {
      const db = await getDB();
      const [nominee] = await db.execute(
        `SELECT nominee_id, name, description, image_url, enabled, 
         DATE_FORMAT(inserted_on, "%Y-%m-%d %H:%i:%s") AS inserted_on,
         DATE_FORMAT(updated_at, "%Y-%m-%d %H:%i:%s") AS updated_at
         FROM nominees
         WHERE nominee_id = ?`,
        [nomineeId]
      );
      return nominee[0];
    } catch (err) {
      console.log(err);
      throw err;
    }
  },

  create: async (data) => {
    try {
      const { name, description, image_url } = data;
      const db = await getDB();
      const [result] = await db.execute(
        `INSERT INTO nominees (name, description, image_url, enabled)
         VALUES (?, ?, ?, 1)`,
        [name, description || null, image_url || null]
      );
      
      // Get the newly created nominee by name and description (most recent)
      const [nominees] = await db.execute(
        `SELECT nominee_id, name, description, image_url, enabled, 
         DATE_FORMAT(inserted_on, "%Y-%m-%d %H:%i:%s") AS inserted_on,
         DATE_FORMAT(updated_at, "%Y-%m-%d %H:%i:%s") AS updated_at
         FROM nominees
         WHERE name = ? AND description <=> ? 
         ORDER BY inserted_on DESC LIMIT 1`,
        [name, description || null]
      );
      
      const nominee = nominees[0];
      return { nominee, affectedRows: result.affectedRows };
    } catch (err) {
      console.log(err);
      throw err;
    }
  },

  update: async (nomineeId, data) => {
    try {
      const { name, description, enabled, image_url } = data;
      const db = await getDB();
      
      let query, params;
      if (image_url !== undefined) {
        query = `UPDATE nominees SET name = ?, description = ?, enabled = ?, image_url = ? WHERE nominee_id = ?`;
        params = [name, description || null, enabled, image_url || null, nomineeId];
      } else {
        query = `UPDATE nominees SET name = ?, description = ?, enabled = ? WHERE nominee_id = ?`;
        params = [name, description || null, enabled, nomineeId];
      }
      
      const [result] = await db.execute(query, params);
      
      const nominee = await Nominee.getNomineeById(nomineeId);
      return { nominee, changedRows: result.changedRows };
    } catch (err) {
      console.log(err);
      throw err;
    }
  },

  delete: async (nomineeId) => {
    try {
      const db = await getDB();
      // First delete all votes for this nominee
      await db.execute(
        `DELETE FROM votes 
         WHERE edition_category_nominee_id IN (
           SELECT id FROM editions_categories_nominees WHERE nominee_id = ?
         )`,
        [nomineeId]
      );
      
      // Then delete from editions_categories_nominees
      await db.execute(
        `DELETE FROM editions_categories_nominees WHERE nominee_id = ?`,
        [nomineeId]
      );
      
      // Finally delete the nominee
      const [result] = await db.execute(
        `DELETE FROM nominees WHERE nominee_id = ?`,
        [nomineeId]
      );
      
      return result;
    } catch (err) {
      console.log(err);
      throw err;
    }
  },

  getNomineesByCategoryId: async (categoryId) => {
    try {
      const db = await getDB();
      const [nominees] = await db.execute(
        `SELECT n.*, c.name AS category_name, ecn.id
        FROM nominees AS n
        INNER JOIN editions_categories_nominees AS ecn
        ON n.nominee_id = ecn.nominee_id
        INNER JOIN editions_categories AS ec
        ON ecn.edition_category_id = ec.edition_category_id
        INNER JOIN categories AS c
        ON ec.category_id = c.category_id
        INNER JOIN editions AS e
        ON ec.edition_id = e.edition_id
        WHERE c.category_id = ? AND e.is_open = 1`,
         [categoryId]
      );
      return nominees;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
}