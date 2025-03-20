import { format } from "date-fns";
import { IoDocumentTextOutline } from "react-icons/io5";
import { RiTimerLine } from "react-icons/ri";
import { RiWebcamLine } from "react-icons/ri";
import { VscMultipleWindows } from "react-icons/vsc";
import { MdForwardToInbox } from "react-icons/md";
import { PiNewspaperBold } from "react-icons/pi";
import { MdOutlinePeople } from "react-icons/md";
import React from "react";

interface TestType extends Document {
    _id: string;
    name: string;
    questionSet: string[];
    status: string;
    createdAt: Date;
    startAt: Date;
    durationInSec: number;
    endAt: Date;
    proctoring: boolean;
    tabSwitchLimit: number;
    resumable: boolean;
    user: string;
    participants: string[];
    linksForwarded: string;
    // participants: mongoose.Types.ObjectId;
}
type props = {
    test: TestType,
}
const numberToString: { [key: string]: string } = {
    "0": "Not allowed",
    "1": "once",
    "2": "twice",
    "3": "thrice",
    "4": "four times",
    "5": "five times",
}

function Row({ title, icon, children }: { title: string, icon: React.ReactNode, children: React.ReactNode }) {
    return (
        <div className="flex gap-4">
            <p className="flex items-center gap-2 font-medium">
                {icon}
                {title}
            </p>
            {children}
        </div>
    )
}

function TestDataBox({ test }: props) {
    const { name, startAt, endAt, createdAt, durationInSec, proctoring, tabSwitchLimit, linksForwarded, questionSet, participants } = test;
    const punc = (index: number, arr) => (arr.length - 1 === index) ? "" : ", "
    // console.log(participants);
    // console.log(questionSet);

    return (
        <div className="border rounded-md overflow-hidden poppins-regular">
            <div className="bg-emerald-600 py-5 px-6 flex justify-between">
                <h3 className="text-[1.2rem] text-white flex gap-2 items-center">
                    <IoDocumentTextOutline className="text-3xl" />
                    {name}
                </h3>
                <span className="text-white font-medium text-[1.2rem]">
                    {format(startAt as Date, "MMM dd yyyy, p")} - {format(endAt as Date, "MMM dd yyyy, p")}
                </span>
            </div>

            <div className="px-6 py-5 space-y-5">
                <Row title="Duration" icon={<RiTimerLine className="text-emerald-600 text-xl" />}>
                    <span>{`${Math.floor(durationInSec / 60)} minutes`}</span>
                </Row>
                <Row title="Associated Question Set/s" icon={<PiNewspaperBold className="text-emerald-600 text-xl" />}>
                    <p>
                        {questionSet.map((set, index: number, arr) => {
                            return <React.Fragment key={set._id}>
                                <span className="hover:cursor-pointer hover:underline underline-offset-2 ">
                                    {set.name}
                                </span>
                                {punc(index, arr)}
                            </React.Fragment>
                        })}
                    </p>
                </Row>

                <Row title="Procturing" icon={<RiWebcamLine className="text-emerald-600 text-xl" />}>
                    <span>{proctoring ?
                        "Level 2 (Level 1 + Face Recognition/Object Detection)" :
                        "Level 1 (Full Screen Mode, Restricted: Tab Switch/Copy Paste)"}</span>
                </Row>

                <Row title="Tab Switch Limit" icon={<VscMultipleWindows className="text-emerald-600 text-xl" />}>
                    <span>
                        Allowed <strong className="font-medium">{`${numberToString[tabSwitchLimit + ""]}`}</strong>
                    </span>
                </Row>

                <Row title="Attendees" icon={<MdOutlinePeople className="text-emerald-600 text-xl" />}>
                    <p>
                        {participants.map((participant, index: number, arr) => {
                            return <React.Fragment key={participant._id}>
                                <span className="hover:cursor-pointer hover:underline underline-offset-2 ">
                                    {participant.listName}
                                </span>
                                {punc(index, arr)}
                            </React.Fragment>
                        })}
                    </p>
                </Row>

                <div className=" bg-yellow-100 flex justify-between py-5 px-6 rounded-md text-yellow-700">
                    <p className="flex items-center gap-3 font-medium">
                        <MdForwardToInbox className="text-xl" />
                        Test Link Forwarded?
                    </p>
                    <span className="uppercase font-medium tracking-wide">{linksForwarded}</span>
                </div>
            </div>

            <div className="flex justify-end px-6 pb-2 text-sm text-stone-700 font-medium">
                Created {format(createdAt, "EEE, MMM dd yyyy, p")}
            </div>
        </div>
    );
}

export default TestDataBox;
