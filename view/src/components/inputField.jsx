// components/InputField.jsx
import React from 'react';

export const InputField = ({
  type = 'text',
  placeholder,
  name,
  icon: Icon,
  ...props
}) => {
  return (
    <div className="relative my-6">
      <input
        type={type}
        placeholder={placeholder}
        className="w-full py-3 px-5 pr-12 bg-gray-100 rounded-lg border-none outline-none text-gray-700 font-medium focus:ring-2 focus:ring-primary transition-all"
        {...props}
      />
      {Icon && (
        <div className="absolute right-4 top-1/2 -translate-y-1/2 text-xl text-gray-500">
          <Icon />
        </div>
      )}
    </div>
  );
};