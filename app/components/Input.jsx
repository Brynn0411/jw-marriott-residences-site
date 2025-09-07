export default function Input({
  label,
  value,
  onChange,
  type = "text",
  required = false,
  inputMode,
  pattern,
  placeholder,
}) {
  return (
    <label className="block">
      <span className="text-sm text-gray-700">{label}</span>
      <input
        className="mt-1 w-full rounded-xl border px-3 py-2"
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        inputMode={inputMode}
        pattern={pattern}
        placeholder={placeholder}
      />
    </label>
  );
}
