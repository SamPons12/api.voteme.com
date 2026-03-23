import { Category } from "../models/Category.js"
import { logger } from '../utils/logger.js';

export const categoryController = {
  getAll: async (req, res) => {
    try {
      const categories = await Category.getAll();
      res.status(200).json({ ok: true, data: categories })
    } catch (error) {
      logger.error(`Get categories error: ${error.message}`);
      return res.status(500).json({ ok: false, message: "Error fetching categories" });
    }
  },
  createCategory: async (req, res) => {
    try {
      const payload = req.body;
      const result = await Category.createCategory(payload);

      if(result.affectedRows > 0) {
        logger.info(`Category created: ${payload.name}`);
        res.status(201).json({"ok": true, "message": "Category created correctly"})
      } else {
        return res.status(400).json({ ok: false, message: "Failed to create category" });
      }
    } catch (err) {
      logger.error(`Create category error: ${err.message}`);
      return res.status(500).json({ ok: false, message: "Error creating category" });
    }
  },
  deleteCategory: async (req, res) => {
    try {
      const categoryId = req.params.id;
      const result = await Category.deleteCategory(categoryId);

      if(result.affectedRows > 0) {
        logger.info(`Category deleted: ${categoryId}`);
        return res.status(200).json({ ok: true, message: "Category deleted correctly" });
      } else {
        return res.status(404).json({ ok: false, message: "Category not found" });
      }
    } catch (error) {
      logger.error(`Delete category error: ${error.message}`);
      return res.status(500).json({ ok: false, message: "Error deleting category" });
    }
  },
  updateCategory: async (req, res) => {
    try {
      const categoryId = req.params.id;
      const payload = req.body;
      const result = await Category.updateCategory(categoryId, payload);

      if(result.changedRows > 0 || result.affectedRows > 0) {
        logger.info(`Category updated: ${categoryId}`);
        return res.status(200).json({ ok: true, message: "Category updated correctly" });
      } else {
        return res.status(404).json({ ok: false, message: "Category not found" });
      }
    } catch (err) {
      logger.error(`Update category error: ${err.message}`);
      return res.status(500).json({ ok: false, message: "Error updating category" });
    }
  }
}