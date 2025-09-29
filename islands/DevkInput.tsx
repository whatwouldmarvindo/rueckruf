import { h } from "preact";

// Definieren der Props für die allgemeine Eingabekomponente
type DevkInputProps = {
  label: string;
  name: string;
  value?: string | number;
  error?: string;
  onChange: (newValue: string | number) => void;
  placeholder?: string;
  type?: "text" | "email" | "number" | "password";
  required?: boolean;
};

export function DevkInput<T>({
  label,
  name,
  value,
  error,
  onChange,
  placeholder,
  type = "text",
  required = false,
}: DevkInputProps) {
  const onInputChange = (
    e: h.JSX.TargetedEvent<HTMLInputElement, Event>,
  ) => {
    const { value: rawValue } = e.currentTarget;
    if (type === "number") {
      const numValue = parseFloat(rawValue);
      // Wenn das Parsen NaN ergibt (z. B. bei einem leeren String), wird der rohe String übergeben,
      // damit die übergeordnete Komponente entscheiden kann, wie sie damit umgeht.
      // Andernfalls wird die geparste Zahl übergeben.
      onChange(isNaN(numValue) ? rawValue : numValue);
    } else {
      onChange(rawValue);
    }
  };

  const id = `input-${name}`;

  // Dynamische Klassen für das Fehler-Styling
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
        type={type}
        value={value}
        onChange={onInputChange}
        placeholder={placeholder}
        required={required}
        class={inputClasses}
      />
      {/* Die Fehlermeldung wird nur angezeigt, wenn eine existiert */}
      {error && <p class="text-red-500 text-xs italic mt-1">{error}</p>}
    </div>
  );
}
