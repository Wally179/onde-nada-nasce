const express = require('express');
const db = require('../db');
const authenticateToken = require('../middleware/auth');

const router = express.Router();

// Get user's save game
router.get('/', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId;
    
    const result = await db.query('SELECT game_state FROM saves WHERE user_id = $1', [userId]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'No save found for this user.' });
    }
    
    res.json(result.rows[0].game_state);
  } catch (err) {
    console.error('Error fetching save:', err);
    res.status(500).json({ error: 'Server error fetching save.' });
  }
});

// Update or create user's save game
router.put('/', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId;
    const gameState = req.body;
    
    if (!gameState) {
      return res.status(400).json({ error: 'Game state data is required.' });
    }
    
    // Upsert logic
    const result = await db.query(
      `INSERT INTO saves (user_id, game_state, updated_at) 
       VALUES ($1, $2, NOW()) 
       ON CONFLICT (user_id) 
       DO UPDATE SET game_state = $2, updated_at = NOW() 
       RETURNING id, updated_at`,
      [userId, JSON.stringify(gameState)]
    );
    
    res.json({ message: 'Save updated successfully.', updated_at: result.rows[0].updated_at });
  } catch (err) {
    console.error('Error updating save:', err);
    res.status(500).json({ error: 'Server error updating save.' });
  }
});

module.exports = router;
