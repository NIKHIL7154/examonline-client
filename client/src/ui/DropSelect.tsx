import Select, { ActionMeta, SingleValue, StylesConfig } from 'react-select';

export interface Option {
  value: string;
  label: React.ReactNode;
  icon?: React.ReactNode;
}

interface DropSelectProps {
  options: Option[];
  value: string;
  onChange: (selectedOption: SingleValue<Option>, actionMeta: ActionMeta<Option>) => void; // Update to match react-select's onChange
  type?: 'white' | 'default'; // Add more types if needed
}

const customStyles: StylesConfig<Option, false> = {
  control: (base, state) => ({
    ...base,
    width: "11.4rem",
    fontSize: "0.95rem",
    cursor: "pointer",
    backgroundColor: "oklch(0.985 0.002 247.839)",
    borderColor: "oklch(0.872 0.01 258.338)",
    boxShadow: state.isFocused ? "0 0 0 3px oklch(0.872 0.01 258.338)" : "none",
    borderRadius: "0.45rem",
    "&:hover": {
      backgroundColor: "oklch(0.967 0.003 264.542)",
    },       
  }),
  option: (base, state) => ({
    ...base,
    fontSize: "0.95rem",
    backgroundColor: state.isSelected ? "oklch(0.928 0.006 264.531)" : state.isFocused ? "oklch(0.928 0.006 264.531)" : "oklch(0.985 0.002 247.839)",
    // color: state.isSelected ? "white" : "black",
    color: "black",
    cursor: "pointer",
    borderRadius: "0.45rem",
    marginBottom: "0.3rem",
    "&:active": {
      backgroundColor: "oklch(0.928 0.006 264.531)",
    },
    // display: "flex",
    // alignItems: "center",
    // border: "1px solid black",
    // justifyContent: "space-evenly"
  }),
  menu: (base) => ({
    ...base,
    backgroundColor: "oklch(0.985 0.002 247.839)",
    width: "auto",
    padding: "0.4rem 0.4rem 0 0.4rem",
    borderRadius: "8px",
    // border: "5px solid rgba(101, 101, 101, 0.068)",
    boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.15)",
    gap: "0.2rem"
  }),
  dropdownIndicator: (base) => ({
    ...base,
    color: "oklch(0.551 0.027 264.364)",
  })
};



// function DropSelect({ options, value, onChange, type = 'default', ...props }: DropSelectProps) {
function DropSelect({ options, value, onChange, ...props }: DropSelectProps) {
  // const selectClasses = classNames(
  //   'text-md p-1 rounded-full w-50',
  //   {
  //     'border-gray-400': type !== 'white',
  //     'border-gray-200': type === 'white',
  //   }
  // );

  const formattedOptions = options.map(option => ({
    value: option.value,
    label: (
      <div className="flex items-center">
        {option?.icon && <span className='mr-2'>{option.icon} </span>}
        {option.label}
      </div>
    )
  }));

  return (
    <Select
      // className={selectClasses}
      options={formattedOptions}
      isMulti={false}
      onChange={onChange} 
      value={formattedOptions.find(option => option.value === value) || null} 
      isSearchable={false}
      {...props}
      styles={customStyles}
    />
  );
};

export default DropSelect;