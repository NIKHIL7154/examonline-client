import * as React from 'react';
import { TextareaAutosize } from '@mui/base/TextareaAutosize';
import { useTheme } from '@mui/system';

// Hook to check if dark mode is active
function useIsDarkMode() {
  const theme = useTheme();
  return theme.palette.mode === 'dark';
}

// Define the Props type
type Props = {
  id: string;
  defaultValue: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder: string;
};

// Use forwardRef to forward the ref from react-hook-form to the textarea
const AutoTextArea = React.forwardRef<HTMLTextAreaElement, Props>((props, ref) => {
  const isDarkMode = useIsDarkMode();
  
  return (
    <div className={isDarkMode ? 'dark' : ''} style={{ display: 'flex' }}>
      <TextareaAutosize
        {...props}
        ref={ref} // Forward the ref here
        className="w-full text-sm font-sans leading-normal p-3 rounded-xl rounded-br-none shadow-lg shadow-slate-100 focus:shadow-outline-purple focus:shadow-lg border border-solid border-slate-300 hover:border-purple-500 focus:border-purple-500 dark:focus:border-purple-500 bg-white text-slate-900 focus-visible:outline-0 box-border"
        aria-label="empty textarea"
      />
    </div>
  );
});

// Display name to help with debugging in React DevTools
AutoTextArea.displayName = 'AutoTextArea';

export default AutoTextArea;
