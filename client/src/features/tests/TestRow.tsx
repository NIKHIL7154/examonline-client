import { format } from "date-fns";
import { HiExternalLink, HiOutlineCalendar, HiOutlineClock, HiOutlineTrash, HiOutlineUsers } from "react-icons/hi";
import Tag from "../../ui/Tag";
import Row from "../../ui/Row";
import Menus from "../../ui/Menus";
import { MdOutlineRocketLaunch } from "react-icons/md";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import ConfirmActivate from "../../ui/ConfirmActivate";
import { useNavigate } from "react-router";
import { useDeleteTest } from "./useDeleteTest";
import { useAuth } from "@clerk/clerk-react";
import useActivateTest from "./useActivateTest";

export interface TestAll {
    _id: string;
    name: string;
    createdAt: Date;
    durationInSec: number;
    totalParticipants: number;
    totalQuestions: number;
    status: "pending" | "active" | "completed";
}

function TestFeature({ children }: { children: React.ReactNode }) {
    return (
        <p className="flex gap-2 items-center text-gray-500 hover:text-emerald-500 cursor-pointer transition-all duration-200">
            {children}
        </p>
    )
}

function TestRow({ testItem }: { testItem: TestAll }) {
    const { _id: testId, name, createdAt, durationInSec: duration, status, totalParticipants } = testItem;
    const navigate = useNavigate();
    const { getToken } = useAuth();
    const { isDeleting, deleteTest } = useDeleteTest(getToken);
    const {isSending, activateTest} = useActivateTest(getToken);

    // const {participants} = testItem;
    return (
        <div className="py-5 px-6 border-b border-gray-200 last:border-b-0 space-y-4">
            <Row type="horizontal">
                <div className="flex items-center gap-4">
                    <h2 className="font-medium text-xl first-letter:uppercase">{name}</h2>
                    <Tag type={status} />
                </div>

                <Modal>
                    <Menus.Menu>
                        <Menus.Toggle id={testId} />
                        <Menus.List id={testId}>
                            <Menus.Button icon={<HiExternalLink />} onClick={() => navigate(`${testId}`)}>
                                Open </Menus.Button>

                            {status === "pending" && <Modal.Open opens="activateTest">
                                <Menus.Button icon={<MdOutlineRocketLaunch />}>
                                    Activate Test </Menus.Button></Modal.Open>
                            }
                            {status !== "active" && <Modal.Open opens="deleteTest">
                                <Menus.Button icon={<HiOutlineTrash />}>
                                    Delete </Menus.Button></Modal.Open>
                            }
                        </Menus.List>
                    </Menus.Menu>
                    <Modal.Window name="deleteTest">
                        <ConfirmDelete
                            resourceName="test"
                            disabled={isDeleting}
                            onConfirm={() => deleteTest(testId)}
                        />
                    </Modal.Window>
                    <Modal.Window name="activateTest">
                        <ConfirmActivate
                            resourceName="test"
                            disabled={isSending}
                            onConfirm={() => activateTest(testId)}
                        />
                    </Modal.Window>
                </Modal>
            </Row>

            <div className="flex gap-5">
                <TestFeature>
                    <HiOutlineClock className="text-lg" />
                    <span className=" text-md font-medium">{Math.floor(duration / 60)} mins</span>
                </TestFeature>
                <TestFeature>
                    <HiOutlineUsers className="text-lg  " />
                    {/* <span className=" text-md font-medium">Update Server Logic participants route</span> */}
                    <span className=" text-md font-medium">{totalParticipants} participants</span>
                </TestFeature>
                <TestFeature>
                    <HiOutlineCalendar className="text-lg " />
                    <span className=" text-md font-medium">Created {format(createdAt, 'MMM dd, yyyy')}</span>
                </TestFeature>
            </div>
        </div>
    );
}

export default TestRow;
