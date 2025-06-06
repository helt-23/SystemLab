export const InputField = ({
  type = 'text',
  placeholder,
  name,
  icon: Icon,
  error,
  required,
  ...props
}) => {
  return (
    <div className="input-field-container relative mb-4">
      <div className="relative">
        {Icon && (
          <div className="input-field-icon absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 z-10 pointer-events-none">
            <Icon />
          </div>
        )}
        <input
          type={type}
          placeholder={placeholder}
          name={name}
          className={`input-field w-full px-4 py-2 ${Icon ? 'pl-10' : 'pl-4'
            } pr-4 border rounded-lg focus:outline-none focus:ring-2 ${error ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200'
            } relative z-0 bg-transparent`}
          required={required}
          aria-invalid={!!error}
          aria-describedby={error ? `${name}-error` : undefined}
          {...props}
        />
      </div>

      {error && (
        <div
          id={`${name}-error`}
          className="error-text text-red-500 text-xs mt-1 pl-1"
        >
          {error}
        </div>
      )}
    </div>
  );
};