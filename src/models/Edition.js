import { getDB } from "../config/db.js"

export const Edition = {
  createEdition: async (data, categoryIds = []) => {
    try {
      const {name, startDate, endDate, isOpen} = data;
      const db = await getDB();

      const [result] = await db.execute(
        `INSERT INTO editions(name, start_date, end_date, is_open)
         VALUES(?, ?, ?, ?)`,
         [name, startDate, endDate, isOpen]
      );

      // Get the UUID that was just created
      const [uuidResult] = await db.execute(
        `SELECT edition_id FROM editions WHERE name = ? AND start_date = ? AND end_date = ? ORDER BY edition_id DESC LIMIT 1`,
        [name, startDate, endDate]
      );

      const editionId = uuidResult[0]?.edition_id;

      if (Array.isArray(categoryIds) && categoryIds.length > 0) {
        const values = categoryIds.map((categoryId) => [editionId, categoryId]);
        await db.query(
          'INSERT INTO editions_categories (edition_id, category_id) VALUES ?',
          [values]
        );
      }

      return { editionId, affectedRows: result.affectedRows };
    } catch (err) {
      console.log(err);
      throw err;
    }
  },
  deleteEdition: async (id) => {
    try {
      const db = await getDB();
      const [result] = await db.execute(
        'DELETE FROM editions WHERE edition_id = ?',
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
        `UPDATE editions
         SET name = ?,
             start_date = ?,
             end_date = ?,
             is_open = ?
         WHERE edition_id = ?;`,
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
        `SELECT  edition_id, name, 
         DATE_FORMAT(start_date, "%Y-%m-%d") AS start_date, 
         DATE_FORMAT(end_date, "%Y-%m-%d") AS end_date, is_open, 
         total_categories,
         total_nominees
         FROM editions_view `
      );
      console.log(result)
      return result;
    } catch (err) {
      console.log(err)
    }
  },
  getActiveEditionCategories: async () => {
    try {
      const db = await getDB()
      const [result] = await db.execute(
        `SELECT c.*
        FROM editions AS e
        INNER JOIN editions_categories AS ec
        ON e.edition_id = ec.edition_id
        INNER JOIN categories AS c
        ON ec.category_id = c.category_id
        WHERE e.is_open = 1 AND c.enabled = 1;`
      );
      return result
    } catch (err) {
      console.log(err)
    }
  },
  // Get categories for a specific edition
  getEditionCategories: async (editionId) => {
    try {
      const db = await getDB();
      const [result] = await db.execute(
        `SELECT ec.edition_category_id, ec.category_id, c.name, c.description
         FROM editions_categories AS ec
         INNER JOIN categories AS c ON ec.category_id = c.category_id
         WHERE ec.edition_id = ?`,
        [editionId]
      );
      return result;
    } catch (err) {
      console.log(err);
      throw err;
    }
  },
  // Get nominees for a specific edition-category combination
  getEditionCategoryNominees: async (editionCategoryId) => {
    try {
      const db = await getDB();
      const [result] = await db.execute(
        `SELECT ecn.id, n.nominee_id, n.name, n.description
         FROM editions_categories_nominees AS ecn
         INNER JOIN nominees AS n ON ecn.nominee_id = n.nominee_id
         WHERE ecn.edition_category_id = ?`,
        [editionCategoryId]
      );
      return result;
    } catch (err) {
      console.log(err);
      throw err;
    }
  },
  // Get available nominees (all nominees not yet assigned to this category in this edition)
  getAvailableNominees: async (editionCategoryId) => {
    try {
      const db = await getDB();
      const [result] = await db.execute(
        `SELECT DISTINCT n.nominee_id, n.name, n.description
         FROM nominees AS n
         WHERE n.enabled = 1 
         AND n.nominee_id NOT IN (
           SELECT nominee_id FROM editions_categories_nominees WHERE edition_category_id = ?
         )`,
        [editionCategoryId]
      );
      return result;
    } catch (err) {
      console.log(err);
      throw err;
    }
  },
  // Add nominee to edition-category
  addNomineeToEditionCategory: async (editionCategoryId, nomineeId) => {
    try {
      const db = await getDB();
      const [result] = await db.execute(
        `INSERT INTO editions_categories_nominees (edition_category_id, nominee_id)
         VALUES (?, ?)`,
        [editionCategoryId, nomineeId]
      );
      return result;
    } catch (err) {
      console.log(err);
      throw err;
    }
  },
  // Remove nominee from edition-category
  removeNomineeFromEditionCategory: async (id) => {
    try {
      const db = await getDB();
      const [result] = await db.execute(
        `DELETE FROM editions_categories_nominees WHERE id = ?`,
        [id]
      );
      return result;
    } catch (err) {
      console.log(err);
      throw err;
    }
  },
  // Get available categories for an edition (categories not yet assigned)
  getAvailableCategoriesForEdition: async (editionId) => {
    try {
      const db = await getDB();
      const [result] = await db.execute(
        `SELECT c.category_id, c.name, c.description
         FROM categories AS c
         WHERE c.enabled = 1
         AND c.category_id NOT IN (
           SELECT category_id FROM editions_categories WHERE edition_id = ?
         )`,
        [editionId]
      );
      return result;
    } catch (err) {
      console.log(err);
      throw err;
    }
  },
  // Add category to edition
  addCategoryToEdition: async (editionId, categoryId) => {
    try {
      const db = await getDB();
      const [result] = await db.execute(
        `INSERT INTO editions_categories (edition_id, category_id)
         VALUES (?, ?)`,
        [editionId, categoryId]
      );
      return result;
    } catch (err) {
      console.log(err);
      throw err;
    }
  },
  // Remove category from edition
  removeCategoryFromEdition: async (editionId, categoryId) => {
    try {
      const db = await getDB();
      // First delete all nominees associated with this edition-category
      const [nomineeResult] = await db.execute(
        `DELETE ecn FROM editions_categories_nominees ecn
         INNER JOIN editions_categories ec ON ecn.edition_category_id = ec.edition_category_id
         WHERE ec.edition_id = ? AND ec.category_id = ?`,
        [editionId, categoryId]
      );
      
      // Then delete the edition-category
      const [result] = await db.execute(
        `DELETE FROM editions_categories 
         WHERE edition_id = ? AND category_id = ?`,
        [editionId, categoryId]
      );
      return result;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
}