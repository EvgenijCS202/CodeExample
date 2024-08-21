import { CSSProperties } from 'react';

interface ILineProps {
  width: number;
  color: string;
  dashed?: boolean;
  style?: CSSProperties;
}
const Line = ({ width, color, dashed = false, style }: ILineProps) => {
  const gaps = width / 10;
  return (
    <div
      style={{
        width,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: dashed ? gaps : undefined,
        ...style,
      }}
    >
      {!dashed ? (
        <div
          style={{
            width: width - 2,
            borderRadius: 1,
            borderWidth: 1,
            borderColor: color,
            borderStyle: 'solid',
            justifyContent: 'center',
          }}
        />
      ) : (
        <>
          <div
            style={{
              width: gaps / 2,
              borderRadius: 1,
              borderWidth: 1,
              borderColor: color,
              borderStyle: 'solid',
            }}
          />
          <div
            style={{
              width: gaps,
              borderRadius: 1,
              borderWidth: 1,
              borderColor: color,
              borderStyle: 'solid',
            }}
          />
          <div
            style={{
              width: gaps,
              borderRadius: 1,
              borderWidth: 1,
              borderColor: color,
              borderStyle: 'solid',
            }}
          />
          <div
            style={{
              width: gaps,
              borderRadius: 1,
              borderWidth: 1,
              borderColor: color,
              borderStyle: 'solid',
            }}
          />
          <div
            style={{
              width: gaps,
              borderRadius: 1,
              borderWidth: 1,
              borderColor: color,
              borderStyle: 'solid',
            }}
          />
          <div
            style={{
              width: gaps / 2,
              borderRadius: 1,
              borderWidth: 1,
              borderColor: color,
              borderStyle: 'solid',
            }}
          />
        </>
      )}
    </div>
  );
};

export default Line;
