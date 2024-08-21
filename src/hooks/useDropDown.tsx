import { HTMLAttributes, useEffect, useMemo, useState } from 'react';
import DropDown from '../components/baseComponents/DropDown';

function makeHash() {
  let result = '';
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let counter = 0; counter < 20; ++counter)
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  return result;
}

const haveClassInParents = (element: HTMLElement | null, className: string) => {
  while (element !== null && element.id !== 'root') {
    if (!element.className.includes) {
      element = element.parentElement;
      continue;
    }
    if (element.className.includes(className)) return true;
    if (
      element.parentElement === null &&
      element.className.includes('dropdown_')
    ) {
      element =
        document.getElementsByClassName(element.className)?.[0].parentElement ||
        null;
      continue;
    }
    element = element.parentElement;
  }
  return false;
};

export const useDropDown = () => {
  const [shown, setShown] = useState(false);
  const hash = useMemo(() => makeHash(), []);
  const DropDownProvider = ({ ...props }: HTMLAttributes<HTMLDivElement>) => (
    <div
      {...props}
      style={{ position: 'relative', ...props.style }}
      className={[props.className, `dropdown_${hash}`]
        .filter(it => !!it?.length)
        .reduce((pr, cur) => `${pr} ${cur}`)}
    />
  );
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (!shown) return;
      if (!haveClassInParents(e.target as HTMLElement, `dropdown_${hash}`))
        setShown(false);
    };
    window.addEventListener('click', onClick);
    return () => window.removeEventListener('click', onClick);
  }, [shown, hash]);
  return {
    DropDownProvider,
    DropDown: ({ ...props }: HTMLAttributes<HTMLDivElement>) =>
      DropDown({ ...props, show: shown }),
    show: () => setShown(true),
    hide: () => setShown(false),
    shown,
  };
};
