import { HiOutlineCalendar } from "react-icons/hi";
import SortBy from "../../ui/SortBy";
// import { FiEdit3 } from "react-icons/fi";
import { FaSortAlphaDown } from "react-icons/fa";
import Filter from "../../ui/Filter";
// import { HiOutlineClock } from "react-icons/hi";


function TestsViewOperations() {
    return (
        <div className="flex gap-3">
            <Filter
                filterField="status"
                options={[
                    { value: "all", label: "All" },
                    { value: "pending", label: "Pending" },
                    { value: "active", label: "Active" },
                    { value: "completed", label: "Completed" },
                ]}
            />

            <SortBy
                options={[
                    { value: "createdAt-desc", label: "Date created", icon: <HiOutlineCalendar /> },
                    // { value: "updatedAt-desc", label: "Last updated", icon: <FiEdit3 /> },
                    // { value: "duration-desc", label: "Duration", icon: <HiOutlineClock /> },
                    { value: "name-asc", label: "Alphabetical", icon: <FaSortAlphaDown /> },
                ]}
            />

            
        </div>
    );
}

export default TestsViewOperations;
