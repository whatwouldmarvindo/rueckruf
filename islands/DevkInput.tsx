import { h } from "preact";

type DevkInputProps = {
  label: string;
  name: string;
  value?: string;
  error?: string;
  onChange: (newValue: string) => void;
  placeholder?: string;
};

export function DevkInput(props: DevkInputProps) {
  const {
    label,
    name,
    value,
    error,
    onChange,
    placeholder,
  } = props;

  const onInputChange = (
    e: h.JSX.TargetedEvent<HTMLInputElement, Event>,
  ) => {
    const { value } = e.currentTarget;
    onChange(value);
  };

  const id = `input-${name}`;

  const inputClasses =
    `shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
      error ? "border-red-500" : "border-gray-300"
    }`;

  return (
    <div class="mb-4">
      <label htmlFor={id} class="block text-gray-700 text-sm font-bold mb-2">
        {label}
      </label>
      <input
        id={id}
        name={name}
        type="text"
        value={value}
        onInput={onInputChange}
        placeholder={placeholder}
        class={inputClasses}
      />
      {/* Zeige die Fehlermeldung nur an, wenn eine existiert */}
      {error && <p class="text-red-500 text-xs italic mt-1">{error}</p>}
    </div>
  );
}
