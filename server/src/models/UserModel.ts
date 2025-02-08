import mongoose from 'mongoose';
 // Adjust the path as necessary

 const UserSchema = new mongoose.Schema({
    _id: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: false
    },
    lastName: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    imageUrl: {
        type: String,
        required: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    tests: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Test'
        }
    ],
    questionSets: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'QuestionSet'
        }
    ],
    activeTests: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Test'
        }
    ]
});
const User = mongoose.model('User', UserSchema);
export default User;
//user_2sAm6CcfEl4hwbTn7BJIwqg8a6x

