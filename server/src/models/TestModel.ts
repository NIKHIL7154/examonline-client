import mongoose, { Document, Query } from "mongoose";

function normalizeDate(date: Date): Date {
    const normalizedDate = new Date(date);
    normalizedDate.setSeconds(0);
    normalizedDate.setMilliseconds(0);
    return normalizedDate;
}


// ADD DURATION
interface TestType extends Document {
    name: string;
    questionSet: mongoose.Types.ObjectId[];
    status: string;
    createdAt: Date;
    startAt: Date;
    durationInSec: Number;
    endAt: Date;
    proctoring: boolean;
    tabSwitchLimit: number;
    resumable: boolean;
    user: string;
    participants: mongoose.Types.ObjectId[];
    linksForwarded: string;
    // participants: mongoose.Types.ObjectId;
}

const TestSchema = new mongoose.Schema<TestType>({
    // connect with user id
    name: {
        type: String,
        required: [true, "A test must have a name"],
        // unique: true,
    },
    questionSet: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "QuestionSet",
        required: [true, "A test must have question set"],
    }],
    status: {
        type: String,
        default: "pending",
        // required: true,
        enum: {
            values: ["pending", "active", "completed"],
            message: "Status is either: pending, active or completed",
        },
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
    startAt: {
        type: Date,
        required: [true, "A test must have a start time"],
        validate: [
            {
                validator: function (value: Date): boolean {
                    return value >= new Date();
                },
                message: "startAt cannot be a historical date.",
            },
            {
                validator: function (value: Date) {
                    return value.getMinutes() % 5 === 0;
                },
                message: "Minutes must be a multiple of 5.",
            },
        ],
        set: function (value: Date) {
            // Normalize the date before saving
            return normalizeDate(value);
        }
    },
    durationInSec: {
        type: Number,
        required: [true, "A test must have duration"],
        validate: {
            validator: function (value) {
                const durationInSeconds = (this.endAt.getTime() - this.startAt.getTime()) / 1000;
                return value <= Math.floor(durationInSeconds);
            }
        },
    },
    endAt: {
        type: Date,
        required: [true, "A test must have an end time"],
        validate: [
            {
                validator: function (value: Date): boolean {
                    return value > this.startAt;
                },
                message: "endAt must be after startAt.",
            },
            {
                validator: function (value: Date) {
                    return value.getMinutes() % 5 === 0;
                },
                message: "Minutes must be a multiple of 5.",
            },
        ],
        set: function (value: Date) {
            // Normalize the date before saving
            return normalizeDate(value);
        },
    },
    proctoring: {
        type: Boolean,
        required: true,
    },
    tabSwitchLimit: {
        type: Number,
        required: true,
        default: 1,
        min: [0, "tabSwitchLimit can be atleast 0"],
        max: [5, "tabSwitchLimit can be atmax 5"],
    },
    resumable: {
        type: Boolean,
        required: true
    },
    user: {
        type: String,
        ref: "User",
        required: [true, "A Test must have a user(creator)"],
    },
    // participants: [{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "Participants", 
    // }],
    linksForwarded: {
        type: String,
        default: "pending",
        required: true,
        enum: {
            values: ["pending", "forwarded"],
            message: "Status is either: pending or forwarded",
        }, 
    },
    participants: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Participant",
        required: [true, "A test must have participants"],
    }],

    // work on this later
    // trackUserData: {
    //     type: Boolean,
    //     required: true
    // }
});

TestSchema.pre<Query<any, TestType>>(/^find/, function (next) {
    this.select('-__v');
    next();
});

export const Test = mongoose.model<TestType>('Test', TestSchema);
