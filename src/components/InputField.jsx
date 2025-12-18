
const InputField = ({ label, type = 'text', value, onChange, error, placeholder, rows }) => {
  const Component = rows ? 'textarea' : 'input';
  
  return (
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-2">
        {label}
      </label>
      <Component
        type={type}
        value={value}
        onChange={onChange}
        rows={rows}
        className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all ${
          error ? 'border-red-400 bg-red-50' : 'border-gray-300 bg-white'
        } ${rows ? 'resize-none' : ''}`}
        placeholder={placeholder}
      />
      {error && (
        <p className="text-red-500 text-sm mt-1.5 flex items-center">
          <span className="mr-1">⚠</span> {error}
        </p>
      )}
    </div>
  );
};

export default InputField;