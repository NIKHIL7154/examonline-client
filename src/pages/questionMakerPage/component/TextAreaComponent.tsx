import * as React from 'react';
import { TextareaAutosize } from '@mui/base/TextareaAutosize';
import { useTheme } from '@mui/system';

function useIsDarkMode() {
  const theme = useTheme();
  return theme.palette.mode === 'dark';
}

type Props = {
    effect: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    value: string;
    placeholder: string;
};

export default function TextAreaComponent(props:Props) {
  const isDarkMode = useIsDarkMode();
  

  return (
    <div className={isDarkMode ? 'dark' : ''} style={{ display: 'flex' }}>
      <TextareaAutosize
      onChange={props.effect}
      value={props.value}
        className="w-full text-sm font-sans leading-normal p-3 rounded-xl rounded-br-none shadow-lg shadow-slate-100 dark:shadow-slate-900 focus:shadow-outline-purple dark:focus:shadow-outline-purple focus:shadow-lg border border-solid border-slate-300 hover:border-purple-500 dark:hover:border-purple-500 focus:border-purple-500 dark:focus:border-purple-500 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-300 focus-visible:outline-0 box-border"
        aria-label="empty textarea"
        placeholder={props.placeholder}
      />
    </div>
  );
}
