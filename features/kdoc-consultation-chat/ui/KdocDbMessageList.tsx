'use client';

import { Fragment } from 'react';
import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { type KdocMessage } from '../model/useKdocRealtimeChat';
import { KdocAdminMessageBubble, KdocUserMessageBubble } from './KdocMessageBubble';
import { KdocGuestInfoCard, type GuestInfo } from './KdocGuestInfoForm';
import { KdocHospitalCarousel } from './KdocHospitalCarousel';
import { parseHospitalCards } from '../lib/hospital-cards';

interface KdocDbMessageListProps {
  messages: KdocMessage[];
  hasGuestInfo: boolean;
  guestInfo: GuestInfo;
  infoMessage: string;
  lang: Locale;
  dict: Dictionary;
  onEditGuestInfo: () => void;
}

export function KdocDbMessageList({
  messages,
  hasGuestInfo,
  guestInfo,
  infoMessage,
  lang,
  dict,
  onEditGuestInfo,
}: KdocDbMessageListProps) {
  let guestCardInserted = false;

  return (
    <>
      {messages.map((msg) => {
        if (msg.senderType === 'USER') {
          return (
            <KdocUserMessageBubble key={msg.id} content={msg.content} createdAt={msg.createdAt} />
          );
        }

        if (hasGuestInfo && !guestCardInserted && msg.content === infoMessage) {
          guestCardInserted = true;
          return (
            <Fragment key={msg.id}>
              <KdocAdminMessageBubble content={msg.content} createdAt={msg.createdAt} />
              <KdocGuestInfoCard dict={dict} guestInfo={guestInfo} onEdit={onEditGuestInfo} />
            </Fragment>
          );
        }

        const parsed = parseHospitalCards(msg.content);
        if (parsed) {
          return (
            <div key={msg.id} className='flex flex-col gap-2 py-1'>
              {parsed.text && (
                <KdocAdminMessageBubble content={parsed.text} createdAt={msg.createdAt} />
              )}
            <div className='-mx-5 pb-6'>
              <KdocHospitalCarousel hospitals={parsed.hospitals} lang={lang} dict={dict} />
            </div>
            </div>
          );
        }

        return (
          <KdocAdminMessageBubble key={msg.id} content={msg.content} createdAt={msg.createdAt} />
        );
      })}
    </>
  );
}
