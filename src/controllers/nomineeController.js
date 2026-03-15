import { Nominee } from "../models/Nominee.js";

export const nomineesController = {
  getNomineeByCategory: async (req, res) => {
    try {
      const categoryId = req.params.categoryId;
      const nominees = await Nominee.getNomineesByCategoryId(categoryId)

      res.json(nominees);
    } catch (err) {
      console.log(err)
    }
  }
}