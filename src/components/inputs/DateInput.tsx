import { useAppSelector } from '@/store';
import CalendarIcon from '@/assets/icons/calendar.svg';
import Input from './Input';
import { CSSProperties } from 'react';

interface IDateInputProps {
  value: string;
  placeholder: string;
  onFocus?: () => void;
  style?: CSSProperties;
}
const DateInput = ({ value, placeholder, onFocus, style }: IDateInputProps) => {
  const mobile = useAppSelector(state => state.paramsStore.mobile);
  return (
    <Input
      value={value}
      onFocus={onFocus}
      placeholder={placeholder}
      width={mobile ? '100%' : 160}
      inputWidth={mobile ? '100%' : 100}
      icon={<img src={CalendarIcon} alt="cal icon" />}
      readonly
      style={style}
    />
  );
};

export default DateInput;
