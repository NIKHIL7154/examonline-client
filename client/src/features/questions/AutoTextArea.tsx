import * as React from "react";

// Define the Props type
type Props = {
  id: string;
  defaultValue?: string;
  placeholder: string;
} & React.TextareaHTMLAttributes<HTMLTextAreaElement>;

// Use forwardRef to support react-hook-form
const AutoTextArea = React.forwardRef<HTMLTextAreaElement, Props>(
  ({ id, defaultValue, placeholder, ...rest }, ref) => {
    const textareaRef = React.useRef<HTMLTextAreaElement | null>(null);

    // Function to adjust height dynamically
    const resizeTextarea = () => {
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto"; // Reset height
        textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`; // Adjust to content height
      }
    };

    // Resize on first render if defaultValue exists
    React.useEffect(() => {
      resizeTextarea();
    }, [defaultValue]);

    return (
      <div className="flex">
        <textarea
          id={id}
          defaultValue={defaultValue}
          placeholder={placeholder}
          ref={(node) => {
            if (typeof ref === "function") ref(node);
            else if (ref) ref.current = node;
            textareaRef.current = node;
          }}
          onInput={resizeTextarea} // Adjust height dynamically as user types
          className="placeholder:text-gray-400 focus:placeholder-transparent w-full poppins-medium transition-all duration-200 text-gray-600 py-2 border-b border-slate-300 hover:border-gray-500 focus:border-purple-500 dark:focus:border-purple-500 bg-gray-50 focus-visible:outline-0 box-border resize-none overflow-hidden min-h-[40px]"
          rows={1} // Ensures initial height is small
          {...rest} // Spread additional props like {...register()}
        />
      </div>
    );
  }
);

AutoTextArea.displayName = "AutoTextArea";

export default AutoTextArea;
