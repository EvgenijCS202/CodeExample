import { ChevronLeftSvg } from '@/assets/icons/chevron_left';
import { Colors } from '@/consts';
import { useAppSelector } from '@/store';
import { useRef } from 'react';

interface IImageHorListProps {
  images: { url: string }[];
  imageSize: { width: number; height: number };
}
const ImageHorList = ({ images, imageSize }: IImageHorListProps) => {
  const scrollCont = useRef<HTMLDivElement>(null);
  const mobile = useAppSelector(state => state.paramsStore.mobile);
  return (
    <div
      style={{
        marginLeft: mobile ? 20 : 40,
        width: mobile ? 'calc(100% - 20px)' : 'calc(100% - 40px)',
        height: imageSize.height,
        position: 'relative',
      }}
    >
      <div style={{ width: '100%', position: 'static' }}>
        <div
          ref={scrollCont}
          style={{
            paddingRight: mobile ? 20 : 40,
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'row',
            gap: 4,
            width: '100%',
            overflowX: 'auto',
          }}
        >
          {images.map((it, ind) => (
            <img
              src={it.url}
              style={{
                width: imageSize.width,
                minWidth: imageSize.width,
                height: imageSize.height,
                objectFit: 'cover',
                borderRadius: 8,
              }}
              key={ind}
            />
          ))}
        </div>
      </div>
      <div
        style={{
          position: 'absolute',
          top: (imageSize.height - (mobile ? 32 : 40)) / 2,
          width: '100%',
          paddingLeft: mobile ? 4 : 24,
          paddingRight: mobile ? 24 : 64,
          boxSizing: 'border-box',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: Colors.white4,
            width: mobile ? 32 : 40,
            height: mobile ? 32 : 40,
            borderRadius: '50%',
            cursor: 'pointer',
          }}
          onClick={() => {
            if (scrollCont.current === null) return;
            const left = scrollCont.current.scrollLeft;
            const next =
              Math.floor((left - 1) / (imageSize.width + 4)) *
              (imageSize.width + 4);
            scrollCont.current?.scroll({ left: next });
          }}
        >
          <ChevronLeftSvg
            style={{
              stroke: Colors.black2,
              width: 30,
              height: 30,
              transform: mobile ? 'scale(0.8)' : undefined,
            }}
          />
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: Colors.white4,
            width: mobile ? 32 : 40,
            height: mobile ? 32 : 40,
            borderRadius: '50%',
            cursor: 'pointer',
            transform: 'rotate(180deg)',
          }}
          onClick={() => {
            if (scrollCont.current === null) return;
            const left = scrollCont.current.scrollLeft;
            const next =
              Math.ceil((left + 1) / (imageSize.width + 4)) *
              (imageSize.width + 4);
            scrollCont.current?.scroll({ left: next });
          }}
        >
          <ChevronLeftSvg
            style={{
              stroke: Colors.black2,
              width: 30,
              height: 30,
              transform: mobile ? 'scale(0.8)' : undefined,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default ImageHorList;
