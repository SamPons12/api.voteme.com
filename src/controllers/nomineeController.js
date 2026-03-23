import { Nominee } from "../models/Nominee.js";
import { logger } from "../utils/logger.js";

export const nomineesController = {
  getAllNominees: async (req, res) => {
    try {
      const nominees = await Nominee.getAll();
      return res.status(200).json({ ok: true, data: nominees });
    } catch (err) {
      logger.error(`Get nominees error: ${err.message}`);
      return res.status(500).json({ ok: false, message: "Error fetching nominees" });
    }
  },

  getNomineeById: async (req, res) => {
    try {
      const nomineeId = req.params.nomineeId;
      const nominee = await Nominee.getNomineeById(nomineeId);
      
      if (!nominee) {
        return res.status(404).json({ ok: false, message: "Nominee not found" });
      }
      
      return res.status(200).json({ ok: true, data: nominee });
    } catch (err) {
      logger.error(`Get nominee error: ${err.message}`);
      return res.status(500).json({ ok: false, message: "Error fetching nominee" });
    }
  },

  createNominee: async (req, res) => {
    try {
      const { name, description } = req.body;
      const image_url = req.file ? `/uploads/nominees/${req.file.filename}` : null;

      if (!name) {
        return res.status(400).json({ ok: false, message: "Name is required" });
      }

      const result = await Nominee.create({ name, description, image_url });

      if (result.affectedRows > 0) {
        logger.info(`Nominee created: ${name}`);
        return res.status(201).json({ ok: true, message: "Nominee created successfully", data: result.nominee });
      }
      return res.status(400).json({ ok: false, message: "Failed to create nominee" });
    } catch (err) {
      logger.error(`Create nominee error: ${err.message}`);
      return res.status(500).json({ ok: false, message: "Error creating nominee" });
    }
  },

  updateNominee: async (req, res) => {
    try {
      const nomineeId = req.params.nomineeId;
      const { name, description, enabled } = req.body;
      const image_url = req.file ? `/uploads/nominees/${req.file.filename}` : undefined;

      if (!name) {
        return res.status(400).json({ ok: false, message: "Name is required" });
      }

      const result = await Nominee.update(nomineeId, { name, description, enabled, image_url });

      if (result.changedRows !== 0 || result.nominee) {
        logger.info(`Nominee updated: ${nomineeId}`);
        return res.status(200).json({ ok: true, message: "Nominee updated successfully", data: result.nominee });
      }
      return res.status(404).json({ ok: false, message: "Nominee not found" });
    } catch (err) {
      logger.error(`Update nominee error: ${err.message}`);
      return res.status(500).json({ ok: false, message: "Error updating nominee" });
    }
  },

  deleteNominee: async (req, res) => {
    try {
      const nomineeId = req.params.nomineeId;
      const result = await Nominee.delete(nomineeId);

      if (result.affectedRows > 0) {
        logger.info(`Nominee deleted: ${nomineeId}`);
        return res.status(200).json({ ok: true, message: "Nominee deleted successfully" });
      }
      return res.status(404).json({ ok: false, message: "Nominee not found" });
    } catch (err) {
      logger.error(`Delete nominee error: ${err.message}`);
      return res.status(500).json({ ok: false, message: "Error deleting nominee" });
    }
  },

  getNomineeByCategory: async (req, res) => {
    try {
      const categoryId = req.params.categoryId;
      const nominees = await Nominee.getNomineesByCategoryId(categoryId)

      return res.status(200).json({ ok: true, data: nominees });
    } catch (err) {
      logger.error(`Get nominees error: ${err.message}`);
      return res.status(500).json({ ok: false, message: "Error fetching nominees" });
    }
  }
}