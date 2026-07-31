interface Props {
  label?: string;
  value: string;
  name: string;
  className?: string;
  placeholder?: string;
  required?: boolean;
  error?: string;
  onChange: (value: string) => void;
  onBlur: () => void;
}

export const Input = ({ label, value, name, className, placeholder, required, error, onChange, onBlur }: Props) => {
  return (
    <div className="w-full ">
      <label className="text-sm" htmlFor={name}>{label}</label>
      <input
        className={className}
        value={value}
        name={name}
        placeholder={placeholder}
        required={required}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
      />
      {error && <p className="text-center text-sm text-red-500">{error}</p>}
    </div>
  );
};
