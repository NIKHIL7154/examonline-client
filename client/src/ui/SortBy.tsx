import { useSearchParams } from "react-router";
import DropSelect, { Option } from "./DropSelect";
import { SingleValue } from "react-select";
// interface Option{
//     value: string;
//     label: string;
//     icon: React.ReactNode;
// }

function SortBy({ options }: {options: Option[]}) {
    const [searchParams, setSearchParams] = useSearchParams();
    const sortBy = searchParams.get("sortBy") || options[0].value;

    const handleChange = (selectedOption: SingleValue<Option>) => {
        if (selectedOption) {
            searchParams.set("sortBy", selectedOption.value);
            setSearchParams(searchParams);
        }
    };

    return (
        <DropSelect options={options} onChange={handleChange} value={sortBy}/>

    );
}

export default SortBy;