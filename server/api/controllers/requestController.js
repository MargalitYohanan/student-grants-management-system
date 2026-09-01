import Request from "../models/request.js";
import User from "../models/user.js";

export const createRequest = async (req, res) => {

    try {
        const { personalDetails, familyDetails, studyDetails, bankDetails } = req.body;

        const newRequest = new Request({
            userRef: req.user.userId,
            personalDetails,
            familyDetails,
            studyDetails,
            bankDetails
        })

        await newRequest.save();

        await User.findByIdAndUpdate(
            req.user.userId,
            {
                lastRequestRef: newRequest._id
            }
        );

        res.status(201).json({
            message: 'בקשת המענק נקלטה בהצלחה ועברה לסטטוס המתנה',
            requestId: newRequest._id
        });

    } catch (error) {
        res.status(500).json({
            message: 'שגיאה בהגשת בקשת מענק',
            error: error.message
        })
    }

}

export const getMyStatus = async (req, res) => {

    try {
        //מקבל את היוזר לפי מה שנשלח לו בראש הבקשה ולפי הטוקן
        const user = await User.findById(req.user.userId).populate('lastRequestRef')

        if (!user.lastRequestRef) {
            return res.status(404).json({
                message: 'לא נמצאה בקשה עבור המשתמש'
            });
        }

        //במסד נשמר רק כתובת הבקשה האחרונה
        //נחפש אותה בתוך כל הבקשות לפי הכתובת השמורה
        // const request = await Request.findById(
        //     user.lastRequestRef
        // );
        const request = user.lastRequestRef

        res.status(200).json({
            requestId: request._id,
            status: request.status
        });

    } catch (error) {
        res.status(500).json({
            message: 'שגיאה בקבלת סטטוס הבקשה',
            error: error.message
        });
    }
}

export const updateRequestStatus = async (req, res) => {

    try {
        const { id } = req.params;
        const { status } = req.body;

        if (status != 'אושר' && status != 'נדחה')
            return res.status(400).json({
                message: 'סטטוס לא תקין'
            });

        const request = await Request.findById(id);

        if (!request)
            return res.status(404).json({
                message: 'בקשה לא נמצאה'
            });

        if (request.status !== 'בהמתנה')
            return res.status(400).json({
                message: 'אין אפשרות לשנות סטטוס!'
            })

        request.status = status;
        await request.save();

        res.status(200).json({
            message: `סטטוס הבקשה עודכן בהצלחה ל-${status}`,
            request
        });


    } catch (error) {
        res.status(500).json({
            message: 'שגיאה בעדכון סטטוס הבקשה',
            error: error.message
        });
    }
}

export const getRequests = async (req, res) => {

    try {
        const { city, minTuition, maxTuition, minSiblings, maxSiblings, fromDate, toDate, userId } = req.query;

        const filter = {
            status: { $ne: 'אושר' }
        };

        if (city) {
            filter['personalDetails.city'] = city;
        }

        if (minTuition || maxTuition) {
            filter['studyDetails.annualTuition'] = {};
            if (minTuition) {
                filter['studyDetails.annualTuition'].$gte =
                    Number(minTuition);
            }
            if (maxTuition) {
                filter['studyDetails.annualTuition'].$lte =
                    Number(maxTuition);
            }
        }

        if (minSiblings || maxSiblings) {
            filter['familyDetails.siblingsUnder18'] = {};
            if (minSiblings) {
                filter['familyDetails.siblingsUnder18'].$gte =
                    Number(minSiblings);
            }
            if (maxSiblings) {
                filter['familyDetails.siblingsUnder18'].$lte =
                    Number(maxSiblings);
            }
        }

        if (fromDate || toDate) {
            filter.createdAt = {};
            if (fromDate) {
                filter['createdAt'].$gte = new Date(fromDate);
            }
            if (toDate) {
                filter['createdAt'].$lte = new Date(toDate);
            }
        }

        if (userId) {
            const user = await User.findOne({ userId });
            if (!user) {
                return res.status(200).json({ message: 'לא קיים כזה משתמש' });
            }
            filter.userRef = user._id;
        }

        //populate - מביא את האוביקט הכולל את השדות...
        //#C ב Include דומה מאוד ל 
        const requests = await Request.find(filter)
            .populate('userRef', 'userId firstName lastName')

        const result = requests.map(request => ({
            requestId: request._id,
            userId: request.userRef.userId,
            firstName: request.userRef.firstName,
            lastName: request.userRef.lastName,
            major: request.studyDetails.major,
            status: request.status
        }));

        res.status(200).json(result);

    } catch (error) {
        res.status(500).json({
            message: 'שגיאה בקבלת הבקשות',
            error: error.message
        });
    }
}

export const getRequestDetails = async (req, res) => {
    try {
        const request = await Request.findById(req.params.id)
            .populate('userRef', 'userId firstName lastName');

        if (!request)
            return res.status(404).json({ message: 'הבקשה לא נמצאה במערכת' })

        res.status(200).json(request)
    } catch (error) {
        res.status(500).json({message: 'שגיאה בשליפת הבקשה', error: error.message })
    }
}