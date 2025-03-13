import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useTestConfig } from "../context/TestConfigContext";


function TestOptionForm() {
    const { testConfig, setTestConfig } = useTestConfig();
    const { testSettings: { startAt, endAt, procturing, resumable, duration = 15 } } = testConfig;

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

    // Calculate the time difference between start and end time
    const calculateTimeDifference = () => {
        if (localStartAt && localEndAt) {
            return (localEndAt.getTime() - localStartAt.getTime()) / (1000 * 60); // difference in minutes
        }
        return 0;
    };

    // Calculate the maximum allowed duration based on time difference
    const getMaxAllowedDuration = () => {
        const timeDiff = calculateTimeDifference();

        // If time difference is less than 30 minutes, max duration is 15 minutes
        if (timeDiff < 30) {
            return 15;
        }

        // Otherwise, return the maximum multiple of 15 that fits within the time difference
        return Math.floor(timeDiff / 15) * 15;
    };

    // Validate and update testConfig if valid
    const validateAndUpdateConfig = () => {
        let isValid = true;
        
        

        // Validate start and end times
        if (localStartAt && localEndAt) {
            if(localStartAt < new Date()){
                setStartTimeError("Start time cannot be in the past");
                isValid = false;
                return
            }
            if(localEndAt < new Date()){
                setEndTimeError("End time cannot be in the past");
                isValid = false;
                return;
            }
            const timeDifference = calculateTimeDifference();

            if (timeDifference < 15) {
                setStartTimeError("Start and end times must be at least 15 minutes apart");
                setEndTimeError("Start and end times must be at least 15 minutes apart");
                setTestConfig(cur => ({
                    ...cur,
                    testSettings: {
                        ...cur.testSettings,
                        startAt: undefined,
                        endAt: undefined,

                    }
                }));
                isValid = false;
            } else {
                setStartTimeError("");
                setEndTimeError("");
            }

            // Validate duration
            if (localDuration) {
                const maxAllowedDuration = getMaxAllowedDuration();

                if (localDuration > maxAllowedDuration) {
                    setDurationError(`Duration cannot exceed ${maxAllowedDuration} minutes for the selected time range`);
                    isValid = false;
                } else if (localDuration % 15 !== 0) {
                    setDurationError("Duration must be a multiple of 15 minutes");
                    isValid = false;
                } else {
                    setDurationError("");
                }
            }
        }

        // Only update testConfig if all validations pass
        if (isValid) {
            setTestConfig(cur => ({
                ...cur,
                testSettings: {
                    ...cur.testSettings,
                    startAt: localStartAt,
                    endAt: localEndAt,
                    duration: localDuration,
                }
            }));
        }
    };

    // Adjust duration when time difference changes
    useEffect(() => {
        if (localStartAt && localEndAt) {
            const maxAllowedDuration = getMaxAllowedDuration();

            // If current duration exceeds the maximum allowed, adjust it down
            if (localDuration > maxAllowedDuration) {
                setLocalDuration(maxAllowedDuration);
            } else if (localDuration < 15) {
                // Ensure minimum duration is 15 minutes
                setLocalDuration(15);
            } else if (localDuration % 15 !== 0) {
                // Ensure duration is a multiple of 15
                setLocalDuration(Math.floor(localDuration / 15) * 15);
            }
        }
    }, [localStartAt, localEndAt]);

    // Update local values and validate whenever they change
    useEffect(() => {
        validateAndUpdateConfig();
    }, [localStartAt, localEndAt, localDuration]);

    // Calculate minimum end time (15 minutes after start time)
    const getMinEndTime = () => {
        if (!localStartAt) return new Date();

        const minEndTime = new Date(localStartAt.getTime());
        minEndTime.setMinutes(minEndTime.getMinutes() + 15);
        return minEndTime;
    };

    const handleStartAt = (date) => {
        setLocalStartAt(date);
        // Clear end time if it's now invalid
        if (localEndAt && date && localEndAt < new Date(date.getTime() + 15 * 60000)) {
            setLocalEndAt(null);
        }
    };

    const handleEndAt = (date) => {
        setLocalEndAt(date);
    };

    const handleProctureOption = (e) => {
        setTestConfig(cur => ({
            ...cur,
            testSettings: {
                ...cur.testSettings,
                procturing: e.target.value,
            }
        }));
    };

    const handleResumeOptions = (e) => {
        setTestConfig(cur => ({
            ...cur,
            testSettings: {
                ...cur.testSettings,
                resumable: e.target.value,
            }
        }));
    };
    const handleTabSwitchLimit = (e) => {
        setTestConfig(cur => ({
            ...cur,
            testSettings: {
                ...cur.testSettings,
                tabSwitchLimit: e.target.value,
            }
        }));
    };

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

    // Format duration for display
    const formatDuration = (minutes) => {
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

    return (
        <div className="max-w-4xl mx-auto bg-gradient-to-br from-white to-gray-50 pt-8 pb-12 px-8 rounded-xl shadow-md">
            <h2 className="text-2xl font-bold text-gray-800 mb-8 border-b border-gray-200 pb-3 pl-2">
                Test Settings
            </h2>

            <div className="space-y-8">
                {/* Start Time Field */}
                <div className="relative">
                    <div className="flex flex-col md:flex-row md:items-center mb-1">
                        <label className="text-gray-700 font-medium w-1/3 text-lg mb-2 md:mb-0 pl-2">Start Time</label>
                        <div className="w-full md:w-2/3 relative">
                            <DatePicker
                                className={`w-full border-0 border-b-2 ${startTimeError ? 'border-red-500' : 'border-gray-300'} rounded-none bg-transparent px-2 py-2 focus:outline-none ${startTimeError ? 'focus:border-red-500' : 'focus:border-indigo-500'}`}
                                showTimeSelect
                                selected={localStartAt}
                                onChange={handleStartAt}
                                timeFormat="HH:mm"
                                timeIntervals={5}
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
                                timeIntervals={5}
                                selected={localEndAt}
                                onChange={handleEndAt}
                                timeFormat="HH:mm"
                                dateFormat="MMMM d, yyyy h:mm aa"
                                timeCaption="Time"
                                placeholderText="Select test end date and time"
                                minDate={getMinEndTime()}
                                disabled={!localStartAt}
                             
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
                                    className={`flex items-center justify-center w-8 h-8 rounded-full ${!localStartAt || !localEndAt || (localDuration || 0) <= 15
                                            ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                            : 'bg-indigo-100 text-indigo-600 hover:bg-indigo-200'
                                        }`}
                                    aria-label="Decrease duration"
                                >
                                    <span className="text-xl font-bold mb-1">-</span>
                                </button>

                                <div className="flex-1 mx-4 text-center">
                                    <span className="text-gray-800 font-medium">
                                        {localStartAt && localEndAt ? formatDuration(localDuration) : "Set times first"}
                                    </span>
                                </div>

                                <button
                                    type="button"
                                    onClick={increaseDuration}
                                    disabled={!localStartAt || !localEndAt || (localDuration || 0) >= getMaxAllowedDuration()}
                                    className={`flex items-center justify-center w-8 h-8 rounded-full ${!localStartAt || !localEndAt || (localDuration || 0) >= getMaxAllowedDuration()
                                            ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                            : 'bg-indigo-100 text-indigo-600 hover:bg-indigo-200'
                                        }`}
                                    aria-label="Increase duration"
                                >
                                    <span className="text-xl font-bold mb-1">+</span>
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
                                value={procturing}
                                onChange={handleProctureOption}
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
                                <option value="level-1">Basic - Tab Switch Count, Disabled Copy Paste</option>
                                <option value="level-2">Advanced - Face recognition, Object Detection and Basic*</option>
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
                                className="w-full border-0 border-b-2 border-gray-300 rounded-none bg-transparent px-2 py-2 focus:outline-none focus:border-indigo-500"
                                placeholder="Enter tab switch limit"
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
                                value={resumable}
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

export default TestOptionForm;