import { Colors } from '@/consts';
import { HTMLAttributes } from 'react';

interface IButtonProps extends HTMLAttributes<HTMLButtonElement> {}
const Button = ({ ...props }: IButtonProps) => {
  return (
    <button
      {...props}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
        padding: '12px 16px',
        backgroundColor: Colors.green,
        border: 'none',
        outline: 'none',
        ...props.style,
      }}
    />
  );
};

export default Button;
