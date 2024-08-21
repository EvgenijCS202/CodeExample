import { ChangeEvent, CSSProperties, useRef } from 'react';
import styles from './Input.module.css';
import { useAppSelector } from '@/store';

interface IInputProps {
  value: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  width?: string | number;
  inputWidth?: string | number;
  placeholder: string;
  onFocus?: (e: React.FocusEvent<HTMLInputElement, Element>) => void;
  onBlur?: () => void;
  onSelect?: (e: React.SyntheticEvent<HTMLInputElement, Event>) => void;
  icon?: JSX.Element;
  readonly?: boolean;
  style?: CSSProperties;
  textStyle?: CSSProperties;
  multiline?: boolean;
}
const Input = ({
  value,
  onChange,
  width,
  inputWidth,
  placeholder,
  onFocus,
  onBlur,
  onSelect,
  icon,
  readonly = false,
  style,
  textStyle,
  multiline = false,
}: IInputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const mobile = useAppSelector(state => state.paramsStore.mobile);
  return (
    <div
      className={`${styles['user-input-wrp']} ${
        mobile ? styles['mobile'] : ''
      }`}
      style={{ width, ...style }}
      onClick={() => inputRef.current?.focus()}
    >
      <input
        ref={inputRef}
        type="text"
        className={styles['inputText']}
        required
        value={value}
        onFocus={e => {
          onFocus?.(e);
          e.target.dispatchEvent(new Event('click', { bubbles: true }));
        }}
        onBlur={onBlur}
        style={{
          width: inputWidth,
          userSelect: 'none',
          ...textStyle,
        }}
        onChange={onChange}
        onSelect={onSelect}
        placeholder=""
        readOnly={readonly}
        aria-multiline={multiline}
      />
      {icon}
      <span className={styles['floating-label']} style={textStyle}>
        {placeholder}
      </span>
    </div>
  );
};

export default Input;
