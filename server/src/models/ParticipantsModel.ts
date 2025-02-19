import mongoose, { Document } from "mongoose";

interface ParticipantInfoType {
    name: string;
    email: string;
}

interface ParticipantsType extends Document {
    listName: String;
    list: ParticipantInfoType[];
    user: string;
    // relTests: mongoose.Types.ObjectId[];
}

// const ParticipantsSchema = new Schema<ParticipantsType>({
const participantsScheme = new mongoose.Schema<ParticipantsType>({
    listName: {
        type: String,
        required: [true, "The list must have a name"],
        unique: true,
    },
    list: {
        type: [
            {
                name: {
                    type: String,
                    required: true,
                },
                email: {
                    type: String,
                    required: true,
                    match: /.+\@.+\..+/
                }
            }
        ],
        required: true,
    },
    user: {
        type: String,
        ref: "User",
        required: [true, "A Test must have a user(creator)"],
    },
    // relTests: [{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "Test", // Reference to the Test model
    // }],
});

export const Participants = mongoose.model<ParticipantsType>("Participant", participantsScheme);