import React, { useEffect } from "react";
import PropTypes from "prop-types";

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  className,
  closeOnBackdrop,
}) {
  useEffect(
    function () {
      if (!isOpen) {
        return undefined;
      }

      function handleEscape(event) {
        if (event.key === "Escape") {
          onClose();
        }
      }

      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";

      return function cleanup() {
        document.removeEventListener("keydown", handleEscape);
        document.body.style.overflow = "";
      };
    },
    [isOpen, onClose]
  );

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
      role="dialog"
      aria-modal="true"
      onClick={function () {
        if (closeOnBackdrop) {
          onClose();
        }
      }}
    >
      <div
        className={
          "w-full max-w-xl rounded-xl bg-white p-6 shadow-2xl " +
          (className || "")
        }
        onClick={function (event) {
          event.stopPropagation();
        }}
      >
        <div className="mb-4 flex items-center justify-between gap-4">
          <h2 className="text-lg font-bold text-gray-900">{title}</h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-md p-1 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700"
            aria-label="Fermer"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="h-5 w-5"
            >
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </button>
        </div>

        <div>{children}</div>
      </div>
    </div>
  );
}

Modal.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  closeOnBackdrop: PropTypes.bool,
};

Modal.defaultProps = {
  isOpen: false,
  title: "",
  className: "",
  closeOnBackdrop: true,
};
