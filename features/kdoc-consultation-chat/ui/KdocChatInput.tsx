import { useState } from 'react';
import { type Dictionary } from 'shared/model/types';
import { PaperclipIcon, SendIcon } from './icons/KdocChatIcons';

interface KdocChatInputProps {
  dict: Dictionary;
  onSend: (text: string) => void;
}

export function KdocChatInput({ dict, onSend }: KdocChatInputProps) {
  const [value, setValue] = useState('');
  const t = dict.kdocChat.input;

  const handleSend = () => {
    const text = value.trim();
    if (!text) return;
    setValue('');
    onSend(text);
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSend();
      }}
      className='flex items-center gap-2 border-t border-[#e5e5e5] bg-white px-5 pb-8 pt-4 drop-shadow-[0_8px_8px_rgba(0,0,0,0.24)]'
    >
      <div className='flex flex-1 items-center gap-2'>
        <button type='button' className='shrink-0' aria-label={t.attachLabel}>
          <PaperclipIcon />
        </button>
        <input
          type='text'
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={t.placeholder}
          className='flex-1 text-sm font-medium text-[#404040] outline-none placeholder:text-[#a3a3a3]'
        />
      </div>
      <button type='submit' className='shrink-0' aria-label={t.sendLabel}>
        <SendIcon />
      </button>
    </form>
  );
}
