import mongoose from "mongoose";

interface gradePercent {
    "below40%": number,
    "below80%": number,
    "below90%": number,
    "below100%": number,
}
interface submissions {
    timeout: number,
    inactive: number,
    userSubmission: number,
}

interface incidentsType {
    tabSwitchRate: number,
    mobileDetectionRate: number | string,
    anotherPersonRate: Number | string,
}

export interface AnalyticsType extends Document {
    attendance: number;
    performance: gradePercent;
    totalMarks: number;
    totalQuestions: number;
    submissionType: submissions;
    overallAttemptRate: number;
    overallAttemptAccuracy: number;
    averageScore: number;
    technicalIssueRate: number;
    incidents: incidentsType;
    user: string;
}


const AnalyticsSchema = new mongoose.Schema<AnalyticsType>({
    attendance: {
        type: Number,
        default: 0,
    },
    performance: {
        type: {
            "below40%": Number,
            "below80%": Number,
            "below90%": Number,
            "below100%": Number,
        },
        default: {
            "below40%": 0,
            "below80%": 0,
            "below90%": 0,
            "below100%": 0,
        }
    },
    totalMarks: {
        type: Number,
        default: 0,
    },
    totalQuestions: {
        type: Number,
        default: 0,
    },
    submissionType: {
        type: {
            timeout: Number,
            inactive: Number,
            userSubmission: Number,
        },
        default: {
            timeout: 0,
            inactive: 0,
            userSubmission: 0,
        },
    },
    overallAttemptRate: {
        type: Number,
        default: 0,
    },
    overallAttemptAccuracy: {
        type: Number,
        default: 0,
    },
    averageScore: {
        type: Number,
        default: 0,
    },
    technicalIssueRate: {
        type: Number,
        default: 0,
    },
    incidents: {
        type: {
            tabSwitchRate: Number,
            mobileDetectionRate: Number || String,
            anotherPersonRate: Number || String,
        }
    },
    user: {
        type: String,
        ref: "User",
        required: [true, "A Test must have a user(creator)"],
    },
});


export const Analytics = mongoose.model<AnalyticsType>('Test', AnalyticsSchema);
