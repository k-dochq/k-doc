import { TipsContent } from './TipsContent';

export default function TipsPage() {
  return (
    <div className='px-5'>
      <img
        src='/images/tips-top-banner.png'
        alt='K-DOC Tips'
        className='w-full'
      />
      <TipsContent />
    </div>
  );
}
