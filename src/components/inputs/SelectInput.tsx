import { Colors, Fonts } from '@/consts';
import { CSSProperties, FocusEvent, HTMLAttributes } from 'react';
import DownArrowIcon from '@/assets/icons/downArrow.svg';
import { useDropDown } from '../../hooks/useDropDown';

interface ISelectInputProps<T> extends HTMLAttributes<HTMLDivElement> {
  value: T;
  options?: { value: T; label: string }[];
  onSelectValue?: (val: T) => void;
  inputStyle?: CSSProperties;
}
const SelectInput = <T,>({
  value,
  options = [],
  onSelectValue,
  inputStyle,
  ...props
}: ISelectInputProps<T>) => {
  const { DropDownProvider, DropDown, show, hide, shown } = useDropDown();
  return (
    <DropDownProvider
      {...props}
      onClick={e => {
        if (!shown)
          props.onFocus?.(e as unknown as FocusEvent<HTMLDivElement, Element>);
        props.onClick?.(e);
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          borderRadius: 4,
          border: '1px solid ' + Colors.white,
          padding: 8,
          ...inputStyle,
        }}
        onClick={show}
      >
        <span
          style={{
            fontFamily: Fonts.Manrope,
            fontWeight: 600,
            fontSize: 14,
            lineHeight: '14px',
            color: Colors.black2,
            flex: 1,
          }}
        >
          {options.find(v => v.value === value)?.label || JSON.stringify(value)}
        </span>
        <img
          src={DownArrowIcon}
          alt="darr svg"
          style={{ width: 12, height: 12 }}
        />
      </div>
      <DropDown
        style={{
          display: 'flex',
          borderRadius: 4,
          maxHeight: 108,
          border: '1px solid ' + Colors.white,
          marginTop: 0,
          padding: 4,
          paddingLeft: 8,
        }}
      >
        <div
          style={{
            display: 'flex',
            gap: 8,
            flexDirection: 'column',
            overflowY: 'auto',
            width: '100%',
            paddingBlock: 4,
          }}
          className="scroll-container"
        >
          {options.map(opt => (
            <span
              key={JSON.stringify(opt.value)}
              style={{
                fontFamily: Fonts.Manrope,
                fontWeight: 400,
                fontSize: 12,
                lineHeight: '12px',
                color: Colors.black2,
                width: '100%',
                cursor: 'pointer',
              }}
              onClick={() => {
                onSelectValue?.(opt.value);
                hide();
              }}
            >
              {opt.label}
            </span>
          ))}
        </div>
      </DropDown>
    </DropDownProvider>
  );
};

export default SelectInput;
