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
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import { useAuth } from "@clerk/clerk-react";
import { useDeleteTest } from "./useDeleteTest";

interface QuestionSet {
    name: string;
    _id: string;
}

interface Participants {
    _id: string;
    listName: string;
}

interface TestType extends Document {
    _id: string;
    name: string;
    questionSet: QuestionSet[];
    status: "pending" | "active" | "completed";
    createdAt: Date;
    startAt: Date;
    durationInSec: number;
    endAt: Date;
    proctoring: boolean;
    tabSwitchLimit: number;
    resumable: boolean;
    user: string;
    participants: Participants[];
    linksForwarded: string;
    // participants: mongoose.Types.ObjectId;
}
type props = {
    test: TestType,
    isStale: boolean,
}
const numberToString: { [key: string]: string } = {
    "0": "Not allowed",
    "1": "once",
    "2": "twice",
    "3": "thrice",
    "4": "four times",
    "5": "five times",
}

function FeatueRow({ title, icon, children }: { title: string, icon: React.ReactNode, children: React.ReactNode }) {
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

function TestDataBox({ test, isStale }: props) {
    const navigate = useNavigate();
    const { getToken } = useAuth();
    const { isDeleting, deleteTest } = useDeleteTest(getToken);

    const { _id: testId, name, status, startAt, endAt, createdAt, durationInSec, proctoring, tabSwitchLimit, linksForwarded, questionSet, participants } = test;
    const punc = (index: number, arr: QuestionSet[] | Participants[]) => (arr.length - 1 === index) ? "" : ", "
    // console.log(participants);
    // console.log(questionSet);

    return (
        <div className="space-y-8">

            <div className="border border-gray-200 bg-gray-50 rounded-lg overflow-hidden poppins-regular">
                <div className={`px-9 py-6 flex justify-between ${isStale ? "bg-gray-400" : "bg-emerald-600"}`}>
                    <h3 className=" text-gray-50 flex gap-2 items-center">
                        <IoDocumentTextOutline className="text-3xl" />
                        <span className="text-[1.3rem] font-medium">{name}</span>
                    </h3>
                    {!isStale &&
                        <span className="text-gray-50 font-medium text-[1.2rem]">
                            {format(startAt as Date, "MMM dd yyyy, p")} &mdash; {format(endAt as Date, "MMM dd yyyy, p")}
                        </span>
                    }
                </div>

                {
                    !isStale ?
                        <div className="px-9 py-6 space-y-[1.7rem]">
                            <FeatueRow title="Duration" icon={<RiTimerLine className="text-emerald-600 text-xl" />}>
                                <span>{`${Math.floor(durationInSec / 60)} minutes`}</span>
                            </FeatueRow>
                            <FeatueRow title="Associated Question Set/s" icon={<PiNewspaperBold className="text-emerald-600 text-xl" />}>
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
                            </FeatueRow>

                            <FeatueRow title="Procturing" icon={<RiWebcamLine className="text-emerald-600 text-xl" />}>
                                <span>{proctoring ?
                                    "Level 2 (Level 1 + Face Recognition/Object Detection)" :
                                    "Level 1 (Full Screen Mode, Restricted: Tab Switch/Copy Paste)"}</span>
                            </FeatueRow>

                            <FeatueRow title="Tab Switch Limit" icon={<VscMultipleWindows className="text-emerald-600 text-xl" />}>
                                <span>
                                    Allowed <strong className="font-medium">{`${numberToString[tabSwitchLimit + ""]}`}</strong>
                                </span>
                            </FeatueRow>

                            <FeatueRow title="Attendees" icon={<MdOutlinePeople className="text-emerald-600 text-xl" />}>
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
                            </FeatueRow>

                            <div className=" mt-7 bg-yellow-100 flex justify-between py-5 px-8 rounded-lg text-yellow-700 items-center">
                                <p className="flex items-center gap-3 font-medium text-lg">
                                    <MdForwardToInbox className="text-2xl" />
                                    Test Link Forwarded?
                                </p>
                                <span className="uppercase font-medium tracking-wide">{linksForwarded}</span>
                            </div>
                        </div>
                        :
                        <div className="h-60 flex">
                            <span className="m-auto text-center text-gray-500 font-medium">Test is now Stale, it was scheduled to start at {format(startAt as Date, "MMM dd yyyy, p")}. <br /> Reason: Test was not activated before the stipulated time {format(startAt as Date, "MMM dd yyyy, p")}.</span>
                        </div>
                }
                <div className="flex justify-end px-6 mb-3 text-sm text-stone-700 font-medium">
                    Created {format(createdAt, "EEE, MMM dd yyyy, p")}
                </div>
            </div>

            <div className="flex justify-end poppins-regular gap-4">
                {
                    status === "pending" &&
                    <button className=" cursor-pointer text-gray-600 group hover:bg-gray-200 px-4 py-3 transition duration-200 flex items-center border border-gray-300 bg-gray-50 rounded-lg gap-2">
                        <MdOutlineRocketLaunch className="text-xl group-hover:text-emerald-600" />
                        Activate Test </button>
                }
                <Modal>
                    {
                        status !== "active" && <Modal.Open opens="deleteTest">
                            <button className=" cursor-pointer text-gray-600 group hover:bg-gray-200 px-4 py-3 transition duration-200 flex items-center border border-gray-300 bg-gray-50 rounded-lg gap-2">
                                <HiOutlineTrash className="text-xl group-hover:text-red-600" />
                                Delete Test
                            </button>
                        </Modal.Open>
                    }
                    <Modal.Window name="deleteTest">
                        <ConfirmDelete
                            resourceName="test"
                            disabled={isDeleting}
                            onConfirm={() => deleteTest(testId, {
                                onSettled: () => navigate(-1),
                            })}
                        />
                    </Modal.Window>
                </Modal>
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