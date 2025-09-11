'use client';

import { useState } from 'react';
import type { Locale } from 'shared/config';
import type { Dictionary } from 'shared/model/types';
import { ConsultationChatList } from './ConsultationChatList';
import { ConsultationAppointmentList } from './ConsultationAppointmentList';

interface ConsultationTabsProps {
  lang: Locale;
  dict: Dictionary;
}

export function ConsultationTabs({ lang, dict }: ConsultationTabsProps) {
  const [activeTab, setActiveTab] = useState<'chat' | 'appointment'>('chat');

  return (
    <div className='w-full'>
      {/* 헤더 */}
      <div className='mb-6'>
        <h1 className='text-2xl font-bold text-gray-900'>{dict.consultation?.title}</h1>
      </div>

      {/* 탭 네비게이션 */}
      <div className='mb-6'>
        <div className='flex space-x-1 rounded-lg bg-gray-100 p-1'>
          <button
            onClick={() => setActiveTab('chat')}
            className={`flex-1 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
              activeTab === 'chat'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {dict.consultation?.chat}
          </button>
          <button
            onClick={() => setActiveTab('appointment')}
            className={`flex-1 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
              activeTab === 'appointment'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {dict.consultation?.appointment}
          </button>
        </div>
      </div>

      {/* 탭 컨텐츠 */}
      <div className='w-full'>
        {activeTab === 'chat' && <ConsultationChatList lang={lang} dict={dict} />}
        {activeTab === 'appointment' && <ConsultationAppointmentList lang={lang} dict={dict} />}
      </div>
    </div>
  );
}
