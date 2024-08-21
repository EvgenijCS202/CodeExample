import { Colors } from '@/consts';
import { HTMLAttributes } from 'react';

interface IDropDownProps extends HTMLAttributes<HTMLDivElement> {
  show: boolean;
}
const DropDown = ({ show, ...props }: IDropDownProps) => {
  return (
    <div
      {...props}
      style={{
        position: 'absolute',
        marginTop: 4,
        backgroundColor: Colors.white3,
        width: '100%',
        borderRadius: 8,
        padding: 16,
        boxSizing: 'border-box',
        zIndex: 100,
        ...props.style,
        display: show ? props.style?.display : 'none',
      }}
    />
  );
};

export default DropDown;
