import React from "react";

type DeckFanStackProps = {
  images: string[];      // card image URLs (first 3–5 used)
  label?: string;        // optional deck name
  onClick?: () => void;  // click handler
};

const FAN_TRANSFORMS = [
  { rotate: -12, x: -26, y: 8 },
  { rotate: -6, x: -12, y: 4 },
  { rotate: 0, x: 0, y: 0 },
  { rotate: 6, x: 12, y: 4 },
  { rotate: 12, x: 26, y: 8 },
];

const DeckFanStack: React.FC<DeckFanStackProps> = ({
  images,
  label,
  onClick,
}) => {
  const visible = images.slice(0, 5);
  const start = Math.max(0, Math.floor((FAN_TRANSFORMS.length - visible.length) / 2));
  const transforms = FAN_TRANSFORMS.slice(start, start + visible.length);

  return (
    <button
      type="button"
      onClick={onClick}
      className="group flex flex-col items-center focus:outline-none"
      title={label}
    >
      {/* Stack */}
      <div className="relative w-[240px] h-[300px]">
        {visible.map((img, i) => {
          const t = transforms[i];
          return (
            <img
              key={i}
              src={img}
              alt={label ?? `card-${i}`}
              className="absolute top-0 left-1/2 w-[210px] h-[290px] rounded-xl object-contain shadow-xl
                         transition-transform duration-300
                         group-hover:-translate-y-2"
              style={{
                transform: `
                  translateX(calc(-50% + ${t.x}px))
                  translateY(${t.y}px)
                  rotate(${t.rotate}deg)
                `,
                zIndex: i,
              }}
            />
          );
        })}
      </div>

      {/* Label */}
      {label && (
        <span className="mt-4 text-[11px] font-extrabold tracking-[0.12em] text-black/70">
          {label}
        </span>
      )}
    </button>
  );
};

export default DeckFanStack;
