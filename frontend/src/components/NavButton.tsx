import React from "react";
import { ViewType } from '../types'

interface NavButtonProps {
  label: string;
  view: ViewType;
  currentView: ViewType;
  onViewChange: (view: ViewType) => void;
  badgeCount?: number;
}

const renderCountBadge = (badgeCount: number) => {
  if(badgeCount > 0) {
    const displayCount = badgeCount > 9 ? "9+" : badgeCount;

    return (
      <span
        className="absolute -top-2 -right-2 bg-red-500 text-white text-xs
                     rounded-full h-5 w-5 flex items-center justify-center"
      >
        {displayCount}
      </span>
    );
  }
}

const NavButton: React.FC<NavButtonProps> = ({
  label,
  view,
  currentView,
  onViewChange,
  badgeCount = 0,
}) => {
  return (
    <button
      onClick={() => onViewChange(view)}
      className={`relative nav-button ${
        currentView === view ? "nav-button-active" : "nav-button-inactive"
      }`}
    >
      {label}

      {renderCountBadge(badgeCount)}
    </button>
  );
};

export default NavButton;
