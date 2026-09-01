import mongoose from "mongoose";
const requestSchema = new mongoose.Schema({

    userRef: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    // isDraft: {
    //     type: Boolean,
    //     default: false
    // },
    status: {
        type: String,
        enum: ['בהמתנה', 'אושר', 'נדחה'],
        default: 'בהמתנה'
    },
    personalDetails: {
        birthDate: {
            type: Date,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        address: {
            type: String,
            required: true
        },
        mobilePhone: {
            type: String,
            required: true
        },
        homePhone: {
            type: String
        }
    },
    familyDetails: {

        father: {
            id: { type: String, required: true },
            firstName: { type: String, required: true },
            lastName: { type: String, required: true }
        },
        mother: {
            id: { type: String, required: true },
            firstName: { type: String, required: true },
            lastName: { type: String, required: true }
        },
        siblingsUnder18: {
            type: Number,
            required: true,
            min: 0
        },
        siblingsOver21WithMoreThanOneChild: {
            type: Number,
            required: true,
            min: 0
        }
    },
    studyDetails: {
        major: {
            type: String,
            required: true,
            enum: ['מדעי המחשב', 'הנדסה', 'כלכלה', 'פסיכולוגיה']
        },
        schoolName: {
            type: String,
            required: true
        },
        yearsOfStudy: {
            type: Number,
            required: true,
            min: 1
        },
        //שכר לימוד שנתי
        annualTuition: {
            type: Number,
            required: true,
            min: 0
        }
    },
    bankDetails: {
        ownerId: {
            type: String,
            required: true
        },
        bankName: {
            type: String,
            required: true,
            enum: ['לאומי', 'הפועלים', 'מזרחי טפחות', 'דיסקונט', 'בינלאומי']
        },
        branchNumber: {
            type: String,
            required: true
        },
        accountNumber: {
            type: String,
            required: true
        }
    },
    // documents: {
    //     studentIdFile: String,
    //     fatherIdFile: String,
    //     motherIdFile: String,
    //     studyApprovalFile: String,
    //     bankApprovalFile: String
    // },

},
    {
        timestamps: true
    }
)

const Request = mongoose.model('Request', requestSchema)
export default Request;