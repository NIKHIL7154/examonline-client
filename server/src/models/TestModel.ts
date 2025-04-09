import mongoose, { CallbackError, Document, Query } from "mongoose";
import { QuestionSetType } from "./QuestionSetModel";

function normalizeDate(date: Date): Date {
    const normalizedDate = new Date(date);
    normalizedDate.setSeconds(0);
    normalizedDate.setMilliseconds(0);
    return normalizedDate;
}


// ADD DURATION
export interface TestType extends Document {
    name: string;
    // questionSet: mongoose.Types.ObjectId[];
    questionSet: QuestionSetType[];
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

    _id:string;

    analytics: mongoose.Types.ObjectId;

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
            values: ["pending", "active", "completed", "stale"],
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
    analytics: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Analytics",
    }
});

TestSchema.pre<Query<any, TestType>>(/^find/, function (next) {
    this.select('-__v');
    next();
});

// UPDATE TEST THAT ARE STALE (STARTAT > DATE.NOW())
TestSchema.pre('aggregate', async function (next) {
    const options = this.options; // Get the aggregation options
    const isGetAllTests = options.getAllTests === true;  // Check if the custom flag is set

    if (isGetAllTests) {
        // Access the current aggregation pipeline
        const pipeline = this.pipeline();  // Get the pipeline stages

        // Add a stage to check and set the status to "stale" if conditions are met
        pipeline.unshift({
            $set: {
                status: {
                    $cond: {
                        if: { $and: [{ $eq: ["$status", "pending"] }, { $lt: [new Date(), "$startAt"] }] },
                        then: "$status", // If status is "pending" and startAt > Date.now(), keep "pending"
                        else: {
                            // Keep the status unchanged for all other statuses (active, completed, etc.)
                            $cond: {
                                if: { $ne: ["$status", "pending"] }, // If status is not "pending"
                                then: "$status", // No change, keep current status (active, completed, etc.)
                                else: "stale" // This will never hit, as the outer condition already prevents this.
                            }
                        }
                    }
                }
            }
        });

        try {
            // Perform the update operation: set status to "stale" if conditions match
            const result = await Test.updateMany(
                {
                    status: "pending",  // Only target "pending" status tests
                    startAt: { $lt: new Date() }  // Where startAt < current date
                },
                {
                    $set: { status: "stale" }  // Set status to "stale"
                }
            );

            // Log the number of modified documents (for debugging purposes)
            console.log(`${result.modifiedCount} documents updated to stale.`);

            next();  // Proceed with the aggregation
        } catch (err) {
            return next(err as CallbackError);  // If error occurs, pass it to next middleware
        }
    }

    next(); // Continue with the aggregation
});


export const Test = mongoose.model<TestType>('Test', TestSchema);


// TestSchema.pre('aggregate', async function (next) {
//     const options = this.options; // Get the aggregation options
//     const isGetAllTests = options.getAllTests === true;  // Check if the custom flag is set

//     if (isGetAllTests) {
//         // Access the current aggregation pipeline
//         const pipeline = this.pipeline();  // Get the pipeline stages

//         // Check if the pipeline has a $match stage and if it contains a userId filter
//         const matchStage = pipeline.find(stage => stage.$match);
//         if (matchStage && matchStage.$match && matchStage.$match.user) {
//             const userId = matchStage.$match.user; // Extract the userId from the match stage

//             // Add a stage to check and set the status to "stale" if conditions are met for that user
//             pipeline.unshift({
//                 $set: {
//                     status: {
//                         $cond: {
//                             if: { $and: [{ $eq: ["$status", "pending"] }, { $lt: [new Date(), "$startAt"] }] },
//                             then: "$status", // If status is "pending" and startAt > Date.now(), keep "pending"
//                             else: "stale" // Otherwise, set it to "stale"
//                         }
//                     }
//                 }
//             });

//             try {
//                 // Perform the update operation: set status to "stale" for matching userId
//                 const result = await Test.updateMany(
//                     {
//                         user: userId, // Only target the documents for the specific userId
//                         status: "pending",  // Only target "pending" status tests
//                         startAt: { $lt: new Date() }  // Where startAt < current date
//                     },
//                     {
//                         $set: { status: "stale" }  // Set status to "stale"
//                     }
//                 );

//                 // Log the number of modified documents (for debugging purposes)
//                 console.log(`${result.modifiedCount} documents updated to stale for user ${userId}.`);

//                 next();  // Proceed with the aggregation
//             } catch (err) {
//                 return next(err as CallbackError);  // If error occurs, pass it to next middleware
//             }
//         } else {
//             next(); // If no userId is matched in the pipeline, just proceed with the aggregation
//         }
//     } else {
//         next(); // Continue with the aggregation if getAllTests flag is not set
//     }
// });