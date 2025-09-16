export function ConsultationRequestLoading() {
  return (
    <div className='mx-auto max-w-2xl'>
      <div className='rounded-lg bg-white p-6 shadow-md'>
        <div className='animate-pulse'>
          <div className='mb-4 h-6 w-48 rounded bg-gray-200'></div>
          <div className='h-4 w-full rounded bg-gray-200'></div>
        </div>
      </div>
    </div>
  );
}
