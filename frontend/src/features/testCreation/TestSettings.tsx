import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useTestDetails } from "./TestDetailsContext";

function TestSettings() {
    const { testDetails, setTestDetails } = useTestDetails();
    const { testSettings: { startAt, endAt, proctoringLevel, resumeable, duration = 15, tabSwitchLimit } } = testDetails;

    // Local state to track form values before validation
    const [localStartAt, setLocalStartAt] = useState(startAt);
    const [localEndAt, setLocalEndAt] = useState(endAt);
    const [localDuration, setLocalDuration] = useState(duration);

    // Error states
    const [startTimeError, setStartTimeError] = useState("");
    const [endTimeError, setEndTimeError] = useState("");
    const [durationError, setDurationError] = useState("");

    // Initialize local state from context on component mount
    useEffect(() => {
        setLocalStartAt(startAt);
        setLocalEndAt(endAt);
        setLocalDuration(duration);
    }, []);







    // Calculate minimum end date
    const getMinEndDate = () => {
        if (!localStartAt) return new Date();

        const minEndTime = new Date(localStartAt.getTime());
        minEndTime.setMinutes(minEndTime.getMinutes() + 15);
        return minEndTime;
    };

    // Calculate minimum end time (15 minutes after start time)
    const getMinEndTime = () => {
        if (!localStartAt) return new Date();

        if (!localEndAt) {
            const time = new Date(localStartAt.getTime());
            time.setMinutes(time.getMinutes() + 15);
            return time;
        } else if (localEndAt.getDay() === localStartAt.getDay()) {
            const time = new Date(localStartAt.getTime());
            time.setMinutes(time.getMinutes() + 15);
            return time;
        } else {
            const time = new Date(localStartAt.getTime());
            time.setHours(0, 0, 0, 0);
            return time;
        }
    }
    useEffect(() => {
        if(localStartAt && localEndAt){
            setDurationError("");
            setLocalDuration(15)
        }
    }, [localEndAt, localStartAt]);

    const handleStartAt = (date: Date | null) => {
        setLocalEndAt(null)
        console.log(date)
        if (date && date > new Date()) {
            setLocalStartAt(date);
            setStartTimeError("");
            setTestDetails(cur => ({
                ...cur,
                testSettings: {
                    ...cur.testSettings,
                    startAt: date,
                }
            }));
        } else {
            setLocalStartAt(null);
            setLocalEndAt(null);
            setStartTimeError("Start time should be greater than current time")
            setTestDetails(cur => ({
                ...cur,
                testSettings: {
                    ...cur.testSettings,
                    startAt: null,
                    endAt: null
                }
            }));

        }
    };

   
    

    const handleEndAt = (date: Date | null) => {
        setLocalEndAt(date)
        if (date && localStartAt && date >= localStartAt ){
            setEndTimeError("");
            setTestDetails(cur => ({
                ...cur,
                testSettings: {
                    ...cur.testSettings,
                    endAt: date,
                }
            }));

        } else {
            setTestDetails(cur => ({
                ...cur,
                testSettings: {
                    ...cur.testSettings,
                    endAt: null,
                }
            }));
            
            setEndTimeError("End time should be minimum 15 minutes greater than start time")
        }

    };

    const handleProctorOption = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setTestDetails(cur => ({
            ...cur,
            testSettings: {
                ...cur.testSettings,
                proctoringLevel: e.target.value as "Basic" | "Advanced",
            }
        }));
    };

    const handleResumeOptions = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setTestDetails(cur => ({
            ...cur,
            testSettings: {
                ...cur.testSettings,
                resumeable: e.target.value as "true" | "false",
            }
        }));
    };
    const handleTabSwitchLimit = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(testDetails)
        setTestDetails(cur => ({
            ...cur,
            testSettings: {
                ...cur.testSettings,
                tabSwitchLimit: parseInt(e.target.value),
            }
        }));
    };

    const getMaxAllowedDuration = () => {
        if (!localStartAt || !localEndAt) return 15;

        const maxAllowedDuration = Math.ceil((localEndAt.getTime() - localStartAt.getTime()) / 60000);
        return Math.max(Math.floor(maxAllowedDuration / 15) * 15, 15);
    }
    const increaseDuration = () => {
        const maxAllowedDuration = getMaxAllowedDuration();
        // Increase by 15 minutes, but don't exceed max allowed duration
        const newDuration = Math.min((localDuration || 0) + 15, maxAllowedDuration);
        setLocalDuration(newDuration);
    };

    const decreaseDuration = () => {
        // Decrease by 15 minutes, but don't go below 15 minutes
        const newDuration = Math.max((localDuration || 30) - 15, 15);
        setLocalDuration(newDuration);
    };
    useEffect(() => {
        if (localDuration) {
            setTestDetails(cur => ({
                ...cur,
                testSettings: {
                    ...cur.testSettings,
                    duration: localDuration,
                }
            }));
        }
        return () => {

        };
    }, [localDuration, setTestDetails]);

    // Format duration for display
    const formatDuration = (minutes: number) => {
        if (!minutes) return "15 minutes";

        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;

        if (hours > 0 && mins > 0) {
            return `${hours} hour${hours > 1 ? 's' : ''} ${mins} minute${mins > 1 ? 's' : ''}`;
        } else if (hours > 0) {
            return `${hours} hour${hours > 1 ? 's' : ''}`;
        } else {
            return `${mins} minute${mins > 1 ? 's' : ''}`;
        }
    };
    const calculateMaxEndTime = () => {
        if (!localStartAt) return new Date();
        const maxEndTime = new Date(localStartAt.getTime());
        maxEndTime.setHours(23, 59, 59, 999);
        maxEndTime.setDate(new Date().getDate() + 7);
        return maxEndTime;
    }

    return (
        <div className="max-w-4xl mx-auto pt-12 pb-4  px-8 rounded-xl  ">
            <h2 className="text-2xl font-bold text-gray-800 mb-8 border-b border-gray-200 pb-3 pl-2">
                Configure Your Test
            </h2>

            <div className="space-y-8">
                {/* Start Time Field */}
                <div className="relative">
                    <div className="flex flex-col md:flex-row md:items-center mb-1">
                        <label className="text-gray-700 font-medium w-1/3 text-lg mb-2 md:mb-0 pl-2">Start Time</label>
                        <div className="w-full md:w-2/3 relative">
                            <DatePicker
                            id="start-time"
                                className={`w-full border-0 border-b-2 ${startTimeError ? 'border-red-500' : 'border-gray-300'} rounded-none bg-transparent px-2 py-2 focus:outline-none ${startTimeError ? 'focus:border-red-500' : 'focus:border-indigo-500'}`}
                                showTimeSelect
                                selected={localStartAt}
                                onChange={handleStartAt}
                                timeFormat="HH:mm"
                                timeIntervals={15}
                                dateFormat="MMMM d, yyyy h:mm aa"
                                timeCaption="Time"
                                placeholderText="Select test start date and time"
                                minDate={new Date()}



                            />
                            {startTimeError && (
                                <p className="text-red-500 text-sm mt-1">{startTimeError}</p>
                            )}
                        </div>
                    </div>
                </div>

                {/* End Time Field */}
                <div className="relative">
                    <div className="flex flex-col md:flex-row md:items-center mb-1">
                        <label className="text-gray-700 font-medium w-1/3 text-lg mb-2 md:mb-0 pl-2">End Time</label>
                        <div className="w-full md:w-2/3 relative">
                            <DatePicker
                                className={`w-full border-0 border-b-2 ${endTimeError ? 'border-red-500' : 'border-gray-300'} rounded-none bg-transparent px-2 py-2 focus:outline-none ${endTimeError ? 'focus:border-red-500' : 'focus:border-indigo-500'}`}
                                showTimeSelect
                                id="end-time"
                                selected={localEndAt}
                                onChange={handleEndAt}
                                timeFormat="HH:mm"
                                timeIntervals={15}
                                dateFormat="MMMM d, yyyy h:mm aa"
                                timeCaption="Time"
                                placeholderText="Select test end date and time"
                                minDate={getMinEndDate()}
                             
                                minTime={getMinEndTime()}
                                maxTime={calculateMaxEndTime()}
                            />
                            
                            
                            {endTimeError && (
                                <p className="text-red-500 text-sm mt-1">{endTimeError}</p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Exam Duration Field with Plus/Minus Buttons */}
                <div className="relative">
                    <div className="flex flex-col md:flex-row md:items-center mb-1">
                        <label className="text-gray-700 font-medium w-1/3 text-lg mb-2 md:mb-0 pl-2">Exam Duration</label>
                        <div className="w-full md:w-2/3">
                            <div className={`flex items-center border-b-2 ${durationError ? 'border-red-500' : 'border-gray-300'} pb-2`}>
                                <button
                                    type="button"
                                    onClick={decreaseDuration}
                                    disabled={!localStartAt || !localEndAt || (localDuration || 0) <= 15}
                                    className={`flex items-center cursor-pointer justify-center w-8 h-8 rounded-full ${!localStartAt || !localEndAt || (localDuration || 0) <= 15
                                        ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                        : 'bg-indigo-100 text-indigo-600 hover:bg-indigo-200'
                                        }`}
                                    aria-label="Decrease duration"
                                >
                                    <span className="text-xl font-bold">-</span>
                                </button>

                                <div className="flex-1 mx-4 text-center">
                                    <span className="text-gray-800 font-medium">
                                        {localStartAt && localEndAt ? formatDuration(localDuration as number) : "Set times first"}
                                    </span>
                                </div>

                                <button
                                    type="button"
                                    onClick={increaseDuration}
                                    disabled={!localStartAt || !localEndAt || (localDuration || 0) >= getMaxAllowedDuration()}
                                    className={`flex items-center cursor-pointer justify-center w-8 h-8 rounded-full ${!localStartAt || !localEndAt || (localDuration || 0) >= getMaxAllowedDuration()
                                        ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                        : 'bg-indigo-100 text-indigo-600 hover:bg-indigo-200'
                                        }`}
                                    aria-label="Increase duration"
                                >
                                    <span className="text-xl font-bold">+</span>
                                </button>
                            </div>

                            {durationError && (
                                <p className="text-red-500 text-sm mt-1">{durationError}</p>
                            )}

                            {!durationError && localStartAt && localEndAt && (
                                <p className="text-gray-500 text-sm mt-1">
                                    Duration adjusts in 15-minute increments (15 min - {formatDuration(getMaxAllowedDuration())})
                                </p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Proctoring Level Field */}
                <div className="relative">
                    <div className="flex flex-col md:flex-row md:items-center mb-1">
                        <label className="text-gray-700 font-medium w-1/3 text-lg mb-2 md:mb-0 pl-2">Level of Procturing</label>
                        <div className="w-full md:w-2/3 relative">
                            <select
                                name="procture-level"
                                id="procture-level"
                                className="w-full border-0 border-b-2 border-gray-300 rounded-none bg-transparent px-2 py-2 focus:outline-none focus:border-indigo-500 cursor-pointer appearance-none"
                                value={proctoringLevel ? proctoringLevel : ""}
                                onChange={handleProctorOption}
                                style={{
                                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236b7280'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                                    backgroundRepeat: 'no-repeat',
                                    backgroundPosition: 'right 0.5rem center',
                                    backgroundSize: '1.5em 1.5em'
                                }}
                            >
                                <option value="" disabled hidden>
                                    Select level of procturing
                                </option>
                                <option value="Basic">Basic - Tab Switch Count, Disabled Copy Paste</option>
                                <option value="Advanced">Advanced - Face recognition, Object Detection and Basic*</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Tab switch Limit */}
                <div className="relative">
                    <div className="flex flex-col md:flex-row md:items-center mb-1">
                        <label className="text-gray-700 font-medium w-1/3 text-lg mb-2 md:mb-0 pl-2">Tab Switch Limit</label>
                        <div className="w-full md:w-2/3 relative">
                            <input
                                type="number"
                                name="tab-switch-limit"
                                id="tab-switch-limit"
                                value={tabSwitchLimit ? tabSwitchLimit : ""}
                                className="w-full border-0 border-b-2 border-gray-300 rounded-none bg-transparent px-2 py-2 focus:outline-none focus:border-indigo-500"
                                placeholder="Enter tab switch limit between 1 and 5"
                                onChange={handleTabSwitchLimit}

                            />
                        </div>
                    </div>
                </div>



                {/* Resumable Field */}
                <div className="relative">
                    <div className="flex flex-col md:flex-row md:items-center mb-1">
                        <label className="text-gray-700 font-medium w-1/3 text-lg mb-2 md:mb-0 pl-2">Is Test Resumable?</label>
                        <div className="w-full md:w-2/3 relative">
                            <select
                                name="resume"
                                id="resume"
                                className="w-full border-0 border-b-2 border-gray-300 rounded-none bg-transparent px-2 py-2 focus:outline-none focus:border-indigo-500 cursor-pointer appearance-none"
                                value={resumeable ? resumeable : ""}
                                onChange={handleResumeOptions}
                                style={{
                                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236b7280'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                                    backgroundRepeat: 'no-repeat',
                                    backgroundPosition: 'right 0.5rem center',
                                    backgroundSize: '1.5em 1.5em'
                                }}
                            >
                                <option value="" disabled hidden>
                                    Select option
                                </option>
                                <option value={"true"}>Resumable</option>
                                <option value={"false"}>Not Resumable</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TestSettings;