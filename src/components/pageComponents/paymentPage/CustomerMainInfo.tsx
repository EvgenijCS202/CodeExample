import Input from '@/components/inputs/Input';
import PhoneNumberInput from '@/components/inputs/PhoneNumberInput';
import TextInput from '@/components/inputs/TextInput';
import { Colors, Fonts } from '@/consts';
import { useAppSelector } from '@/store';

interface ICustomerMainInfoProps {
  surname: string;
  setSurname: (val: string) => void;
  name: string;
  setName: (val: string) => void;
  middleName: string;
  setMiddleName: (val: string) => void;
  phone: string;
  setPhone: (val: string) => void;
}
const CustomerMainInfo = ({
  surname,
  setSurname,
  name,
  setName,
  middleName,
  setMiddleName,
  phone,
  setPhone,
}: ICustomerMainInfoProps) => {
  const mobile = useAppSelector(state => state.paramsStore.mobile);
  return (
    <>
      <div
        style={{
          display: 'flex',
          flexDirection: mobile ? 'column' : 'row',
          gap: 8,
        }}
      >
        <TextInput
          value={surname}
          placeholder="Фамилия"
          style={{ width: '100%' }}
          rules={[{ required: true }]}
          onChange={e => setSurname(e.currentTarget.value)}
        />
        <TextInput
          value={name}
          placeholder="Имя"
          style={{ width: '100%' }}
          rules={[{ required: true }]}
          onChange={e => setName(e.currentTarget.value)}
        />
        <TextInput
          value={middleName}
          placeholder="Отчество"
          style={{ width: '100%' }}
          onChange={e => setMiddleName(e.currentTarget.value)}
        />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <span
          style={{
            fontFamily: Fonts.Manrope,
            fontWeight: 700,
            fontSize: 16,
            lineHeight: 1,
            color: Colors.black,
          }}
        >
          Контактная информация
        </span>
        <div
          style={{
            display: 'flex',
            flexDirection: mobile ? 'column' : 'row',
            gap: 8,
          }}
        >
          <PhoneNumberInput
            phone={phone}
            setPhone={setPhone}
            style={{ width: '100%' }}
          />
          <Input value="" placeholder="Email" style={{ width: '100%' }} />
        </div>
      </div>
    </>
  );
};

export default CustomerMainInfo;
