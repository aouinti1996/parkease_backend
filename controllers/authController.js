const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const  User = require('../models/User');
const jwtSecret = process.env.JWT_SECRET || 'defaultSecretKey';
exports.register = async (req, res) => {
    try {
        const { username, password, email,plate } = req.body;

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create the user
        const user = await User.create({ username, password: hashedPassword, email,plate });

        // Respond with the created user
        res.status(201).json(user);
    } catch (err) {
        console.error('Error registering user:', err); // Log detailed error
        res.status(500).json({ error: 'Error registering user.', details: err.message });
    }
};


exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ where: { username } });
        if (user && (await bcrypt.compare(password, user.password))) {
            const token = jwt.sign({ id: user.id }, 'secretKey', { expiresIn: '1d' });
            res.json({ token });
        } else {
            res.status(401).json({ error: 'Invalid credentials.' });
        }
    } catch (err) {
        res.status(500).json({ error: 'Error logging in.' });
    }
};
