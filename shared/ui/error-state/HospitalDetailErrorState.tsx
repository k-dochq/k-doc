interface HospitalDetailErrorStateProps {
  className?: string;
}

export function HospitalDetailErrorState({ className = '' }: HospitalDetailErrorStateProps) {
  return (
    <div className={`flex flex-col items-center justify-center bg-white py-12 ${className}`}>
      <div className='text-center'>
        <h2 className='mb-2 text-lg font-medium text-gray-900'>
          An error occurred while loading hospital information
        </h2>
        <p className='text-gray-500'>Please try again later.</p>
      </div>
    </div>
  );
}
