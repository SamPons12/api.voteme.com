import { Vote } from "../models/Vote.js"
import { logger } from '../utils/logger.js';

export const voteController = {
  getAllVotes: async (req, res) => {
    try {
      const votes = await Vote.getAllVotes();
      return res.status(200).json({ok: true, votes});
    } catch (error) {
      logger.error(`Get all votes error: ${error.message}`);
      return res.status(500).json({ok: false, message: "Error fetching votes"});
    }
  },
  saveVotes: async (req, res) => {
    const votes = req.body.votes
    const userId = req.user.userId
    try {
      await Vote.saveVotes(userId, votes);
      return res.status(201).json({ok: true, message: "Votes saved successfully"});
    } catch (error) {
      logger.error(`Save votes error: ${error.message}`);
      return res.status(500).json({ok: false, message: "Error saving votes"});
    } 
  },
  getUserVotes: async (req, res) => {
    const userId = req.user.userId;
    try {
      const votes = await Vote.getUserVotes(userId);
      return res.status(200).json({ok: true, votes});
    } catch (error) {
      logger.error(`Get user votes error: ${error.message}`);
      return res.status(500).json({ok: false, message: "Error fetching user votes"});
    }
  },
  hasUserVoted: async (req, res) => {
    const userId = req.user.userId;
    try {
      const userVoted = await Vote.hasUserVoted(userId);
      return res.status(200).json({ok: true, userVoted: !!userVoted?.[0]});
    } catch (error) {
      logger.error(`Has user voted error: ${error.message}`);
      return res.status(500).json({ok: false, message: "Error checking votes"});
    }
  }
}