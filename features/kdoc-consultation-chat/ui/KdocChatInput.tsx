import { useState } from 'react';
import { CameraIcon, SendIcon } from './icons/KdocChatIcons';

interface KdocChatInputProps {
  onSend: (text: string) => void;
}

export function KdocChatInput({ onSend }: KdocChatInputProps) {
  const [value, setValue] = useState('');

  const handleSend = () => {
    const text = value.trim();
    if (!text) return;
    setValue('');
    onSend(text);
  };

  return (
    <div className='flex items-center gap-2 border-t border-[#e5e5e5] bg-white px-5 pb-8 pt-4'>
      <div className='flex flex-1 items-center gap-2'>
        <button className='shrink-0' aria-label='카메라'>
          <CameraIcon />
        </button>
        <input
          type='text'
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleSend()}
          placeholder='무엇이든 물어보세요!'
          className='flex-1 text-sm font-medium text-[#404040] outline-none placeholder:text-[#a3a3a3]'
        />
      </div>
      <button onClick={handleSend} className='shrink-0' aria-label='전송'>
        <SendIcon />
      </button>
    </div>
  );
}
