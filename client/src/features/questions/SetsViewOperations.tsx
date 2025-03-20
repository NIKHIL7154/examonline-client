import { HiOutlineCalendar, HiChevronDown, } from "react-icons/hi";
import { TbFilePencil, TbFileUpload, TbFileTextSpark } from "react-icons/tb";

import SortBy from "../../ui/SortBy";
// import { FiEdit3 } from "react-icons/fi";
import { FaSortAlphaDown } from "react-icons/fa";
import Menus from "../../ui/Menus";
import Modal from "../../ui/Modal";
import UploadSet from "./UploadSet";
import { useNavigate } from "react-router";
import { setQuestions } from "../../utils/QuestionSetStore";
import AIButton from "../../ui/AIButton";
import AITemplates from "./AITemplates";

const MenuId = "NYxW2e";
function AddSetMenu(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
    return (
        <button {...props} className="border border-gray-300 focus:outline-none bg-gray-50 h-[38px] hover:bg-gray-100 focus:ring-[0.2rem] focus:ring-gray-300 cursor-pointer text-[0.95rem] rounded-lg flex gap-1 font-normal pl-3 pr-1 items-center">
            <span>Add</span>
            <HiChevronDown className="text-2xl text-gray-500" />
        </button>
    );
}


function SetsViewOperations() {
    const navigate = useNavigate();

    const handleEmptyNavigate = () => {
        setQuestions([])
        // navigate("/app/questions/edit");
        navigate("edit");
    }
    return (
        <div className="flex gap-3">
        <Modal>
                <Modal.Open opens="buildWithAi">
                   <div>
                    <AIButton text="Create with AI"/>
                   </div>
                    

                </Modal.Open>
                <Modal.Window name="buildWithAi">
                    <AITemplates/>
                </Modal.Window>
            </Modal>

            <SortBy
                options={[
                    { value: "createdAt-desc", label: "Date created", icon: <HiOutlineCalendar /> },
                    // { value: "updatedAt-desc", label: "Last updated", icon: <FiEdit3 /> },
                    { value: "name-asc", label: "Alphabetical", icon: <FaSortAlphaDown /> },
                ]}
            />

            <Menus>
                <Modal>

                    <Menus.Menu>
                        <Menus.Toggle id={MenuId} customButton={<AddSetMenu />} />
                        <Menus.List id={MenuId}>
                            <Modal.Open opens="uploadSet">
                                <Menus.Button icon={<TbFileUpload />}> Upload Set</Menus.Button>
                            </Modal.Open>

                            <Menus.Button onClick={handleEmptyNavigate} icon={<TbFilePencil />}> Start from scratch</Menus.Button>
                            
                        </Menus.List>
                    </Menus.Menu>

                    <Modal.Window name="uploadSet">
                        <UploadSet />
                    </Modal.Window>
                    
                </Modal>
            </Menus>

        </div>
    );
}

export default SetsViewOperations;
