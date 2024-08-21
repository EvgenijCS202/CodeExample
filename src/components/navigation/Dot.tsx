import { Colors } from '@/consts';
import { CSSProperties } from 'react';

interface IDotProps {
  size: number;
  color: string;
  border?: boolean;
  style?: CSSProperties;
}
const Dot = ({ size, color, border = false, style }: IDotProps) => {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        backgroundColor: color,
        borderWidth: border ? 3 : 0,
        borderColor: Colors.white2,
        borderStyle: 'solid',
        boxSizing: 'border-box',
        ...style,
      }}
    />
  );
};

export default Dot;
