import { h } from "preact";
import { useState } from "preact/hooks";

type DevkTextareaProps = {
  label: string;
  value: string[];
  onChange: (newValue: string[]) => void;
};

const insuranceProducts = ["Haftpflicht", "Hausrat", "KFZ", "Unfall", "Leben"];

export function DevkInsureProductSelect(
  { label, onChange, value: i }: DevkTextareaProps,
) {
  const handleInterestChange = (
    e: h.JSX.TargetedEvent<HTMLInputElement, Event>,
  ) => {
    const { checked, value: productName } = e.currentTarget;

    let newInterests: string[];

    if (checked) {
      newInterests = [...i, productName];
    } else {
      newInterests = i.filter((interest) => interest !== productName);
    }

    // Wir rufen die onChange-Funktion der übergeordneten Komponente mit dem neuen, aktualisierten Array auf.
    onChange(newInterests);
  };

  return (
    <div class="mb-6">
      <label class="block text-gray-700 text-sm font-bold mb-2">
        {label}
      </label>
      <div class="grid grid-cols-2 md:grid-cols-3 gap-2">
        {insuranceProducts.map((insuranceProduct) => (
          <div key={insuranceProduct}>
            <label class="cursor-pointer inline-flex items-center">
              <input
                type="checkbox"
                value={insuranceProduct}
                onChange={handleInterestChange}
                class="form-checkbox"
              />
              <span class="ml-2">{insuranceProduct}</span>
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}
