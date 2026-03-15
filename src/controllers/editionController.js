import { Edition } from "../models/Edition.js";

export const editionController = {
  getAllEditions: async (req, res) => {
    try {
      const editions = await Edition.getAllEditions();
      if (editions) {
        res.status(200).json(editions);
      }
    } catch (err) {
      console.log(err)
    }
  },
  getActiveEditionCategories: async (req, res) => {
    try {
      const categories = await Edition.getActiveEditionCategories();
      if (categories) {
        res.status(200).json(categories);
      }
    } catch (err) {
      console.log(err)
    }
  }
}