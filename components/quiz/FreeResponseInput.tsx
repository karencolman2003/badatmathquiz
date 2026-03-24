interface FreeResponseInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
}

export function FreeResponseInput({
  value,
  onChange,
  placeholder,
  disabled = false,
}: FreeResponseInputProps) {
  return (
    <input
      type="text"
      value={value}
      disabled={disabled}
      placeholder={placeholder}
      onChange={(event) => onChange(event.target.value)}
      className="w-full border border-[#d8d5ce] bg-transparent px-4 py-4 text-[13px] text-[#1a1a18] outline-none transition placeholder:text-[#888880] focus:border-[#1a1a18]"
    />
  );
}
