import { Edition } from "../models/Edition.js";

export const editionController = {
  createEdition: async (req, res) => {
    try {
      const payload = req.body;
      
      const data = {
        name: payload.editionName,
        startDate: payload.selectedRange.from,
        endDate: payload.selectedRange.to,
        isOpen: payload.isOpen,
      };
      const result = await Edition.createEdition(data);

      if (result.affectedRows !== 0) {
        res.status(200).json({ ok: true, message: "Deleted correctly" });
      }
    } catch (err) {
      console.log(err);
    }
  },
  deleteEdition: async (req, res) => {
    try {
      const id = req.params.id;
      const result = await Edition.deleteEdition(id);

      if (result.affectedRows !== 0) {
        res.status(200).json({ ok: true, message: "Deleted correctly" });
      }
    } catch (err) {
      console.log(err);
    }
  },
  updateEdition: async (req, res) => {
    const id = req.params.id;
    const payload = req.body;
    
    const data = {
        name: payload.editionName,
        startDate: payload.selectedRange.from,
        endDate: payload.selectedRange.to,
        isOpen: payload.isOpen,
      };
    try {
      const result = await Edition.updateEdition(id, data);

      if (result.changedRows !== 0) {
        res.status(200).json({ ok: true, message: "Updated correctly" });
      }
    } catch (err) {
      console.log(err);
    }
  },
  getAllEditions: async (req, res) => {
    try {
      const editions = await Edition.getAllEditions();
      if (editions) {
        res.status(200).json(editions);
      }
    } catch (err) {
      console.log(err);
    }
  },
  getActiveEditionCategories: async (req, res) => {
    try {
      const categories = await Edition.getActiveEditionCategories();
      if (categories) {
        res.status(200).json(categories);
      }
    } catch (err) {
      console.log(err);
    }
  },
};
