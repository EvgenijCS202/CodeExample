import { Colors, Fonts } from '@/consts';
import { CSSProperties } from 'react';

interface INumPickerProps {
  value: number;
  onChange: (val: number) => void;
  style?: CSSProperties;
  textStyle?: CSSProperties;
  buttonsStyle?: CSSProperties;
  buttonTextStyle?: CSSProperties;
  min?: number;
  max?: number;
  leftDisabled?: boolean;
  rightDisabled?: boolean;
}
const NumPicker = ({
  value,
  onChange,
  style,
  textStyle,
  buttonsStyle,
  buttonTextStyle,
  min = 1,
  max,
  leftDisabled = false,
  rightDisabled = false,
}: INumPickerProps) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        borderRadius: 4,
        border: '1px solid ' + Colors.white,
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 4,
        ...style,
      }}
    >
      <div
        style={{
          width: 16,
          height: 16,
          borderRadius: 4,
          backgroundColor: Colors.green,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          ...((leftDisabled || value <= min) && {
            backgroundColor: Colors.white,
            cursor: 'not-allowed',
          }),
          ...buttonsStyle,
        }}
        onClick={
          !leftDisabled && value > min ? () => onChange(value - 1) : undefined
        }
      >
        <span
          style={{
            fontFamily: Fonts.Manrope,
            fontWeight: 700,
            fontSize: 16,
            lineHeight: 1,
            textAlign: 'center',
            color: Colors.white3,
            ...((leftDisabled || value <= min) && { color: Colors.gray }),
            ...buttonTextStyle,
          }}
        >
          -
        </span>
      </div>
      <span
        style={{
          fontFamily: Fonts.Manrope,
          fontWeight: 600,
          fontSize: 14,
          lineHeight: 1,
          textAlign: 'center',
          color: Colors.black2,
          ...textStyle,
        }}
      >
        {value}
      </span>
      <div
        style={{
          width: 16,
          height: 16,
          borderRadius: 4,
          backgroundColor: Colors.green,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          ...((rightDisabled || (max !== undefined && value >= max)) && {
            backgroundColor: Colors.white,
            cursor: 'not-allowed',
          }),
          ...buttonsStyle,
        }}
        onClick={
          !rightDisabled && (max === undefined || value < max)
            ? () => onChange(value + 1)
            : undefined
        }
      >
        <span
          style={{
            fontFamily: Fonts.Manrope,
            fontWeight: 700,
            fontSize: 16,
            lineHeight: 1,
            textAlign: 'center',
            color: Colors.white3,
            ...((rightDisabled || (max !== undefined && value >= max)) && {
              color: Colors.gray,
            }),
            ...buttonTextStyle,
          }}
        >
          +
        </span>
      </div>
    </div>
  );
};

export default NumPicker;
