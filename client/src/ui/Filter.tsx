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

/* const StyledFilter = styled.div`
  border: 1px solid var(--color-grey-100);
  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-sm);
  border-radius: var(--border-radius-sm);
  padding: 0.4rem;
  display: flex;
  gap: 0.4rem;
`; */

/* interface FilterButtonProps {
    active: "true" | "false";
} */

/* const FilterButton = styled.button<FilterButtonProps>`
  background-color: var(--color-grey-0);
  border: none;

  ${(props) =>
        props.active === "true" &&
        css`
      background-color: var(--color-brand-600);
      color: var(--color-brand-50);
    `}

  border-radius: var(--border-radius-sm);
  font-weight: 500;
  font-size: 1.4rem;
  padding: 0.44rem 0.8rem;
  transition: all 0.3s;

  &:hover:not(:disabled) {
    background-color: var(--color-brand-600);
    color: var(--color-brand-50);
  }
`; */

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
