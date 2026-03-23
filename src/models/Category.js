import { getDB } from "../config/db.js"
import { logger } from "../utils/logger.js";

export const Category = {
  getAll: async () => {
    try {
      const db = await getDB();

      const [categories] = await db.execute(
        'SELECT * FROM categories'
      )

      logger.info('Fetched all categories');
      return categories
    } catch (err) {
      logger.error(`Category.getAll error: ${err.message}`);
      console.log(err)
    }
  },
  createCategory: async (data) => {
    try {
      const {name, description, enabled} = data
      const db = await getDB();

      const [result] = await db.execute(
        `INSERT INTO categories(name, description, enabled)
         VALUES(?, ?, ?)`,
         [name, description, enabled]
      )

      logger.info(`Category created: ${name}`);
      return result
    } catch (err) {
      logger.error(`Category.createCategory error: ${err.message}`);
      throw err;
    }
  },
  updateCategory: async (categoryId, data) => {
    try {
      const {categoryName, description, enabled} = data
      const db = await getDB();

      const [result] = await db.execute(
        `UPDATE categories
         SET name = ?, description = ?, enabled = ?
         WHERE category_id = ?`,
         [categoryName, description, enabled, categoryId]
      )

      logger.info(`Category updated: ${categoryId}`);
      return result
    } catch (err) {
      logger.error(`Category.updateCategory error: ${err.message}`);
      throw err;
    }
  },
  deleteCategory: async (categoryId) => {
    try {
      const db = await getDB();
      
      // First delete all votes associated with nominees in this category
      await db.execute(
        `DELETE FROM votes 
         WHERE edition_category_nominee_id IN (
           SELECT ecn.id FROM editions_categories_nominees ecn
           INNER JOIN editions_categories ec ON ecn.edition_category_id = ec.edition_category_id
           WHERE ec.category_id = ?
         )`,
        [categoryId]
      );
      
      // Then delete nominees from editions_categories_nominees for this category
      await db.execute(
        `DELETE FROM editions_categories_nominees 
         WHERE edition_category_id IN (
           SELECT edition_category_id FROM editions_categories WHERE category_id = ?
         )`,
        [categoryId]
      );
      
      // Delete from editions_categories
      await db.execute(
        `DELETE FROM editions_categories WHERE category_id = ?`,
        [categoryId]
      );
      
      // Finally delete the category
      const [result] = await db.execute(
        `DELETE FROM categories WHERE category_id = ?`,
        [categoryId]
      )

      logger.info(`Category deleted: ${categoryId}`);
      return result
    } catch (err) {
      logger.error(`Category.deleteCategory error: ${err.message}`);
      throw err;
    }
  }
}
