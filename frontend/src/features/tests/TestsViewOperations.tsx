import { HiOutlineCalendar } from "react-icons/hi";
import SortBy from "../../ui/SortBy";
import { FiEdit3 } from "react-icons/fi";
import { FaSortAlphaDown } from "react-icons/fa";

function TestsViewOperations() {
    return (
        <SortBy
            options={[
                { value: "createdAt-desc", label: "Date created", icon: <HiOutlineCalendar /> },
                { value: "updatedAt-desc", label: "Last updated", icon: <FiEdit3 /> },
                { value: "name-asc", label: "Alphabetical", icon: <FaSortAlphaDown /> },
            ]}
        />
    );
}

export default TestsViewOperations;
