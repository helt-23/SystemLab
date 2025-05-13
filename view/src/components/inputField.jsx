import React from 'react';

export const InputField = ({
  type = 'text',
  placeholder,
  name,
  icon: Icon,
  ...props
}) => {
  return (
    <div className="input-field-container">
      <input
        type={type}
        placeholder={placeholder}
        name={name}
        className="input-field"
        {...props}
      />
      {Icon && (
        <div className="input-field-icon">
          <Icon />
        </div>
      )}
    </div>
  );
};