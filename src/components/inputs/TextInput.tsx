import { ChangeEvent, CSSProperties, useState } from 'react';
import Input from './Input';
import { Colors } from '@/consts';

interface ITextInputProps {
  value: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  rules?: {
    required: boolean;
    test?: (val: string) => boolean;
    message?: string;
  }[];
  style?: CSSProperties;
  onFocus?: (e: React.FocusEvent<HTMLInputElement, Element>) => void;
  onSelect?: (e: React.SyntheticEvent<HTMLInputElement, Event>) => void;
}
const TextInput = ({
  value,
  placeholder,
  onChange,
  rules,
  style,
  onFocus,
  onSelect,
}: ITextInputProps) => {
  const [error, setError] = useState<string | null>(null);
  return (
    <Input
      value={value}
      placeholder={
        placeholder +
        ((rules?.filter(r => r.required) || []).length ? ' *' : '')
      }
      style={{
        ...(error !== null ? { borderColor: Colors.red } : {}),
        ...style,
      }}
      textStyle={{ ...(error !== null ? { color: Colors.red } : {}) }}
      onFocus={e => {
        onFocus?.(e);
        setError(null);
      }}
      onBlur={() => {
        const tested =
          rules
            ?.map(rule => {
              if (rule.required && !value.length) return rule.message || '';
              if (rule.test?.(value)) return rule.message || '';
              return null;
            })
            .filter(it => it !== null) || [];
        if (!tested.length) return;
        setError(tested[0]);
      }}
      onChange={e => {
        onChange?.(e);
        if (error === null) setError(null);
      }}
      onSelect={onSelect}
    />
  );
};

export default TextInput;
