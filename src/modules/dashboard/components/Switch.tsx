import { useState } from "react";

interface SwitchProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
}

export default function Switch({
  checked,
  onChange,
  label = "Aktifkan",
  disabled = false,
}: SwitchProps) {
  const [internalValue, setInternalValue] = useState(false);

  const isControlled = checked !== undefined;
  const isChecked = isControlled ? checked : internalValue;

  const handleChange = () => {
    if (disabled) return;

    const nextValue = !isChecked;

    if (!isControlled) {
      setInternalValue(nextValue);
    }

    onChange?.(nextValue);
  };

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isChecked}
      aria-label={label}
      disabled={disabled}
      onClick={handleChange}
      className={`
        relative inline-flex h-6 w-11 shrink-0 items-center
        rounded-full transition-colors duration-200 ease-in-out
        focus-visible:outline-none focus-visible:ring-2
        focus-visible:ring-blue-500 focus-visible:ring-offset-2
        ${isChecked ? "bg-blue-600" : "bg-gray-300"}
        ${disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"}
      `}
    >
      <span
        className={`
          inline-block h-5 w-5 transform rounded-full
          bg-white shadow-sm transition-transform duration-200
          ${isChecked ? "translate-x-5" : "translate-x-0.5"}
        `}
      />
    </button>
  );
}
