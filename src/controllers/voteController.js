import { Vote } from "../models/Vote.js"

export const voteController = {
  saveVotes: async (req, res) => {
    const votes = req.body.votes
    const userId = req.user.userId
    try {
      await Vote.saveVotes(userId, votes);
      res.status(200).json({ok: true});
    } catch (error) {
      console.log(error)
      res.status(500).json({ok: false, error: error.message})
    } 
  },
  hasUserVoted: async (req, res) => {
    const userId = req.user.userId;
    try {
      const userVoted = await Vote.hasUserVoted(userId);
      if (!userVoted[0]) {
        res.status(200).json({userVoted: false})
      } else {
         res.status(200).json({userVoted: true})
      }
    } catch (error) {
      console.log(error)
    }
  }
}