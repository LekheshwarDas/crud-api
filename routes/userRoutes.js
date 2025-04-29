const express = require('express');
const router = express.Router();
const db = require('../database/db');

// ✅ Add new user
router.post('/', async (req, res) => {
    try {
        const { name, email } = req.body;
        const sql = 'INSERT INTO users (name, email) VALUES (?, ?)';
        const [result] = await db.query(sql, [name, email]);
        
        res.status(201).json({
            message: "User created successfully",
            id: result.insertId
        });
    } catch (error) {
        console.error('Error inserting user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// ✅ Get all users
router.get('/', async (req, res) => {
    try {
        const sql = 'SELECT * FROM users';
        const [rows] = await db.query(sql);
        res.status(200).json(rows);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// ✅ Get user by ID
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const sql = 'SELECT * FROM users WHERE id = ?';
        const [rows] = await db.query(sql, [id]);

        if (rows.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(rows[0]);
    } catch (error) {
        console.error('Error fetching user by ID:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// ✅ Update user by ID
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email } = req.body;
        const sql = 'UPDATE users SET name = ?, email = ? WHERE id = ?';
        const [result] = await db.query(sql, [name, email, id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'User updated successfully' });
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// ✅ Delete user by ID
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const sql = 'DELETE FROM users WHERE id = ?';
        const [result] = await db.query(sql, [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;