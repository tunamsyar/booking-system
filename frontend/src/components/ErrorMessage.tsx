import React from "react";
import ErrorIcon from "../assets/svg/ErrorIcon";

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({
  message,
  onRetry,
}) => {
  return (
    <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-4">
      <div className="flex items-center">
        <div className="flex-shrink-0">
          <ErrorIcon />
        </div>
        <div className="ml-3">
          <p className="text-sm text-red-700">{message}</p>
        </div>
        {onRetry && (
          <div className="ml-auto">
            <button
              onClick={onRetry}
              className="text-sm text-red-600 hover:text-red-500 font-medium"
            >
              Try Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
