const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const cors = require('cors');

const authRoutes = require('./routes/auth');
const searchRoutes = require('./routes/search');
const registerRoutes = require('./routes/register');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
  secret: 'rent-secret',
  resave: false,
  saveUninitialized: true
}));

app.use('/api/auth', authRoutes);
app.use('/api/search', searchRoutes);
app.use('/api/register', registerRoutes);

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
