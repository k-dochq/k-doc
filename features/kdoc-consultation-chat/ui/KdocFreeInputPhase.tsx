import { KdocAdminMessageBubble, KdocUserMessageBubble } from './KdocMessageBubble';

interface KdocFreeInputPhaseProps {
  selectedCategoryLabel: string;
  cmsPrompt: string;
}

export function KdocFreeInputPhase({ selectedCategoryLabel, cmsPrompt }: KdocFreeInputPhaseProps) {
  return (
    <>
      <KdocUserMessageBubble content={selectedCategoryLabel} createdAt={new Date()} />
      <KdocAdminMessageBubble content={cmsPrompt} createdAt={new Date()} />
    </>
  );
}
