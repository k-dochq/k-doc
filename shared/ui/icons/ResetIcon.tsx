interface ResetIconProps {
  className?: string;
}

export function ResetIcon({ className }: ResetIconProps) {
  return (
    <svg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M11.0476 13.3333C12.8868 12.2842 14.0952 10.2689 14.0952 7.99998C14.0952 6.79445 13.7377 5.616 13.068 4.61364C12.3982 3.61129 11.4463 2.83004 10.3325 2.36871C9.21876 1.90738 7.99322 1.78667 6.81085 2.02186C5.62849 2.25704 4.54243 2.83756 3.68999 3.68999C2.83756 4.54243 2.25704 5.62849 2.02186 6.81085C1.78667 7.99322 1.90738 9.21876 2.36871 10.3325C2.83004 11.4463 3.61129 12.3982 4.61364 13.068C5.616 13.7377 6.79445 14.0952 7.99998 14.0952'
        stroke='#737373'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M11.0476 10.2856V13.3333H14.0952'
        stroke='#737373'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
}
