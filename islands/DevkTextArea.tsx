import { h } from "preact";

type DevkTextareaProps = {
  label: string;
  onChange: (newValue: string) => void;
  formFieldName: string;
  placeholder?: string;
};

export function DevkTextArea(
  { label, onChange, placeholder, formFieldName }: DevkTextareaProps,
) {
  const handleInputChange = (
    e: h.JSX.TargetedEvent<HTMLInputElement | HTMLTextAreaElement, Event>,
  ) => {
    const value = e.currentTarget.value;
    onChange(value);
  };
  return (
    <>
      <label
        class="block text-gray-700 text-sm font-bold mb-2"
        for={formFieldName}
      >
        {label}
      </label>
      <textarea
        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id="comment"
        placeholder={placeholder}
        name={formFieldName}
        rows={4}
        onChange={handleInputChange}
      >
      </textarea>
    </>
  );
}
