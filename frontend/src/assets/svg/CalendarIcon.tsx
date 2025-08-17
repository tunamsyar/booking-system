import React from "react";

type Props = {
  className?: string; // Tailwind/utility classes
  title?: string; // Accessible label
  strokeWidth?: number; // Line thickness (default 2)
};

const CalendarIcon: React.FC<Props> = ({
  className = "w-[1em] h-[1em] mr-1",
  title = "Calendar",
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
    {/* Calendar outline */}
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    {/* Top bar (days row) */}
    <line x1="3" y1="10" x2="21" y2="10" />
    {/* Calendar rings */}
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="16" y1="2" x2="16" y2="6" />
  </svg>
);

export default CalendarIcon;
