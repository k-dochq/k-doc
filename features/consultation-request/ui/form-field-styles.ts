export const baseInputClasses =
  'block w-full rounded-xl border px-4 py-3.5 text-sm leading-6 transition-colors duration-150 placeholder:text-neutral-400 focus:outline-none';

export const focusClass = 'focus:border-primary-900 focus:ring-0';
export const emptyBorder = 'border-neutral-400';
export const filledBorder = 'border-neutral-700';
export const errorBorder = 'border-[#f31110] focus:border-[#f31110] focus:ring-0';
export const disabledState = 'bg-[#FAFAFA] text-neutral-300 cursor-not-allowed';

export const selectArrowSvg =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'%3E%3Cpath d='M15.8359 7.08334L10.0026 12.9167L4.16927 7.08334' stroke='%23A3A3A3' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E\")";

export const hasValue = (value: unknown): boolean => {
  if (value === undefined || value === null) return false;
  return `${value}`.toString().trim() !== '';
};

export const buildStateClass = (value: unknown, error?: string): string => {
  if (error) return errorBorder;
  return `${hasValue(value) ? filledBorder : emptyBorder} ${focusClass} text-neutral-900`;
};
