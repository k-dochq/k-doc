import { type Dictionary } from 'shared/model/types';

interface FooterAboutButtonProps {
  dict: Dictionary;
}

export function FooterAboutButton({ dict }: FooterAboutButtonProps) {
  return (
    <button className='flex items-center gap-1 rounded-lg border border-[#F4A8FF] px-4 py-2'>
      <span className='text-primary text-sm font-semibold'>{dict.footer.companyInfo}</span>
      <svg xmlns='http://www.w3.org/2000/svg' width='5' height='6' viewBox='0 0 5 6' fill='none'>
        <path
          d='M0 5.51416V0.48583C0 0.348179 0.0493828 0.232714 0.148148 0.139435C0.246913 0.0461555 0.36214 -0.000322205 0.493827 1.68107e-06C0.534979 1.68107e-06 0.578271 0.00599366 0.623703 0.0179774C0.669135 0.0299612 0.712263 0.0482607 0.753086 0.0728761L4.77777 2.58704C4.85185 2.63562 4.90749 2.69635 4.94469 2.76923C4.98189 2.8421 5.00033 2.91902 5 2.99999C4.99967 3.08097 4.98123 3.15789 4.94469 3.23076C4.90814 3.30364 4.85251 3.36437 4.77777 3.41295L0.753086 5.92711C0.711933 5.9514 0.668806 5.9697 0.623703 5.98201C0.5786 5.99432 0.535308 6.00031 0.493827 5.99999C0.36214 5.99999 0.246913 5.95335 0.148148 5.86007C0.0493828 5.76679 0 5.65149 0 5.51416Z'
          fill='#DA47EF'
        />
      </svg>
    </button>
  );
}
