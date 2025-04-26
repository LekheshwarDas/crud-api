const express = require('express');
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes.js');
const cors = require('cors');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());
app.use('/api/users', userRoutes);
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/users.html");
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});