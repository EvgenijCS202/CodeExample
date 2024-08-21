import { HTMLAttributes } from 'react';

export const CrossSvg = (props: HTMLAttributes<SVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="14"
    height="14"
    viewBox="0 0 14 14"
    fill="none"
    {...props}
  >
    <path
      d="M2.80005 2.79999L7.00005 6.99999M7.00005 6.99999L11.2 11.2M7.00005 6.99999L11.2 2.79999M7.00005 6.99999L2.80005 11.2"
      stroke="#1E1E1E"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
