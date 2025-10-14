const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// Routes
const authRoutes = require('./routes/authRoutes');
const folderRoutes = require('./routes/folderRoutes');
const noteRoutes = require('./routes/noteRoutes');
const nodeRoutes = require('./routes/nodeRoutes');

const fileRoutes = require('./routes/fileRoutes');
app.use('/api/files', fileRoutes);
app.use('/uploads', express.static('uploads'));


app.use('/api/auth', authRoutes);
app.use('/api/folders', folderRoutes);
app.use('/api/notes', noteRoutes);
app.use('/api/nodes', nodeRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


