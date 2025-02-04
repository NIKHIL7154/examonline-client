import * as React from 'react';
import { TextareaAutosize } from '@mui/base/TextareaAutosize';
import { useTheme } from '@mui/system';

function useIsDarkMode() {
  const theme = useTheme();
  return theme.palette.mode === 'dark';
}

type Props = {
  defaultValue: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder: string;
};

export default function AutoTextArea(props:Props) {
  const isDarkMode = useIsDarkMode();
  

  return (
    <div className={isDarkMode ? 'dark' : ''} style={{ display: 'flex' }}>
      <TextareaAutosize
        {...props}
      
        className="w-full text-sm font-sans leading-normal p-3 rounded-xl rounded-br-none shadow-lg shadow-slate-100 focus:shadow-outline-purple focus:shadow-lg border border-solid border-slate-300 hover:border-purple-500  focus:border-purple-500 dark:focus:border-purple-500  bg-white  text-slate-900  focus-visible:outline-0 box-border"
        aria-label="empty textarea"
        
      />
    </div>
  );
}
