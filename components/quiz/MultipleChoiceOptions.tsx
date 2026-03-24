interface MultipleChoiceOptionsProps {
  options: string[];
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

export function MultipleChoiceOptions({
  options,
  value,
  onChange,
  disabled = false,
}: MultipleChoiceOptionsProps) {
  return (
    <div className="grid gap-3">
      {options.map((option) => {
        const selected = option === value;

        return (
          <button
            key={option}
            type="button"
            disabled={disabled}
            onClick={() => onChange(option)}
            className={`border px-4 py-4 text-left text-[12px] font-medium transition ${
              selected
                ? "border-[#1a1a18] bg-[#1a1a18] text-[#f7f5f0]"
                : "border-[#d8d5ce] bg-transparent text-[#1a1a18] hover:border-[#1a1a18]"
            }`}
          >
            {option}
          </button>
        );
      })}
    </div>
  );
}
