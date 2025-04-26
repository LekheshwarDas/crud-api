const express = require('express');
const router = express.Router();
const db = require('../database/db.js');

// create a new user
router.post('/',(req,res)=>{
    const {name, email} = req.body;
    const sql = 'INSERT INTO users (name,email) VALUES (?,?)';
    db.query(sql,[name,email], (err,result)=>{
        if(err){
            console.error('Error inserting user:',err);
            res.status(500).json({error: 'Error inserting user'});
        } else{
            console.log('User inserted:', result);
            res.status(201).json({message: 'User created'});
        }
    })
})

// get all users
router.get('/',(req,res)=>{
    const sql = 'SELECT * FROM users';
    db.query(sql, (err,result)=>{
        if(err){
            console.error('Error feteching users:',err);
            res.status(500).json({error: 'Error fetching users'});
        } else{
            console.log('Users fetched:', result);
            res.status(200).json(result);
        }
    })
})

// get a user by id
router.get('/:id',(req,res)=>{
    const {id} = req.params;
    const sql = 'SELECT * FROM users WHERE id = ?';
    db.query(sql,[id], (err,result)=>{
        if(err){
            console.error('Error fetching user:',err);
            res.status(500).json({error: 'Error fetching user'});
        } else{
            console.log('User fetched:', result);
            res.status(200).json(result[0]);
        }
    })
})

// update a user by id
router.put('/:id',(req,res)=>{
    const {id} = req.params;
    const {name, email} = req.body;
    const sql = 'UPDATE users SET name = ?, email = ? WHERE id = ?';
    db.query(sql,[name,email,id], (err,result)=>{
        if(err){
            console.error('Error updating user:',err);
            res.status(500).json({error: 'Error updating user'});
        } else{
            console.log('User updated:', result);
            res.status(200).json({message: 'User updated'});
        }
    })
})

// delete a user by id
router.delete('/:id',(req,res)=>{
    const {id} = req.params;
    const sql = 'DELETE FROM users WHERE id = ?';
    db.query(sql,[id], (err,result)=>{
        if(err){
            console.error('Error deleting user:',err);
            res.status(500).json({error: 'Error deleting user'});
        } else{
            console.log('User deleted:', result);
            res.status(200).json({message: 'User deleted'});
        }
    })
})

// export the router
module.exports = router;