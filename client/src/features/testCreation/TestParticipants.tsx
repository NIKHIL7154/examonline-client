import { useEffect, useRef, useState } from "react";
import { FiUpload } from "react-icons/fi";
import { GrDocumentDownload } from "react-icons/gr";

import { IoCheckmarkDoneCircle } from "react-icons/io5";
import { RiFileList3Line } from "react-icons/ri";
import toast from "react-hot-toast";
import * as xlsx from "xlsx";

import { useAuth } from "@clerk/clerk-react";
import { useTestDetails } from "./TestDetailsContext";
import useCreateParticipants from "./useCreateParticipants";
import useParticipants from "./useParticipants";
import LoaderNew from "../../ui/LoaderNew";

type ParticipantList = {
    listName: string;
    _id: string;
}

function TestParticipants() {
    const { testDetails, setTestDetails } = useTestDetails();
    const [createdParticipants, setcreatedParticipants] = useState<ParticipantList[]>([]);

    const [SelectedFile, setSelectedFile] = useState<File | undefined>(undefined);
    const [listName, setlistName] = useState("");
    const { participants: testParticipants } = testDetails;
    const { getToken } = useAuth();
    const {  createParticipants } = useCreateParticipants(getToken);
    const { isLoading, participants } = useParticipants(getToken);
    const inputRef = useRef<HTMLInputElement | null>(null);

    const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
    };
    useEffect(() => {
        if (participants) {
            console.log(participants);
            setcreatedParticipants(participants.data.lists);
        }
        return () => {

        };
    }, [participants]);
    useEffect(() => {
        if (testParticipants?.length === 0) {
            return;
        }
        const sortedParticipants = [...createdParticipants].sort((a, b) => {
            const aInTest = testParticipants?.includes(a._id) ? -1 : 1;
            const bInTest = testParticipants?.includes(b._id) ? -1 : 1;
            if (aInTest === bInTest) {
                return a.listName.localeCompare(b.listName);
            }
            return aInTest - bInTest;
        });
        console.log(sortedParticipants);
        setcreatedParticipants(sortedParticipants);
        return () => {

        };
    }, [testParticipants]);

    const validateFile = (file: File) => {
        const allowedTypes = ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'];
        if (allowedTypes.includes(file.type)) {
            return true
        } else {
            toast.error('Please upload a .xlsx file with correct format');

            return false;
        }
    };

    const handleListUpload = () => {
        if (!listName) {
            toast.error('Please enter a name for the list');
            return;
        }
        toast.loading('Uploading participants list...');

        const reader = new FileReader();

        reader.onload = async (e) => {
            const data = e.target?.result;
            if (data) {
                // Read the array buffer
                const workbook = xlsx.read(data, { type: "array" });
                const sheetName = workbook.SheetNames[0]; // Get the first sheet
                const sheet = workbook.Sheets[sheetName]; // Get sheet data
                const json = xlsx.utils.sheet_to_json(sheet); // Convert sheet to JSON
                const list = json.map((q: any) => {
                    return {
                        name: q.name,
                        email: q.email,
                    }
                });
                console.log(list);


                createParticipants({ listName, list }, {
                    onError: (err) => {
                        toast.remove();
                        toast.error(err.message);
                    }
                });


                // Update state
            }
        };

        reader.readAsArrayBuffer(SelectedFile as File);
    }

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        const droppedFiles = e.dataTransfer.files;
        if (droppedFiles.length > 0 && validateFile(droppedFiles[0])) {
            setSelectedFile(droppedFiles[0]);
        } else {
            toast.error('Please upload a .xlsx file with correct format');
            setSelectedFile(undefined);
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile && validateFile(selectedFile)) {
            setSelectedFile(selectedFile);
        } else {
            setSelectedFile(undefined);
        }
    };

    const handleDownload = () => {
        const anchor = document.createElement('a');
        anchor.href = '/files/testParticipants.xlsx';
        anchor.download = 'test-participants.xlsx';
        document.body.appendChild(anchor);
        anchor.click();
        document.body.removeChild(anchor);
        return;
    }

    const handleListAlteration = (id: string) => {
        const isAdded = testParticipants?.includes(id);
        if (isAdded) {
            setTestDetails(cur => {
                return {
                    ...cur,
                    participants: cur.participants?.filter((participantId) => participantId !== id)
                }
            })
        } else {
            setTestDetails(cur => {
                return {
                    ...cur,
                    participants: [...cur.participants as string[], id]
                }
            })
        }
    }
    return (
        <div className="p-8">
            <h2 className="text-[1.7rem] font-semibold mb-4">
                Add Participants
            </h2>

            <div className="flex gap-8 items-center mb-8">
                <h3 className="text-xl">
                    Select Participants list from previously created list or create a new list using template file:
                </h3>
                <button onClick={handleDownload} className="group hover:border-green-500 hover:bg-green-500 text-xl border-2 border-gray-500 px-3 py-2 rounded-md flex items-center gap-2">
                    <GrDocumentDownload className="group-hover:text-white" />
                    <span className="group-hover:text-white">test-participants.xlsx</span>
                </button>
            </div>

            <div className="flex gap-8">
                {/* Participants List Section */}
                <div className="w-1/2  h-[350px] p-4 border-2 border-slate-300 rounded-lg overflow-y-auto">
                    <div className="flex w-full  justify-between items-center mb-4">
                        <p className="text-xl font-semibold ">Select Participants List</p>
                        <p className="text-gray-400 text-sm">You can select multiple lists</p>
                    </div>

                    {isLoading && <div className="flexed mt-16 w-full"><LoaderNew /></div>}
                    {createdParticipants.length > 0 ? (
                        <ul>
                            {/* Assuming testParticipants is an array of participant objects */}
                            {createdParticipants.map((participant, index) => (
                                <li key={index} className={`mb-2 cursor-pointer  px-4 text-xl flex justify-between items-center h-12 border border-gray-300 rounded-lg ${testParticipants?.includes(participant._id) ? 'bg-green-100' : 'bg-white'}`}
                                    onClick={() => {
                                        handleListAlteration(participant._id)
                                    }}
                                >
                                    <div>

                                        <RiFileList3Line className="inline-block mr-2 mb-1" />

                                        <span>{participant.listName}</span></div>

                                    {testParticipants?.includes(participant._id) && <IoCheckmarkDoneCircle className="text-green-600 text-2xl rounded-full" />}
                                </li>
                            ))}
                        </ul>
                    ) : (isLoading ? <></> : <p>No participants found. Please add a participants list using above template.</p>)
                    }
                </div>

                {/* Add Participants Section */}
                <div className="w-1/2 p-4 border-2 border-slate-300 rounded-lg">
                    <div className="text-xl font-semibold mb-4  flex justify-between"><h4>Add Participants to Select</h4>

                    </div>
                    <div
                        className="w-full rounded-lg  gap-[0] h-[250px] p-4 border-2 border-dashed border-slate-300 hover:border-lime-700 flex justify-center items-center flex-col text-center"
                        onDragEnter={handleDrag}
                        onDragLeave={handleDrag}
                        onDragOver={handleDrag}
                        onDrop={handleDrop}
                    >
                        <input
                            type="file"
                            ref={inputRef}
                            onChange={handleFileChange}
                            style={{ display: 'none' }}
                            accept=".xlsx"
                        />

                        {SelectedFile ? (
                            <div className='flex flex-col gap-2'>
                                <h3>Selected file: <strong className='font-semibold'>{SelectedFile.name} </strong></h3>
                                <input type="text" onChange={(e) => setlistName(e.target.value)} placeholder="Enter the name for list" className="border-2 p-2 rounded-lg" />
                                <button onClick={handleListUpload} className="p-2 px-3 bg-green-500 text-white rounded-lg !text-sm">Upload File</button>
                                <button className="text-green-600 font-semibold hover:text-lime-500"
                                    onClick={() => inputRef.current?.click()}>Choose another</button>
                            </div>
                        ) : (
                            <>
                                <FiUpload className="text-gray-500 text-5xl mb-3" />
                                <span className="text-lg">Drag and drop updated test-participants.xlsx <br /> or</span>
                                <button className="text-green-600 font-semibold hover:text-lime-500 text-lg"
                                    onClick={() => inputRef.current?.click()}>Browse for: test-participants.xlsx </button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TestParticipants;
