import React from "react";

interface LoadingSpinnerProps {
  size?: "small" | "medium" | "large";
  message?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = "medium",
  message = "Loading...",
}) => {
  const sizeClasses = {
    small: "h-4 w-4",
    medium: "h-8 w-8",
    large: "h-12 w-12",
  };

  return (
    <div className="flex flex-col items-center justify-center p-8">
      <div
        className={`animate-spin rounded-full border-b-2 border-blue-600 ${sizeClasses[size]}`}
      />
      <p className="mt-2 text-sm text-gray-600">{message}</p>
    </div>
  );
};
