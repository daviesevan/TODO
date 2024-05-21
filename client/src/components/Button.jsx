import React from 'react';

const Button = ({ onClick, label, className, ...props }) => {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-lg text-sm font-medium ${className}`}
      {...props}
    >
      {label}
    </button>
  );
};

export default Button;
