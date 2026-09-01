import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';


export const register = async (req, res) => {

    try {
        const { userId, firstName, lastName, password } = req.body;
        const existingUser = await User.findOne({ userId })
        if (existingUser)
            return res.status(400).json({ message: ' המשתמש כבר קיים במערכת' })

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            userId,
            firstName,
            lastName,
            password: hashedPassword
        });

        await newUser.save();

        res.status(201).json({
            message: 'המשתמש נוצר בהצלחה'
        });
    } catch (error) {

        res.status(500).json({
            message: 'שגיאת שרת',
            error: error.message
        });
    }
}

export const login = async (req, res) => {
    try {
        const { userId, password } = req.body;
        const existingUser = await User.findOne({ userId })
        if (!existingUser)
            return res.status(400).json({ message: "Incorrect ID or password" })

        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password)
        if (!isPasswordCorrect)
            return res.status(400).json({ message: "Incorrect ID or password" })

        const token = jwt.sign(
            {
                userId: existingUser._id,
                role: existingUser.role
            }, process.env.JWT_SECRET,
            {
                expiresIn: '1d'
            }
        )


        res.status(200).json({
            message: 'התחברת בהצלחה!', token, existingUser:
            {
                userId: existingUser.userId,
                firstName: existingUser.firstName,
                lastName: existingUser.lastName,
                role: existingUser.role
            }
        })


    } catch (error) {
        res.status(500).json({ message: 'שגיאה בתהליך ההתחברות', error: error.message })
    }

}