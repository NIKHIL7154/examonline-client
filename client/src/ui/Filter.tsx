import classNames from "classnames";
import { useSearchParams } from "react-router";

// Define types for the option and filter props
interface Option {
    value: string;
    label: string;
}

interface FilterProps {
    filterField: string;
    options: Option[];
}

const Filter = ({ filterField, options }: FilterProps) => {
    const [searchParams, setSearchParams] = useSearchParams();
    //   const currentFilter = searchParams.get(filterField) || options?.at(0)?.value;
    const currentFilter = searchParams.get(filterField) || (options.length > 0 ? options[0].value : "");

    function handleClick(value: string) {
        searchParams.set(filterField, value);
        if (searchParams.get("page")) searchParams.set("page", "1");

        setSearchParams(searchParams);
    }

    return (
        // hover:bg-gray-100 cursor-pointer rounded-lg pl-3 pr-1 items-center
        <div className="border border-gray-300 bg-gray-50 h-[38px] text-[0.95rem] gap-[1px] flex font-normal rounded-lg overflow-hidden">

            {options.map((option) => (
                // <FilterButton
                //     key={option.value}
                //     onClick={() => handleClick(option.value)}
                //     active={option.value === currentFilter ? "true" : "false"}
                //     disabled={option.value === currentFilter}
                // >
                //     {option.label}
                // </FilterButton>
                // <button className="px-3 hover:bg-gray-200 cursor-pointer transition-all duration-200"
                <button className={classNames("px-3 text-gray-800 font-normal hover:bg-gray-200 cursor-pointer transition-all duration-200 disabled:cursor-not-allowed", {
                    "bg-gray-200": option.value === currentFilter,
                })}
                    disabled={option.value === currentFilter}
                    key={option.value}
                    onClick={() => handleClick(option.value)}
                >
                    {option.label}
                </button>
            ))}
        </div>
    );
};

export default Filter;
