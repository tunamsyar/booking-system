import React from "react";

type Props = {
  className?: string; // Tailwind/utility classes
  title?: string; // Accessible label (optional)
  strokeWidth?: number; // Line thickness (default 2)
};

const ClockIcon: React.FC<Props> = ({
  className = "w-[1em] h-[1em] mr-1",
  title = "Clock",
  strokeWidth = 2,
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    role="img"
    aria-label={title}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={`${className} block`}
  >
    {title ? <title>{title}</title> : null}
    {/* Outer circle */}
    <circle cx="12" cy="12" r="9" />
    {/* Hour + minute hands (3:15 as example) */}
    <path d="M12 7v5l4 2" />
  </svg>
);

export default ClockIcon;
