const User = require('../../models/user');
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

const validateUser = [
    body('name')
        .isLength({ min: 3 }).withMessage('Name should contain minimum 3 characters!')
        .isLength({ max: 20 }).withMessage('Name should not be more than 20 characters!'),
    body('phoneNumber')
        .notEmpty().withMessage('Mobile number is required.')
        .isMobilePhone('any').withMessage('Invalid mobile number format.')
]

const handleCreateUser = async (req, res) => {
    try {
        // Validating inputs 
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success: false, message: "Please enter necessary field!", errors: errors.array() });
        }

        const userCount = await User.countDocuments({});
        req.body.priority = userCount;

        const newUser = new User(req.body);
        const user = await newUser.save();
        jwt.sign({ id: user.id }, process.env.JWT_SECRET, (err, token) => {
            if (err) {
                console.error(err);
                return res.status(500).send({ success: false, message: "Oops, something went wrong with server!" });
            }
            res.status(201).send({ success: true, message: 'User created successfully!', token })
        })


    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Oops, something went wrong with server!" });
    }
}

module.exports = { handleCreateUser, validateUser }