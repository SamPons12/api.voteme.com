import { Category } from "../models/Category.js"

export const categoryController = {
  getAll: async (req, res) => {
    try {
      const categories = await Category.getAll();
      res.status(200).json(categories)
    } catch (error) {
      console.log(error)
    }
  }
}