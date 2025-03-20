import { format } from "date-fns";
import { IoDocumentTextOutline } from "react-icons/io5";
import { RiTimerLine } from "react-icons/ri";
import { RiWebcamLine } from "react-icons/ri";
import { VscMultipleWindows } from "react-icons/vsc";
import { MdForwardToInbox, MdOutlineRocketLaunch } from "react-icons/md";
import { PiNewspaperBold } from "react-icons/pi";
import { MdOutlinePeople } from "react-icons/md";
import React from "react";
import { useNavigate } from "react-router";
import { FaArrowLeft } from "react-icons/fa";
import { HiOutlineTrash } from "react-icons/hi";

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
                <span className="text-[1.05rem]">{title}</span>
            </p>
            {children}
        </div>
    )
}

function TestDataBox({ test }: props) {
    const navigate = useNavigate();

    const { name, startAt, endAt, createdAt, durationInSec, proctoring, tabSwitchLimit, linksForwarded, questionSet, participants } = test;
    const punc = (index: number, arr) => (arr.length - 1 === index) ? "" : ", "
    // console.log(participants);
    // console.log(questionSet);

    return (
        <div className="space-y-8">

            <div className="border border-gray-200 bg-gray-50 rounded-lg overflow-hidden poppins-regular">
                <div className="bg-emerald-600 px-9 py-6 flex justify-between">
                    <h3 className=" text-gray-50 flex gap-2 items-center">
                        <IoDocumentTextOutline className="text-3xl" />
                        <span className="text-[1.3rem] font-medium">{name}</span>
                    </h3>
                    <span className="text-gray-50 font-medium text-[1.2rem]">
                        {format(startAt as Date, "MMM dd yyyy, p")} &mdash; {format(endAt as Date, "MMM dd yyyy, p")}
                    </span>
                </div>

                <div className="px-9 py-6 space-y-[1.7rem]">
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

                    <div className=" mt-7 bg-yellow-100 flex justify-between py-5 px-8 rounded-lg text-yellow-700 items-center">
                        <p className="flex items-center gap-3 font-medium text-lg">
                            <MdForwardToInbox className="text-2xl" />
                            Test Link Forwarded?
                        </p>
                        <span className="uppercase font-medium tracking-wide">{linksForwarded}</span>
                    </div>
                </div>

                <div className="flex justify-end px-6 mb-3 text-sm text-stone-700 font-medium">
                    Created {format(createdAt, "EEE, MMM dd yyyy, p")}
                </div>
            </div>

            <div className="flex justify-end poppins-regular gap-4">
                {
                    test.status === "pending" &&
                    <button className=" cursor-pointer text-gray-600 group hover:bg-gray-200 px-4 py-3 transition duration-200 flex items-center border border-gray-300 bg-gray-50 rounded-lg gap-2">
                        <MdOutlineRocketLaunch className="text-xl group-hover:text-emerald-600" />
                        Activate Test </button>
                }
                <button className=" cursor-pointer text-gray-600 group hover:bg-gray-200 px-4 py-3 transition duration-200 flex items-center border border-gray-300 bg-gray-50 rounded-lg gap-2">
                    <HiOutlineTrash className="text-xl group-hover:text-red-600" />
                    Delete Test
                </button>
                <button
                    onClick={() => navigate(-1)}
                    className=" h-[50px] cursor-pointer text-gray-600 group hover:bg-gray-200 px-4 py-3 transition duration-200 flex items-center border border-gray-300 bg-gray-50 rounded-lg gap-2"
                >
                    <FaArrowLeft className="text-lg group-hover:text-black" />
                    <span className="text-[0.96rem]">Back</span>
                </button>
            </div>
        </div>
    );
}

export default TestDataBox;
