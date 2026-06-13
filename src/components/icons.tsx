import type { PropsWithChildren } from "react";

type IconProps = {
  size?: number;
  className?: string;
};

function Svg({
  size = 18,
  className,
  children,
}: PropsWithChildren<IconProps>) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

export function ChevronRightIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="m9 5 7 7-7 7" />
    </Svg>
  );
}

export function ArrowRightIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M5 12h13" />
      <path d="m12 5 7 7-7 7" />
    </Svg>
  );
}

export function DocumentIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M8 4h6l4 4v12H8z" />
      <path d="M14 4v4h4" />
      <path d="M10 12h6" />
      <path d="M10 16h6" />
    </Svg>
  );
}

export function SearchIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <circle cx="11" cy="11" r="5.5" />
      <path d="m16 16 4 4" />
    </Svg>
  );
}

export function PencilIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="m4 20 4.5-1 10-10.5a1.8 1.8 0 0 0 0-2.6l-.4-.4a1.8 1.8 0 0 0-2.6 0L5.4 15.9 4 20Z" />
      <path d="m14 6 4 4" />
    </Svg>
  );
}

export function ExpandIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M14 4h6v6" />
      <path d="M10 14 20 4" />
      <path d="M4 20h6v-6" />
      <path d="M4 20l6-6" />
    </Svg>
  );
}

export function CodeIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="m9 8-4 4 4 4" />
      <path d="m15 8 4 4-4 4" />
    </Svg>
  );
}
