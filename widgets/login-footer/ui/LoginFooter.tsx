interface LoginFooterProps {
  className?: string;
}

export function LoginFooter({ className = '' }: LoginFooterProps) {
  return (
    <div className={`pb-8 text-center ${className}`}>
      <div className='text-2xl font-bold text-white'>K-DOC</div>
    </div>
  );
}
