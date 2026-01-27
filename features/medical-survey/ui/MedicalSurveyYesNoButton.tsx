'use client';

interface MedicalSurveyYesNoButtonProps {
  label: string;
  isSelected: boolean;
  onClick: () => void;
}

export function MedicalSurveyYesNoButton({
  label,
  isSelected,
  onClick,
}: MedicalSurveyYesNoButtonProps) {
  return (
    <button
      type='button'
      onClick={onClick}
      className={`flex w-full items-center justify-center rounded-xl px-5 py-4 text-base font-medium transition-colors duration-200 ${
        isSelected ? 'bg-primary-300 text-primary-900' : 'bg-[#e5e5e5] text-[#404040]'
      }`}
    >
      {label}
    </button>
  );
}
