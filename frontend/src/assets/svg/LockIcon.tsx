import React from "react";

type Props = {
  className?: string
}

const LockIcon: React.FC<Props> =({ className = "mx-auto h-12 w-12 text-gray-400 mb-4" }) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M8 7V3a4 4 0 118 0v4m-4 11v-4m0 0a2 2 0 100-4m0 4a2 2 0 100 4m-6-8a2 2 0 100-4m0 4a2 2 0 100 4m0-4V7a6 6 0 1112 0v10"
    />
  </svg>
);

export default LockIcon;
