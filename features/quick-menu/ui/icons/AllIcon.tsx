interface AllIconProps {
  variant?: 'default' | 'small';
}

export function AllIcon({ variant = 'default' }: AllIconProps) {
  const scale = variant === 'small' ? 0.87 : 1;
  const width = 30 * scale;
  const height = 30 * scale;

  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={width}
      height={height}
      viewBox='0 0 30 30'
      fill='none'
    >
      <path
        d='M10.8182 1H2.63636C1.73262 1 1 1.73262 1 2.63636V10.8182C1 11.7219 1.73262 12.4545 2.63636 12.4545H10.8182C11.7219 12.4545 12.4545 11.7219 12.4545 10.8182V2.63636C12.4545 1.73262 11.7219 1 10.8182 1Z'
        stroke='#404040'
        strokeWidth='1.5'
        strokeLinejoin='round'
      />
      <path
        d='M10.8182 17.5454H2.63636C1.73262 17.5454 1 18.278 1 19.1818V27.3636C1 28.2674 1.73262 29 2.63636 29H10.8182C11.7219 29 12.4545 28.2674 12.4545 27.3636V19.1818C12.4545 18.278 11.7219 17.5454 10.8182 17.5454Z'
        stroke='#404040'
        strokeWidth='1.5'
        strokeLinejoin='round'
      />
      <path
        d='M27.3636 1H19.1818C18.278 1 17.5454 1.73262 17.5454 2.63636V10.8182C17.5454 11.7219 18.278 12.4545 19.1818 12.4545H27.3636C28.2674 12.4545 29 11.7219 29 10.8182V2.63636C29 1.73262 28.2674 1 27.3636 1Z'
        stroke='#DA47EF'
        strokeWidth='1.5'
        strokeLinejoin='round'
      />
      <path
        d='M27.3636 17.5454H19.1818C18.278 17.5454 17.5454 18.278 17.5454 19.1818V27.3636C17.5454 28.2674 18.278 29 19.1818 29H27.3636C28.2674 29 29 28.2674 29 27.3636V19.1818C29 18.278 28.2674 17.5454 27.3636 17.5454Z'
        stroke='#404040'
        strokeWidth='1.5'
        strokeLinejoin='round'
      />
    </svg>
  );
}
