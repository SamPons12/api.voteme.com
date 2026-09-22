import { Edition } from "../models/Edition.js";
import { logger } from "../utils/logger.js";

export const editionController = {
  createEdition: async (req, res) => {
    try {
      const payload = req.body;
      
      const categoryIds = Array.isArray(payload.categoryIds) ? payload.categoryIds : [];
      if (!Array.isArray(payload.categoryIds) || payload.categoryIds.length === 0) {
        return res.status(400).json({ ok: false, message: "categoryIds is required and must be a non-empty array" });
      }

      const data = {
        name: payload.editionName,
        startDate: payload.selectedRange.from,
        endDate: payload.selectedRange.to,
        status: payload.status,
      };
      console.log(data.status)
      const result = await Edition.createEdition(data, categoryIds);

      if (result.affectedRows !== 0) {
        logger.info(`Edition created: ${payload.editionName} (id ${result.editionId})`);
        return res.status(201).json({ ok: true, message: "Edition created correctly", editionId: result.editionId });
      }
      return res.status(400).json({ ok: false, message: "Failed to create edition" });
    } catch (err) {
      logger.error(`Create edition error: ${err.message}`);
      return res.status(500).json({ ok: false, message: "Error creating edition" });
    }
  },
  deleteEdition: async (req, res) => {
    try {
      const id = req.params.id;
      const result = await Edition.deleteEdition(id);

      if (result.affectedRows !== 0) {
        logger.info(`Edition deleted: ${id}`);
        return res.status(200).json({ ok: true, message: "Edition deleted correctly" });
      }
      return res.status(404).json({ ok: false, message: "Edition not found" });
    } catch (err) {
      logger.error(`Delete edition error: ${err.message}`);
      return res.status(500).json({ ok: false, message: "Error deleting edition" });
    }
  },
  updateEdition: async (req, res) => {
    try {
      const id = req.params.id;
      const payload = req.body;
      
      const data = {
          name: payload.editionName,
          startDate: payload.selectedRange.from,
          endDate: payload.selectedRange.to,
          status: payload.status,
        };
      const result = await Edition.updateEdition(id, data);

      if (result.affectedRows !== 0) {
        logger.info(`Edition updated: ${id}`);
        return res.status(200).json({ ok: true, message: "Edition updated correctly" });
      }
      return res.status(404).json({ ok: false, message: "Edition not found" });
    } catch (err) {
      logger.error(`Update edition error: ${err.message}`);
      return res.status(500).json({ ok: false, message: "Error updating edition" });
    }
  },
  getAllEditions: async (req, res) => {
    try {
      const editions = await Edition.getAllEditions();
      return res.status(200).json({ ok: true, data: editions });
    } catch (err) {
      logger.error(`Get editions error: ${err.message}`);
      return res.status(500).json({ ok: false, message: "Error fetching editions" });
    }
  },
  getActiveEditionCategories: async (req, res) => {
    try {
      const categories = await Edition.getActiveEditionCategories();
      return res.status(200).json({ ok: true, data: categories });
    } catch (err) {
      logger.error(`Get active categories error: ${err.message}`);
      return res.status(500).json({ ok: false, message: "Error fetching categories" });
    }
  },
  //Get all categories from last edition
  getLastEditionCategories: async (req, res) => {
    try {
      const categories = await Edition.getLastEditionCategories();
      return res.status(200).json({ok: true, data: categories});
    } catch (err) {
      logger.error(`Get last edition categories error: ${err.message}`);
      return res.status(500).json({ ok: false, message: "Error fetching categories" });
    }
  },
  // Get all categories for a specific edition
  getEditionCategories: async (req, res) => {
    try {
      const editionId = req.params?.editionId;
      const categories = await Edition.getEditionCategories(editionId);
      return res.status(200).json({ ok: true, data: categories });
    } catch (err) {
      logger.error(`Get edition categories error: ${err.message}`);
      return res.status(500).json({ ok: false, message: "Error fetching categories" });
    }
  },
  // Get nominees for an edition-category
  getEditionCategoryNominees: async (req, res) => {
    try {
      const editionCategoryId = req.params.editionCategoryId;
      const nominees = await Edition.getEditionCategoryNominees(editionCategoryId);
      return res.status(200).json({ ok: true, data: nominees });
    } catch (err) {
      logger.error(`Get edition category nominees error: ${err.message}`);
      return res.status(500).json({ ok: false, message: "Error fetching nominees" });
    }
  },
  // Get available nominees for an edition-category
  getAvailableNominees: async (req, res) => {
    try {
      const editionCategoryId = req.params.editionCategoryId;
      const nominees = await Edition.getAvailableNominees(editionCategoryId);
      return res.status(200).json({ ok: true, data: nominees });
    } catch (err) {
      logger.error(`Get available nominees error: ${err.message}`);
      return res.status(500).json({ ok: false, message: "Error fetching nominees" });
    }
  },
  // Add nominee to edition-category
  addNomineeToEditionCategory: async (req, res) => {
    try {
      const { editionCategoryId } = req.params;
      const { nomineeId } = req.body;

      if (!nomineeId) {
        return res.status(400).json({ ok: false, message: "nomineeId is required" });
      }

      const result = await Edition.addNomineeToEditionCategory(editionCategoryId, nomineeId);

      if (result.affectedRows > 0) {
        logger.info(`Nominee ${nomineeId} added to edition category ${editionCategoryId}`);
        return res.status(201).json({ ok: true, message: "Nominee added successfully" });
      }
      return res.status(400).json({ ok: false, message: "Failed to add nominee" });
    } catch (err) {
      logger.error(`Add nominee error: ${err.message}`);
      return res.status(500).json({ ok: false, message: "Error adding nominee" });
    }
  },
  // Remove nominee from edition-category
  removeNomineeFromEditionCategory: async (req, res) => {
    try {
      const { id } = req.params;
      const result = await Edition.removeNomineeFromEditionCategory(id);

      if (result.affectedRows > 0) {
        logger.info(`Nominee removed from edition category: ${id}`);
        return res.status(200).json({ ok: true, message: "Nominee removed successfully" });
      }
      return res.status(404).json({ ok: false, message: "Nominee not found" });
    } catch (err) {
      logger.error(`Remove nominee error: ${err.message}`);
      return res.status(500).json({ ok: false, message: "Error removing nominee" });
    }
  },
  // Get available categories for an edition
  getAvailableCategoriesForEdition: async (req, res) => {
    try {
      const editionId = req.params.editionId;
      const categories = await Edition.getAvailableCategoriesForEdition(editionId);
      return res.status(200).json({ ok: true, data: categories });
    } catch (err) {
      logger.error(`Get available categories error: ${err.message}`);
      return res.status(500).json({ ok: false, message: "Error fetching categories" });
    }
  },
  // Add category to edition
  addCategoryToEdition: async (req, res) => {
    try {
      const { editionId, categoryId } = req.params;

      if (!categoryId) {
        return res.status(400).json({ ok: false, message: "categoryId is required" });
      }

      const result = await Edition.addCategoryToEdition(editionId, categoryId);

      if (result.affectedRows > 0) {
        logger.info(`Category ${categoryId} added to edition ${editionId}`);
        return res.status(201).json({ ok: true, message: "Category added successfully" });
      }
      return res.status(400).json({ ok: false, message: "Failed to add category" });
    } catch (err) {
      logger.error(`Add category error: ${err.message}`);
      return res.status(500).json({ ok: false, message: "Error adding category" });
    }
  },
  // Remove category from edition
  removeCategoryFromEdition: async (req, res) => {
    try {
      const { editionId, categoryId } = req.params;
      const result = await Edition.removeCategoryFromEdition(editionId, categoryId);

      if (result.affectedRows > 0) {
        logger.info(`Category ${categoryId} removed from edition ${editionId}`);
        return res.status(200).json({ ok: true, message: "Category removed successfully" });
      }
      return res.status(404).json({ ok: false, message: "Category not found" });
    } catch (err) {
      logger.error(`Remove category error: ${err.message}`);
      return res.status(500).json({ ok: false, message: "Error removing category" });
    }
  }
};
