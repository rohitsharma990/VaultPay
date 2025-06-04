const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const cors = require('cors');
const app = express();
const connectDB = require('./db/db.js');
const cookieParser = require('cookie-parser');
const userRoutes = require('./routes/userRoutes.js');

connectDB();

app.use(cors({
    origin: ['http://localhost:5173'],
  credentials: true
}));

app.use('/qrcodes', express.static('qrcodes'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.use('/api/v1/users', userRoutes);



const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
 console.log(`Server is running on http://localhost:${PORT}`);
 });


