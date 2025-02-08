// import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useTestConfig } from "../context/TestConfigContext";

function TestOptionForm() {

    // const [formData, setFormData] = useState({
    //     name: '',
    //     email: '',
    //     question: ''
    // });
    // const [startDate, setStartDate] = useState<Date | undefined>(undefined);
    // const [endDate, setEndDate] = useState<Date | undefined>(undefined);
    // const [proctureOption, setProctureOption] = useState('');
    const { testConfig, setTestConfig } = useTestConfig();
    const {testSettings: { startDate, endDate, proctureOption}} = testConfig;

    const handleStartDate = (date) => {
        // setStartDate(date);
        setTestConfig(cur => {
            return {
                ...cur,
                testSettings: {
                    ...cur.testSettings,
                    startDate: date,
                }
            }
        })
    }

    const handleEndDate = (date) => {
        // setEndDate(date);
        setTestConfig(cur => {
            return {
                ...cur,
                testSettings: {
                    ...cur.testSettings,
                    endDate: date,
                }
            }
        })
    }

    const handleProctureOption = (e) => {
        // setProctureOption(e.target.value)
        setTestConfig(cur => {
            return {
                ...cur,
                testSettings: {
                    ...cur.testSettings,
                    proctureOption: e.target.value,
                }
            }
        })
    }
    // console.log(testConfig);
    
    
    // Handle input changes
    // const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    //     const { name, value } = e.target;
    //     setFormData(prevData => ({
    //         ...prevData,
    //         [name]: value
    //     }));
    // };

    // Handle form submission
    // const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    //     e.preventDefault();
    //     // You can now use formData to send to an API or process it
    //     console.log('Form Data Submitted:', formData);
    // };

    return (
        <div>
            <h2 className="text-[1.7rem] font-semibold mb-4">
                Test settings
            </h2>
            <div className="text-xl space-y-4" >
                {/* <form onSubmit={handleSubmit}> */}
                <div className="flex gap-2 relative w-[90%] ">
                    <label className=" w-[35%]">Start Time</label>
                    <DatePicker
                        className="border rounded-md w-[400px] px-2 py-1"
                        showTimeSelect
                        selected={startDate}
                        onChange={handleStartDate}
                        timeFormat="HH:mm"
                        dateFormat="MMMM d, yyyy h:mm aa"
                        timeCaption="Time"
                        placeholderText="Select test start date and time"
                    />
                </div>
                <div className="flex gap-2 relative w-[90%]">
                    <label className="w-[35%]">End Time</label>
                    <DatePicker
                        className="border rounded-md w-[400px] px-2 py-1"
                        showTimeSelect
                        selected={endDate}
                        onChange={handleEndDate}
                        timeFormat="HH:mm"
                        dateFormat="MMMM d, yyyy h:mm aa"
                        timeCaption="Time"
                        placeholderText="Select test end date and time"
                    />
                </div>
                <div className="flex gap-2 w-[90%]">
                    <label className="w-[35%]">Level of Procturing</label>
                    <select
                        name="procture-level"
                        id="procture-level"
                        className="border rounded-md w-[400px] px-2 py-1 cursor-pointer"
                        value={proctureOption}
                        onChange={handleProctureOption}
                    >
                        <option value="" disabled hidden>
                            Select level of procturing
                        </option>
                        <option value="level-1">Tab switch, copy paste, full screen</option>
                        <option value="level-2">face recognition, object detection</option>
                    </select>
                </div>
                {/* <div>
                    <label>
                        Name:
                        <input
                            type="text"
                            name="name"
                        value={formData.name}
                        onChange={handleChange}
                        />
                    </label>
                </div> */}

                {/* <button className="border px-3 py-1" type="submit">Submit</button> */}
            </div>
        </div>
    );
}

export default TestOptionForm;
