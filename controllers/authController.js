const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models/User');

exports.register = async (req, res) => {
    try {
        const { username, password, email } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ username, password: hashedPassword, email });
        res.status(201).json(user);
    } catch (err) {
        res.status(500).json({ error: 'Error registering user.' });
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
