import React from "react";
import PropTypes from "prop-types";

const VARIANT_CLASSES = {
  primary: "bg-teal-600 text-white hover:bg-teal-700 focus-visible:ring-teal-500",
  secondary:
    "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 focus-visible:ring-gray-400",
  ghost: "bg-transparent text-gray-700 hover:bg-gray-100 focus-visible:ring-gray-400",
  danger: "bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-500",
};

const SIZE_CLASSES = {
  sm: "h-8 px-3 text-xs",
  md: "h-10 px-4 text-sm",
  lg: "h-12 px-5 text-base",
};

function joinClasses() {
  return Array.from(arguments).filter(Boolean).join(" ");
}

export default function Button({
  children,
  type,
  variant,
  size,
  className,
  isLoading,
  disabled,
  leftIcon,
  rightIcon,
  ...rest
}) {
  return (
    <button
      type={type}
      disabled={disabled || isLoading}
      className={joinClasses(
        "inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60",
        VARIANT_CLASSES[variant],
        SIZE_CLASSES[size],
        className
      )}
      {...rest}
    >
      {isLoading ? (
        <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-r-transparent" />
      ) : null}
      {!isLoading && leftIcon ? <span className="inline-flex">{leftIcon}</span> : null}
      <span>{children}</span>
      {!isLoading && rightIcon ? (
        <span className="inline-flex">{rightIcon}</span>
      ) : null}
    </button>
  );
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  type: PropTypes.oneOf(["button", "submit", "reset"]),
  variant: PropTypes.oneOf(["primary", "secondary", "ghost", "danger"]),
  size: PropTypes.oneOf(["sm", "md", "lg"]),
  className: PropTypes.string,
  isLoading: PropTypes.bool,
  disabled: PropTypes.bool,
  leftIcon: PropTypes.node,
  rightIcon: PropTypes.node,
};

Button.defaultProps = {
  type: "button",
  variant: "primary",
  size: "md",
  className: "",
  isLoading: false,
  disabled: false,
  leftIcon: null,
  rightIcon: null,
};
