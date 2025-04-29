const express = require('express');
const router = express.Router();
const db = require('../database/db');

// add new user
router.post('/users', async (req,res) => {
    try {
        const { name, email } = req.body;
        const sql =  'INSERT INTO users (name, email) VALUES (?, ?)';
        const [result] = await db.query(sql, [name, email], (err, result) => {
            if (err) throw err;
            res.status(201).json({
                message: "User create successfully",
                id: result.insertId
            })
        })
    } catch (error) {
        console.error('Error inserting user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }    
})

// get all users
router.get('/users', async (req, res) => {
    try {
        const sql = 'SELECT * FROM users';
        const [rows] = await db.query(sql, (err, rows) => {
            if (err) throw err;
            res.status(200).json(rows);
        })
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
})

// get user by id
router.get('/users/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const sql = 'SELECT * FROM users WHERE id = ?';
        const [rows] = await db.query(sql, [id], (err, rows) => {
            if (err) throw err;
            if (rows.length === 0) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.status(200).json(rows[0]);
        })
    } catch (error) {
        
    }
})

// update user by id
router.put('/users/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email } = req.body;
        const sql = 'UPDATE users SET name = ?, email = ? WHERE id = ?';
        const [result] = await db.query(sql, [name, email, id], (err, result) => {
            if (err) throw err;
            if (result.affectedRows === 0) {
                return res.status(404).json({ message: 'User not found' });
            } else {
                res.status(200).json({ message: "User updated successfully", });
            }
        })
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
})

// delete user by id
router.delete('/users/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const sql = 'DELETE FROM users WHERE id = ?';
        const [result] = await db.query(sql, [id], (err, result) => {
            if (err) throw err;
            if (result.affectedRows === 0) {
                return res.status(404).json({ message: 'User not found' });
            } else {
                res.status(200).json({ message: "User deleted successfully"})
            }
        })
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
})
module.exports = router;