import { CSSProperties } from 'react';
import TextInput from './TextInput';

interface IPhoneNumberInputProps {
  phone: string;
  setPhone?: (val: string) => void;
  style?: CSSProperties;
}
const PhoneNumberInput = ({
  phone,
  setPhone,
  style,
}: IPhoneNumberInputProps) => {
  return (
    <TextInput
      value={stringToPhone(phone)}
      placeholder="Номер телефона"
      onChange={e => {
        let newValue = phoneToString(e.currentTarget.value);
        if (
          stringToPhone(phone).length > e.currentTarget.value.length &&
          phone === newValue
        ) {
          if (e.currentTarget.value[8] !== ' ') {
            newValue = newValue.slice(0, 2) + newValue.slice(3);
          } else if (e.currentTarget.value[12] !== '-') {
            newValue = newValue.slice(0, 5) + newValue.slice(6);
          } else if (e.currentTarget.value[15] !== '-') {
            newValue = newValue.slice(0, 7) + newValue.slice(8);
          }
        }
        setPhone?.(newValue);
        let start = 4;
        if (newValue.length > 2) start += 2;
        if (newValue.length > 5) start += 1;
        if (newValue.length > 7) start += 1;
        start += newValue.length;
        setTimeout(() => e.target.setSelectionRange(start, start));
      }}
      rules={[{ required: true, test: () => phone.length !== 10 }]}
      style={style}
      onFocus={e => {
        let start = 4;
        if (phone.length > 2) start += 2;
        if (phone.length > 5) start += 1;
        if (phone.length > 7) start += 1;
        start += phone.length;
        setTimeout(() => e.target.setSelectionRange(start, start));
      }}
      onSelect={e => {
        e.preventDefault();
        e.stopPropagation();
        // console.log('here');
        // let start = 4;
        // if (phone.length > 2) start += 2;
        // if (phone.length > 5) start += 1;
        // if (phone.length > 7) start += 1;
        // start += phone.length;
        // e.currentTarget.setSelectionRange(start, start);
      }}
    />
  );
};

const phoneToString = (phone: string) => {
  return phone.replace(/[^\d]/g, '').slice(1, 11);
};

const stringToPhone = (str: string) => {
  while (str.length < 10) str = str + '_';
  return `+7 (${str.slice(0, 3)}) ${str.slice(3, 6)}-${str.slice(
    6,
    8,
  )}-${str.slice(8, 10)}`;
};

export default PhoneNumberInput;
