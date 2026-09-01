import mongoose from "mongoose";
const userSchema = new mongoose.Schema({

    userId: {
        type: String,
        required: true,
        unique: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['student', 'admin'],
        default: 'student'
    },
    lastRequestRef: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Request',
        default: null

    }
})

const User = mongoose.model('User', userSchema);
export default User;